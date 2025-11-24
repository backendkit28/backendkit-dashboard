'use client';

import { useEffect, useState } from 'react';
import { MetricCard } from '@/components/dashboard/metric-card';
import { UserGrowthChart } from '@/components/charts/user-growth-chart';
import { getMetrics } from '@/lib/api';
import { Metrics } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Users,
  Building2,
  CreditCard,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Activity,
} from 'lucide-react';

export default function DashboardPage() {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMetrics();
  }, []);

  async function loadMetrics() {
    try {
      const data = await getMetrics();
      console.log('Metrics loaded:', data); // ✅ Para debug
      setMetrics(data);
    } catch (error) {
      console.error('Error loading metrics:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="flex flex-col items-center gap-3">
          <Activity className="h-8 w-8 animate-spin text-blue-600" />
          <p className="text-sm text-gray-600">Loading metrics...</p>
        </div>
      </div>
    );
  }

  if (!metrics) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <p className="text-lg font-semibold text-gray-900">Error loading metrics</p>
          <p className="text-sm text-gray-600 mt-1">Please try refreshing the page</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header mejorado */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-gray-600 mt-2">Welcome back! Here&apos;s your BackendKit overview</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100">
          <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-sm font-medium text-gray-700">All systems operational</span>
        </div>
      </div>

      {/* Métricas principales con gradientes específicos */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Tenants"
          value={metrics.totalTenants || 0}
          icon={Building2}
          description="Active clients"
          gradientFrom="from-blue-500"
          gradientTo="to-cyan-500"
        />
        <MetricCard
          title="Total Users"
          value={metrics.totalUsers || 0}
          icon={Users}
          description="All registered users"
          gradientFrom="from-purple-500"
          gradientTo="to-pink-500"
        />
        <MetricCard
          title="Active Subscriptions"
          value={metrics.activeSubscriptions || 0}
          icon={CreditCard}
          description="Paying customers"
          gradientFrom="from-emerald-500"
          gradientTo="to-teal-500"
        />
        <MetricCard
          title="MRR"
          value={`$${(metrics.mrr || 0).toFixed(2)}`}
          icon={DollarSign}
          description="Monthly Recurring Revenue"
          gradientFrom="from-amber-500"
          gradientTo="to-orange-500"
        />
      </div>

      {/* Métricas secundarias */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <MetricCard
          title="New Users (30d)"
          value={metrics.newUsersLast30Days || 0}
          icon={TrendingUp}
          description="Last 30 days"
          gradientFrom="from-green-500"
          gradientTo="to-emerald-500"
        />
        <MetricCard
          title="Churn Rate"
          value={`${(metrics.churnRate || 0).toFixed(1)}%`}
          icon={TrendingDown}
          description="Cancellation rate"
          gradientFrom="from-red-500"
          gradientTo="to-rose-500"
        />
      </div>

      {/* Gráfica con mejor diseño */}
      {metrics.userGrowth && metrics.userGrowth.length > 0 && (
        <Card className="border-gray-200 shadow-md">
          <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <Activity className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle>User Growth</CardTitle>
                <p className="text-sm text-gray-500 mt-1">Activity over the last 30 days</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <UserGrowthChart data={metrics.userGrowth} />
          </CardContent>
        </Card>
      )}
    </div>
  );
}