import { supabaseAdmin, UserProfile, DashboardWidget as DashboardWidgetType, CourseContent } from '@/lib/supabase';
import DashboardWidget from './dashboard-widget';

interface TeamDashboardProps {
  teamId: string;
  userProfile: UserProfile & {
    teams: {
      id: string;
      name: string;
      description?: string;
      settings?: Record<string, any>;
    };
  };
}

async function getTeamWidgets(teamId: string): Promise<DashboardWidgetType[]> {
  const { data, error } = await supabaseAdmin
    .from('dashboard_widgets')
    .select('*')
    .eq('team_id', teamId)
    .eq('is_visible', true)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching widgets:', error);
    return [];
  }

  return data || [];
}

async function getTeamCourseContent(teamId: string): Promise<CourseContent[]> {
  const { data, error } = await supabaseAdmin
    .from('course_content')
    .select('*')
    .eq('team_id', teamId)
    .eq('is_visible', true)
    .order('order_index', { ascending: true });

  if (error) {
    console.error('Error fetching course content:', error);
    return [];
  }

  return data || [];
}

export default async function TeamDashboard({ teamId, userProfile }: TeamDashboardProps) {
  const [widgets, courseContent] = await Promise.all([
    getTeamWidgets(teamId),
    getTeamCourseContent(teamId)
  ]);

  return (
    <div className="space-y-8">
      {/* Team Info Card */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl shadow-xl p-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {userProfile.teams.name}
            </h2>
            {userProfile.teams.description && (
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {userProfile.teams.description}
              </p>
            )}
            <div className="flex items-center space-x-4 text-sm">
              {userProfile.role && (
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full font-medium">
                  {userProfile.role}
                </span>
              )}
              <span className="text-gray-500 dark:text-gray-400">
                ID: {teamId.substring(0, 8)}...
              </span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500 dark:text-gray-400">Miembro desde</p>
            <p className="font-medium text-gray-900 dark:text-white">
              {new Date(userProfile.created_at).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Dashboard Widgets */}
      {widgets.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {widgets.map((widget) => (
            <DashboardWidget
              key={widget.id}
              widget={widget}
              teamId={teamId}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Dashboard en construcción
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Los widgets del dashboard se están configurando para tu equipo.
          </p>
        </div>
      )}

      {/* Course Content Section */}
      {courseContent.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Contenido del Programa
          </h3>
          <div className="grid gap-4">
            {courseContent.map((content, index) => (
              <div
                key={content.id}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-sm font-semibold">
                        {index + 1}
                      </span>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {content.title}
                      </h4>
                      <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded capitalize">
                        {content.type}
                      </span>
                    </div>
                    {content.content && (
                      <p className="text-gray-600 dark:text-gray-300 text-sm ml-11">
                        {content.content}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}