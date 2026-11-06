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
-- 6. DATOS DE INICIO / PROYECTOS INSPIRADORES
-- ========================================================
INSERT INTO public.projects (title, description, category, target_amount, current_amount, image_url, creator_name, creator_location, creator_binance_pay_id, days_left)
VALUES
('Batidora industrial y horno para Repostería Doña Carmen', 'Llevo 2 años horneando tortas en Valencia con un hornito casero. Con esta batidora y horno podré quintuplicar mi producción de pedidos semanales y generar empleo.', 'emprendimiento', 180.00, 135.00, 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80', 'Carmen Rivas', 'Valencia, Carabobo', '54201948', 6),
('Comedor Comunitario: Almuerzos para 45 abuelos en Petare', 'Cada sábado preparamos sopas y almuerzos nutritivos para personas de la tercera edad en situación vulnerable. Requerimos fondos para insumos secos y empaques.', 'causa_social', 320.00, 265.00, 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80', 'Fundación Mano Amiga', 'Petare, Caracas', '99104823', 9),
('Herramientas de soldadura y pulitura para Taller Mecánico', 'Joven técnico egresado del INCES busca adquirir su primera máquina inversora para ofrecer servicio de herrería y reparación de motos.', 'emprendimiento', 150.00, 95.00, 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?w=800&q=80', 'Kelvin González', 'Barquisimeto, Lara', '77293014', 14),
('Rescate y esterilización de 20 perritos callejeros', 'Jornada comunitaria de salud veterinaria, vacunas y esterilización para frenar la sobrepoblación y brindar alimento a animales en abandono.', 'causa_social', 200.00, 185.00, 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&q=80', 'Huellas de Maracaibo', 'Maracaibo, Zulia', '66391024', 3),
('Máquina de coser semi-industrial para Taller de Costura y Confección', 'Madre soltera busca adquirir una máquina recta semi-industrial para confeccionar uniformes escolares y pijamas a precios populares.', 'emprendimiento', 160.00, 120.00, 'https://images.unsplash.com/photo-1528458876885-544243326950?w=800&q=80', 'Yurimar Peña', 'San Cristóbal, Táchira', '48291037', 11),
('Reparación de techos y pintura para Escuela Rural Tabay', 'Comité de padres y maestros unidos para impermeabilizar dos aulas que sufren filtraciones severas durante las lluvias, protegiendo a 60 niños.', 'causa_social', 280.00, 220.00, 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80', 'Comité Educativo Los Andes', 'Tabay, Mérida', '31849201', 7),
('Kit profesional de tijeras, máquinas y silla de Barbería Juvenil', 'Emprendimiento de dos jóvenes barberos en barrio popular para montar un puesto digno y enseñar el oficio a muchachos en riesgo.', 'emprendimiento', 130.00, 90.00, 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&q=80', 'Brayan & Josué Barber', 'Puerto La Cruz, Anzoátegui', '82910472', 16),
('Filtros ecológicos de agua potable para 30 familias indígenas', 'Instalación de sistemas comunitarios de filtración de agua limpia para prevenir enfermedades estomacales y deshidratación infantil.', 'causa_social', 350.00, 310.00, 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=800&q=80', 'Voluntarios Guayana Verde', 'Puerto Ordaz, Bolívar', '64729104', 4),
('Laptop reacondicionada para estudiar Programación y Desarrollo Web', 'Estudiante de ingeniería informática sin equipo propio para programar. Con esta laptop podré hacer proyectos freelance y dar talleres básicos.', 'emprendimiento', 220.00, 175.00, 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80', 'Jesús David Morillo', 'Maracay, Aragua', '90284719', 10),
('Dotación de tensiómetros, glucómetros y botiquín para Ambulatorio Popular', 'Apoyo para abastecer de instrumentos esenciales de chequeo preventivo para hipertensión y diabetes a más de 800 familias de bajos recursos.', 'causa_social', 190.00, 155.00, 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80', 'Dra. Rosaura Blanco', 'Guarenas, Miranda', '55192837', 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.reviews (user_name, user_role, location, rating, comment)
VALUES
('Elena Mendoza', 'creador', 'Valencia, Carabobo', 5, 'Pude completar mi meta para comprar insumos de costura. El retiro por Binance Pay llegó súper rápido y el 5% de comisión es totalmente justo y transparente.'),
('Carlos Rondón', 'donante', 'Madrid, España', 5, 'Desde España siempre quise ayudar a emprendedores en mi país sin que las comisiones bancarias se comieran el dinero. Con Binance Pay envié 20 USDT en 10 segundos.'),
('Dra. Patricia Colmenares', 'creador', 'Caracas', 5, 'Gracias a esta plataforma recolectamos insumos para las jornadas médicas comunitarias en La Pastora. La transparencia que da mostrar los avances es increíble.'),
('Andrés Silva', 'donante', 'Santiago, Chile', 5, 'Excelente iniciativa. El flujo con el Pay ID 37999878 es intuitivo y la verificación fue casi inmediata. Sigan adelante apoyando el talento venezolano.')
ON CONFLICT DO NOTHING;
