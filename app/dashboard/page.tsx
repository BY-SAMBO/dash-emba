import { getLogtoContext } from '@logto/next/server-actions';
import { logtoConfig } from '@/lib/logto';
import { redirect } from 'next/navigation';
import SignOutButton from './sign-out-button';

export default async function DashboardPage() {
  const { isAuthenticated, claims } = await getLogtoContext(logtoConfig);

  if (!isAuthenticated) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
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
              </div>
              <div className="flex items-center space-x-4">
                {claims?.picture && (
                  <img
                    src={claims.picture}
                    alt="Avatar"
                    className="w-10 h-10 rounded-full"
                  />
                )}
                <SignOutButton />
              </div>
            </div>
          </div>

          {/* User Info Card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Información del Usuario
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Email:</span>
                  <p className="text-gray-900 dark:text-white">{claims?.email || 'No disponible'}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Nombre:</span>
                  <p className="text-gray-900 dark:text-white">{claims?.name || 'No disponible'}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Usuario ID:</span>
                  <p className="text-gray-900 dark:text-white font-mono text-sm">{claims?.sub}</p>
                </div>
              </div>
              <div className="space-y-2">
                <div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Custom Data:</span>
                  <pre className="text-sm text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 p-3 rounded-lg overflow-auto">
                    {JSON.stringify(claims?.custom_data || {}, null, 2)}
                  </pre>
                </div>
              </div>
            </div>
          </div>

          {/* Team Info */}
          {claims?.custom_data?.team && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl shadow-xl p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Información del Equipo
              </h2>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {claims.custom_data.team}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  {claims.custom_data.role && `Rol: ${claims.custom_data.role}`}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}