import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

export interface UserProfile {
  id: string;
  logto_user_id: string;
  email: string;
  name?: string;
  picture?: string;
  team_id?: string;
  role?: string;
  custom_data?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface Team {
  id: string;
  name: string;
  description?: string;
  settings?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface CourseContent {
  id: string;
  team_id: string;
  title: string;
  content: string;
  type: 'lesson' | 'resource' | 'assignment';
  order_index: number;
  is_visible: boolean;
  created_at: string;
  updated_at: string;
}

export interface DashboardWidget {
  id: string;
  team_id: string;
  widget_type: 'stats' | 'chart' | 'content' | 'progress';
  title: string;
  config: Record<string, any>;
  position: { x: number; y: number; w: number; h: number };
  is_visible: boolean;
  created_at: string;
  updated_at: string;
}