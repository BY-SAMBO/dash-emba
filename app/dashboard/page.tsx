import { getLogtoContext } from '@logto/next/server-actions';
import { logtoConfig } from '@/lib/logto';
import { redirect } from 'next/navigation';
import { syncUserWithSupabase, getUserProfile } from '@/lib/user-sync';
import SignOutButton from './sign-out-button';
import TeamDashboard from './team-dashboard';

export default async function DashboardPage() {
  const { isAuthenticated, claims } = await getLogtoContext(logtoConfig);

  if (!isAuthenticated || !claims) {
    redirect('/login');
  }

  // Sincronizar usuario con Supabase
  try {
    await syncUserWithSupabase(claims);
  } catch (error) {
    console.error('Error syncing user:', error);
  }

  // Obtener perfil completo del usuario
  const userProfile = await getUserProfile(claims.sub);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Dashboard EMBA
                </h1>
                <p className="text-gray-600 dark:text-gray-300 mt-1">
                  Bienvenido, {claims?.name || claims?.email || 'Usuario'}
                </p>
                {userProfile?.teams && (
                  <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                    Equipo: {userProfile.teams.name}
                  </p>
                )}
              </div>
              <div className="flex items-center space-x-4">
                {claims?.picture && (
                  <img
                    src={claims.picture}
                    alt="Avatar"
                    className="w-10 h-10 rounded-full ring-2 ring-blue-500 ring-offset-2"
                  />
                )}
                <SignOutButton />
              </div>
            </div>
          </div>

          {/* Dashboard personalizado por equipo */}
          {userProfile?.team_id ? (
            <TeamDashboard
              teamId={userProfile.team_id}
              userProfile={userProfile}
            />
          ) : (
            // Vista por defecto si no tiene equipo
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Sin equipo asignado
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Tu usuario no tiene un equipo asignado en el sistema.
                  Contacta al administrador para ser asignado a un equipo.
                </p>

                {/* Mostrar información disponible */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mt-6">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Información de tu cuenta:
                  </h4>
                  <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <p><strong>Email:</strong> {claims.email}</p>
                    <p><strong>Nombre:</strong> {claims.name || 'No disponible'}</p>
                    {claims.custom_data && Object.keys(claims.custom_data).length > 0 && (
                      <div>
                        <strong>Datos personalizados:</strong>
                        <pre className="text-xs mt-1 bg-gray-100 dark:bg-gray-600 p-2 rounded overflow-auto">
                          {JSON.stringify(claims.custom_data, null, 2)}
                        </pre>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}