import { DashboardWidget as DashboardWidgetType } from '@/lib/supabase';

interface DashboardWidgetProps {
  widget: DashboardWidgetType;
  teamId: string;
}

export default function DashboardWidget({ widget }: DashboardWidgetProps) {
  const renderWidgetContent = () => {
    switch (widget.widget_type) {
      case 'stats':
        return (
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              {widget.config.stat_type === 'progress' ? '75%' : '---'}
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Progreso completado
            </p>
          </div>
        );

      case 'content':
        return (
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                {widget.config.max_items || 5} recursos disponibles
              </span>
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center text-gray-600 dark:text-gray-400">
                <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                Material de lectura
              </li>
              <li className="flex items-center text-gray-600 dark:text-gray-400">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                Videos explicativos
              </li>
              <li className="flex items-center text-gray-600 dark:text-gray-400">
                <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
                Ejercicios prácticos
              </li>
            </ul>
          </div>
        );

      case 'chart':
        return (
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Período: {widget.config.period === 'weekly' ? 'Semanal' : 'Mensual'}
              </span>
            </div>
            <div className="space-y-3">
              {/* Simulated chart data */}
              {[
                { day: 'Lun', value: 65 },
                { day: 'Mar', value: 45 },
                { day: 'Mié', value: 80 },
                { day: 'Jue', value: 30 },
                { day: 'Vie', value: 90 },
              ].map((item) => (
                <div key={item.day} className="flex items-center space-x-3">
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400 w-8">
                    {item.day}
                  </span>
                  <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${item.value}%` }}
                    ></div>
                  </div>
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-300 w-8">
                    {item.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center text-gray-500 dark:text-gray-400">
            <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
              </svg>
            </div>
            <p className="text-sm">Widget en desarrollo</p>
          </div>
        );
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900 dark:text-white">
          {widget.title}
        </h3>
        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
      </div>
      {renderWidgetContent()}
      <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
        <p className="text-xs text-gray-400 dark:text-gray-500">
          Actualizado: {new Date(widget.updated_at).toLocaleDateString('es-ES')}
        </p>
      </div>
    </div>
  );
}