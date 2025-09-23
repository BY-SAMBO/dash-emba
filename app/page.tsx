export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <main className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Team Dashboard Platform
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Plataforma colaborativa con SSO y dashboards personalizados por equipo
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
              Estado del Sistema
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600 dark:text-gray-400">Servidor</span>
                  <span className="px-3 py-1 bg-green-500 text-white text-xs rounded-full">Activo</span>
                </div>
                <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">Online</p>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600 dark:text-gray-400">SSO Status</span>
                  <span className="px-3 py-1 bg-yellow-500 text-white text-xs rounded-full">Configurando</span>
                </div>
                <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">Logto</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
              Próximos Pasos
            </h2>

            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-3">
                  <span className="text-blue-600 dark:text-blue-300 font-semibold">1</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200">Configurar Logto SSO</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Integrar autenticación single sign-on</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-3">
                  <span className="text-blue-600 dark:text-blue-300 font-semibold">2</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200">Conectar Supabase</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Base de datos y almacenamiento</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-3">
                  <span className="text-blue-600 dark:text-blue-300 font-semibold">3</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200">Dashboards por Equipo</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Vistas personalizadas según customData de Logto</p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <a
                href="/login"
                className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
              >
                Iniciar Sesión
              </a>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
