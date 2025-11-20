import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  gradientFrom?: string;
  gradientTo?: string;
}

export function MetricCard({
  title,
  value,
  icon: Icon,
  description,
  trend,
  gradientFrom = 'from-blue-500',
  gradientTo = 'to-purple-600',
}: MetricCardProps) {
  return (
    <Card className="group relative overflow-hidden border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      {/* Gradiente de fondo sutil */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradientFrom} ${gradientTo} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
      
      {/* Brillo en la esquina superior */}
      <div className={`absolute -top-24 -right-24 h-48 w-48 rounded-full bg-gradient-to-br ${gradientFrom} ${gradientTo} opacity-10 blur-3xl group-hover:opacity-20 transition-opacity duration-500`} />
      
      <CardHeader className="relative flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors">
          {title}
        </CardTitle>
        <div className={`rounded-lg bg-gradient-to-br ${gradientFrom} ${gradientTo} p-2.5 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
          <Icon className="h-4 w-4 text-white drop-shadow-md" />
        </div>
      </CardHeader>
      
      <CardContent className="relative">
        <div className="text-3xl font-bold text-gray-900 group-hover:text-gray-950 transition-colors">
          {value}
        </div>
        
        {description && (
          <p className="text-xs text-gray-500 mt-2 group-hover:text-gray-600 transition-colors">
            {description}
          </p>
        )}
        
        {trend && (
          <div className="flex items-center gap-1 mt-3 pt-3 border-t border-gray-100">
            <span
              className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${
                trend.isPositive
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              }`}
            >
              {trend.isPositive ? '↑' : '↓'}
              {Math.abs(trend.value)}%
            </span>
            <span className="text-xs text-gray-500">vs last month</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
