-- Esquema para Supabase (ImpulsoVzla)
CREATE TABLE IF NOT EXISTS projects (
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
  status VARCHAR(20) DEFAULT 'activa',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS donations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  donor_name VARCHAR(100) DEFAULT 'Anónimo',
  donor_location VARCHAR(100) DEFAULT 'Exterior / Local',
  amount_usdt NUMERIC(10, 2) NOT NULL,
  platform_fee NUMERIC(10, 2) NOT NULL, -- 5%
  net_amount NUMERIC(10, 2) NOT NULL,    -- 95%
  binance_order_id VARCHAR(100) NOT NULL,
  status VARCHAR(20) DEFAULT 'verificado',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_name VARCHAR(100) NOT NULL,
  user_role VARCHAR(50) NOT NULL CHECK (user_role IN ('creador', 'donante')),
  location VARCHAR(100) NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
