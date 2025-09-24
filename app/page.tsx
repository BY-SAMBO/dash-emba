import { getLogtoContext, signIn, signOut } from '@logto/next/server-actions';
import SignIn from './sign-in';
import SignOut from './sign-out';
import { logtoConfig } from '@/lib/logto';
import { redirect } from 'next/navigation';

export default async function HomePage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  // Get authentication context on server side
  const { isAuthenticated, claims, userInfo } = await getLogtoContext(logtoConfig);

  // If authenticated, redirect to dashboard
  if (isAuthenticated) {
    redirect('/dashboard');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              EMBA Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Plataforma de equipos colaborativos
            </p>
          </div>

          {searchParams.error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-red-700 dark:text-red-400 text-sm">
                {searchParams.error === 'callback-failed'
                  ? 'Error en el proceso de autenticación. Intenta nuevamente.'
                  : 'Error de autenticación desconocido.'
                }
              </p>
            </div>
          )}

          <div className="space-y-4">
            <SignIn
              onSignIn={async () => {
                'use server';
                await signIn(logtoConfig);
              }}
            />

            <div className="text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Accede con tu cuenta de la organización
              </p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="text-center">
              <p className="text-xs text-gray-400 dark:text-gray-500">
                Powered by Logto SSO • Industrias Galgo
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
