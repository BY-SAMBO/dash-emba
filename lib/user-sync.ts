import { supabaseAdmin, UserProfile, Team } from './supabase';

export interface LogtoUserClaims {
  sub: string;
  email?: string;
  name?: string;
  picture?: string;
  custom_data?: {
    team?: string;
    role?: string;
    [key: string]: any;
  };
}

export async function syncUserWithSupabase(claims: LogtoUserClaims): Promise<UserProfile> {
  if (!claims.sub) {
    throw new Error('User ID (sub) is required');
  }

  // Primero, buscar o crear el equipo si existe en custom_data
  let teamId: string | null = null;
  if (claims.custom_data?.team) {
    teamId = await findOrCreateTeam(claims.custom_data.team);
  }

  // Buscar usuario existente
  const { data: existingUser, error: fetchError } = await supabaseAdmin
    .from('user_profiles')
    .select('*')
    .eq('logto_user_id', claims.sub)
    .single();

  if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 = no rows returned
    throw new Error(`Error fetching user: ${fetchError.message}`);
  }

  const userData = {
    logto_user_id: claims.sub,
    email: claims.email || '',
    name: claims.name,
    picture: claims.picture,
    team_id: teamId,
    role: claims.custom_data?.role,
    custom_data: claims.custom_data || {},
    updated_at: new Date().toISOString(),
  };

  if (existingUser) {
    // Actualizar usuario existente
    const { data: updatedUser, error: updateError } = await supabaseAdmin
      .from('user_profiles')
      .update(userData)
      .eq('logto_user_id', claims.sub)
      .select()
      .single();

    if (updateError) {
      throw new Error(`Error updating user: ${updateError.message}`);
    }

    return updatedUser;
  } else {
    // Crear nuevo usuario
    const { data: newUser, error: insertError } = await supabaseAdmin
      .from('user_profiles')
      .insert([userData])
      .select()
      .single();

    if (insertError) {
      throw new Error(`Error creating user: ${insertError.message}`);
    }

    // Si es un usuario nuevo con equipo, crear widgets por defecto
    if (teamId) {
      await createDefaultWidgets(teamId);
      await createDefaultCourseContent(teamId);
    }

    return newUser;
  }
}

async function findOrCreateTeam(teamName: string): Promise<string> {
  // Buscar equipo existente
  const { data: existingTeam, error: fetchError } = await supabaseAdmin
    .from('teams')
    .select('id')
    .eq('name', teamName)
    .single();

  if (existingTeam) {
    return existingTeam.id;
  }

  if (fetchError && fetchError.code !== 'PGRST116') {
    throw new Error(`Error fetching team: ${fetchError.message}`);
  }

  // Crear nuevo equipo
  const { data: newTeam, error: insertError } = await supabaseAdmin
    .from('teams')
    .insert([{
      name: teamName,
      description: `Equipo ${teamName}`,
      settings: {
        theme: 'default',
        features: ['dashboard', 'course_content', 'analytics']
      }
    }])
    .select('id')
    .single();

  if (insertError) {
    throw new Error(`Error creating team: ${insertError.message}`);
  }

  return newTeam.id;
}

async function createDefaultWidgets(teamId: string): Promise<void> {
  const defaultWidgets = [
    {
      team_id: teamId,
      widget_type: 'stats',
      title: 'Progreso del Equipo',
      config: {
        stat_type: 'progress',
        color: 'blue'
      },
      position: { x: 0, y: 0, w: 6, h: 4 }
    },
    {
      team_id: teamId,
      widget_type: 'content',
      title: 'Recursos del Curso',
      config: {
        content_type: 'course_resources',
        max_items: 5
      },
      position: { x: 6, y: 0, w: 6, h: 4 }
    },
    {
      team_id: teamId,
      widget_type: 'chart',
      title: 'Actividad Reciente',
      config: {
        chart_type: 'activity',
        period: 'weekly'
      },
      position: { x: 0, y: 4, w: 12, h: 6 }
    }
  ];

  const { error } = await supabaseAdmin
    .from('dashboard_widgets')
    .insert(defaultWidgets);

  if (error) {
    console.error('Error creating default widgets:', error);
  }
}

async function createDefaultCourseContent(teamId: string): Promise<void> {
  const defaultContent = [
    {
      team_id: teamId,
      title: 'Bienvenida al Programa EMBA',
      content: 'Contenido de bienvenida personalizado para tu equipo.',
      type: 'lesson',
      order_index: 1
    },
    {
      team_id: teamId,
      title: 'Recursos y Materiales',
      content: 'Aquí encontrarás todos los recursos necesarios para el programa.',
      type: 'resource',
      order_index: 2
    }
  ];

  const { error } = await supabaseAdmin
    .from('course_content')
    .insert(defaultContent);

  if (error) {
    console.error('Error creating default content:', error);
  }
}

export async function getUserProfile(logtoUserId: string): Promise<UserProfile | null> {
  const { data, error } = await supabaseAdmin
    .from('user_profiles')
    .select(`
      *,
      teams (
        id,
        name,
        description,
        settings
      )
    `)
    .eq('logto_user_id', logtoUserId)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null;
    }
    throw new Error(`Error fetching user profile: ${error.message}`);
  }

  return data;
}