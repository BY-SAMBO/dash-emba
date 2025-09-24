-- Crear extensiones necesarias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabla de equipos
CREATE TABLE IF NOT EXISTS teams (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  settings JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de perfiles de usuario
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  logto_user_id VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  picture VARCHAR(500),
  team_id UUID REFERENCES teams(id) ON DELETE SET NULL,
  role VARCHAR(100),
  custom_data JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de contenido del curso
CREATE TABLE IF NOT EXISTS course_content (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
  title VARCHAR(500) NOT NULL,
  content TEXT,
  type VARCHAR(50) DEFAULT 'lesson',
  order_index INTEGER DEFAULT 0,
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de widgets del dashboard
CREATE TABLE IF NOT EXISTS dashboard_widgets (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
  widget_type VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  config JSONB DEFAULT '{}',
  position JSONB DEFAULT '{"x": 0, "y": 0, "w": 4, "h": 4}',
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para optimización
CREATE INDEX IF NOT EXISTS idx_user_profiles_logto_user_id ON user_profiles(logto_user_id);
CREATE INDEX IF NOT EXISTS idx_user_profiles_team_id ON user_profiles(team_id);
CREATE INDEX IF NOT EXISTS idx_course_content_team_id ON course_content(team_id);
CREATE INDEX IF NOT EXISTS idx_dashboard_widgets_team_id ON dashboard_widgets(team_id);

-- RLS (Row Level Security) para seguridad
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE dashboard_widgets ENABLE ROW LEVEL SECURITY;

-- Políticas de seguridad
CREATE POLICY "Users can view their own team" ON teams
  FOR SELECT USING (
    id IN (
      SELECT team_id FROM user_profiles
      WHERE logto_user_id = current_setting('app.current_user_id', true)
    )
  );

CREATE POLICY "Users can view their own profile" ON user_profiles
  FOR SELECT USING (logto_user_id = current_setting('app.current_user_id', true));

CREATE POLICY "Users can update their own profile" ON user_profiles
  FOR UPDATE USING (logto_user_id = current_setting('app.current_user_id', true));

CREATE POLICY "Users can view their team's content" ON course_content
  FOR SELECT USING (
    team_id IN (
      SELECT team_id FROM user_profiles
      WHERE logto_user_id = current_setting('app.current_user_id', true)
    )
  );

CREATE POLICY "Users can view their team's widgets" ON dashboard_widgets
  FOR SELECT USING (
    team_id IN (
      SELECT team_id FROM user_profiles
      WHERE logto_user_id = current_setting('app.current_user_id', true)
    )
  );

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para actualizar updated_at
CREATE TRIGGER update_teams_updated_at BEFORE UPDATE ON teams
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_course_content_updated_at BEFORE UPDATE ON course_content
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_dashboard_widgets_updated_at BEFORE UPDATE ON dashboard_widgets
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();