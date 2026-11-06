-- ========================================================
-- IMPULSO VZLA - ESQUEMA DE BASE DE DATOS SUPABASE (PRODUCCIÓN)
-- ========================================================

-- 1. TABLA DE METAS / PROYECTOS
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(50) NOT NULL CHECK (category IN ('emprendimiento', 'causa_social')),
  target_amount NUMERIC(10, 2) NOT NULL,
  current_amount NUMERIC(10, 2) DEFAULT 0.00,
  image_url TEXT,
  creator_name VARCHAR(100) NOT NULL,
  creator_location VARCHAR(100) NOT NULL,
  creator_binance_pay_id VARCHAR(50) NOT NULL,
  status VARCHAR(20) DEFAULT 'activa' CHECK (status IN ('activa', 'completada', 'pausada')),
  days_left INTEGER DEFAULT 15,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. TABLA DE DONACIONES (BINANCE PAY ID: 37999878)
CREATE TABLE IF NOT EXISTS public.donations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  donor_name VARCHAR(100) DEFAULT 'Anónimo',
  donor_location VARCHAR(100) DEFAULT 'Exterior / Local',
  amount_usdt NUMERIC(10, 2) NOT NULL,
  platform_fee NUMERIC(10, 2) NOT NULL, -- 5% de comisión para la plataforma
  net_amount NUMERIC(10, 2) NOT NULL,    -- 95% que va directo al creador
  binance_order_id VARCHAR(100) NOT NULL,
  binance_collector_id VARCHAR(50) DEFAULT '37999878',
  status VARCHAR(20) DEFAULT 'verificado' CHECK (status IN ('pendiente', 'verificado', 'rechazado')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. TABLA DE CALIFICACIONES Y EXPERIENCIAS DE LA COMUNIDAD
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_name VARCHAR(100) NOT NULL,
  user_role VARCHAR(50) NOT NULL CHECK (user_role IN ('creador', 'donante')),
  location VARCHAR(100) NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. SEGURIDAD A NIVEL DE FILAS (RLS)
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Lectura pública de proyectos" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Creación pública de proyectos" ON public.projects FOR INSERT WITH CHECK (true);

CREATE POLICY "Lectura pública de donaciones" ON public.donations FOR SELECT USING (true);
CREATE POLICY "Registro público de donaciones" ON public.donations FOR INSERT WITH CHECK (true);

CREATE POLICY "Lectura pública de calificaciones" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Publicación pública de calificaciones" ON public.reviews FOR INSERT WITH CHECK (true);

-- 5. TRIGGER AUTOMÁTICO: ACTUALIZAR RECAUDADO DE LA META
CREATE OR REPLACE FUNCTION update_project_amount()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'verificado' THEN
    UPDATE public.projects
    SET current_amount = current_amount + NEW.amount_usdt
    WHERE id = NEW.project_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_update_project_amount ON public.donations;
CREATE TRIGGER trg_update_project_amount
AFTER INSERT OR UPDATE ON public.donations
FOR EACH ROW EXECUTE FUNCTION update_project_amount();

-- ========================================================
-- 6. DATOS DE INICIO / PROYECTOS INSPIRADORES (FOTOS LOCALES PRECISAS)
-- ========================================================
INSERT INTO public.projects (title, description, category, target_amount, current_amount, image_url, creator_name, creator_location, creator_binance_pay_id, days_left)
VALUES
('Horno pastelero a gas de 2 cámaras y batidora industrial de 10L', 'Llevo 2 años horneando tortas en Valencia con un hornito doméstico. Con este horno de dos cámaras y la batidora industrial podré atender pedidos de panaderías locales y emplear a dos jóvenes del sector.', 'emprendimiento', 850.00, 620.00, '/projects/horno.jpg', 'Carmen Rivas', 'Valencia, Carabobo', '54201948', 6),
('Comedor Comunitario: Almuerzos para 45 abuelos (2 meses de insumos y gas)', 'Cada sábado preparamos sopas y almuerzos nutritivos para 45 personas de la tercera edad en Petare. La meta cubre 2 meses completos de carne, pollo, víveres secos, verduras y bombonas de gas doméstico.', 'causa_social', 1200.00, 890.00, '/projects/comedor.jpg', 'Fundación Mano Amiga', 'Petare, Caracas', '99104823', 9),
('Máquina de soldar inversora 200A, tronzadora y kit de herramientas', 'Técnico en herrería egresado del INCES. Necesito equipar mi taller con una soldadora inversora de uso rudo, tronzadora de metal y careta fotosensible para realizar rejas, marcos y reparaciones mecánicas.', 'emprendimiento', 520.00, 340.00, '/projects/soldadora.jpg', 'Kelvin González', 'Barquisimeto, Lara', '77293014', 14),
('Jornada veterinaria: Esterilización, vacunas y antibióticos para 25 animales', 'Campaña en Maracaibo para esterilizar, vacunar contra la rabia y desparasitar a 25 perros y gatos comunitarios en estado de abandono, incluyendo medicinas post-operatorias.', 'causa_social', 650.00, 510.00, '/projects/veterinaria.jpg', 'Huellas de Maracaibo', 'Maracaibo, Zulia', '66391024', 4),
('Máquina recta industrial Jack F4 y remalladora overlock de 4 hilos', 'Taller familiar de confección para fabricar uniformes escolares, batas de laboratorio y ropa deportiva. Las máquinas industriales permitirán producir con acabados profesionales y bajar costos para familias de bajos recursos.', 'emprendimiento', 780.00, 560.00, '/projects/costura.jpg', 'Yurimar Peña', 'San Cristóbal, Táchira', '48291037', 11),
('Manto asfáltico, sellador y pintura para techos de Escuela Rural Tabay', 'Filtraciones severas están dañando las aulas de 60 niños. Esta meta cubre 12 rollos de manto asfáltico, 4 cuñetes de pintura impermeabilizante, imprimador y honorarios del técnico instalador.', 'causa_social', 1850.00, 1320.00, '/projects/techos.jpg', 'Comité Educativo Los Andes', 'Tabay, Mérida', '31849201', 7),
('2 Sillas hidráulicas de barbero, máquinas profesionales Wahl y espejo', 'Dos jóvenes barberos de Puerto La Cruz buscan salir de la calle y abrir un local formal. Se adquirirán 2 sillas de peluquería reclinables, dos combos de máquinas de corte y patillera profesional.', 'emprendimiento', 680.00, 450.00, '/projects/barberia.jpg', 'Brayan & Josué Barber', 'Puerto La Cruz, Anzoátegui', '82910472', 16),
('Tanques de 2.000 litros, bomba periférica y filtros de carbón para comunidad', 'Instalación de sistema de almacenamiento y purificación de agua potable para 30 familias indígenas que actualmente deben recolectar agua del río sin tratamiento.', 'causa_social', 1600.00, 1150.00, '/projects/tanque.jpg', 'Voluntarios Guayana Verde', 'Puerto Ordaz, Bolívar', '64729104', 5),
('Laptop ThinkPad Core i5, 16GB RAM y SSD para estudiar y trabajar en programación', 'Estudiante de ingeniería informática sin recursos para una computadora propia. Con esta laptop podré desarrollar aplicaciones, trabajar como programador remoto y mantener a mi familia.', 'emprendimiento', 580.00, 410.00, '/projects/laptop.jpg', 'Jesús David Morillo', 'Maracay, Aragua', '90284719', 10),
('3 Tensiómetros digitales, 4 glucómetros, oxímetros y nebulizador para ambulatorio', 'Dotación instrumental médica básica para atender a más de 800 pacientes crónicos en sector vulnerable, evitando que ancianos deban trasladarse a hospitales lejanos sin transporte.', 'causa_social', 480.00, 365.00, '/projects/tensiometro.jpg', 'Dra. Rosaura Blanco', 'Guarenas, Miranda', '55192837', 8)
ON CONFLICT DO NOTHING;

INSERT INTO public.reviews (user_name, user_role, location, rating, comment)
VALUES
('Elena Mendoza', 'creador', 'Valencia, Carabobo', 5, 'Pude completar los $780 para las máquinas de costura. El retiro por Binance Pay a mi cuenta fue en menos de 2 horas. La comisión del 5% es súper transparente.'),
('Carlos Rondón', 'donante', 'Madrid, España', 5, 'Desde España envié 50 USDT con Binance Pay directamente al ID 37999878 sin bancos bloqueando el pago. Ver que los abuelos recibieron su comida no tiene precio.'),
('Dra. Patricia Colmenares', 'creador', 'Caracas', 5, 'Recolectamos los fondos para los insumos del ambulatorio en tiempo récord. El panel de usuario te deja ver cada donación en tiempo real.'),
('Andrés Silva', 'donante', 'Santiago, Chile', 5, 'Excelente plataforma. Apoyé el taller de soldadura con 30 USDT. Cero complicaciones y el registro es sumamente fácil.')
ON CONFLICT DO NOTHING;
