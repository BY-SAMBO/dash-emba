import { getLogtoContext, signOut } from '@logto/next/server-actions';
import SignOut from '../sign-out';
import { logtoConfig } from '@/lib/logto';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  // Get authentication context on server side
  const { isAuthenticated, claims, userInfo } = await getLogtoContext(logtoConfig);

  if (!isAuthenticated) {
    redirect('/');
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
                  Bienvenido, {userInfo?.name || claims?.name || userInfo?.email || 'Usuario'}
                </p>
                {claims?.custom_data && typeof claims.custom_data === 'object' && 'team' in claims.custom_data ? (
                  <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                    Equipo: {String((claims.custom_data as any).team)}
                  </p>
                ) : null}
              </div>
              <div className="flex items-center space-x-4">
                {userInfo?.picture && (
                  <img
                    src={userInfo.picture}
                    alt="Avatar"
                    className="w-10 h-10 rounded-full ring-2 ring-blue-500 ring-offset-2"
                  />
                )}
                <SignOut
                  onSignOut={async () => {
                    'use server';
                    await signOut(logtoConfig);
                  }}
                />
              </div>
            </div>
          </div>

          {/* User Information Card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Información del Usuario
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Email:</span>
                  <p className="text-gray-900 dark:text-white">{userInfo?.email || 'No disponible'}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Nombre:</span>
                  <p className="text-gray-900 dark:text-white">{userInfo?.name || 'No disponible'}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Usuario ID:</span>
                  <p className="text-gray-900 dark:text-white font-mono text-sm">{claims?.sub}</p>
                </div>
              </div>
              <div className="space-y-3">
                {claims?.custom_data ? (
                  <div>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Datos Personalizados:</span>
                    <div className="mt-2 bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                      {Object.entries(claims.custom_data).map(([key, value]) => (
                        <div key={key} className="flex justify-between items-center py-1">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                            {key.replace('_', ' ')}:
                          </span>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          {/* Team Dashboard */}
          {claims?.custom_data && typeof claims.custom_data === 'object' && 'team' in claims.custom_data ? (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl shadow-xl p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Dashboard del Equipo: {String((claims.custom_data as any).team)}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
                  <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Progreso del Curso</h3>
                  <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">75%</p>
                  <p className="text-sm text-blue-600 dark:text-blue-400">Completado</p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
                  <h3 className="font-semibold text-green-800 dark:text-green-200 mb-2">Recursos</h3>
                  <p className="text-3xl font-bold text-green-600 dark:text-green-400">12</p>
                  <p className="text-sm text-green-600 dark:text-green-400">Disponibles</p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
                  <h3 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">Actividad</h3>
                  <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">8</p>
                  <p className="text-sm text-purple-600 dark:text-purple-400">Esta semana</p>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 dark:text-white mb-3">Información del Equipo:</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700 dark:text-gray-300">Equipo:</span>
                    <p className="text-gray-600 dark:text-gray-400">{(claims.custom_data as any).team}</p>
                  </div>
                  {(claims.custom_data as any).role && (
                    <div>
                      <span className="font-medium text-gray-700 dark:text-gray-300">Rol:</span>
                      <p className="text-gray-600 dark:text-gray-400">{(claims.custom_data as any).role}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center">
              <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Sin Equipo Asignado
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Tu usuario no tiene un equipo asignado en Logto.
                Contacta al administrador para ser asignado a un equipo.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}