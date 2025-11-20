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
      setMetrics(data);
    } catch (error) {
      console.error('Error loading metrics:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!metrics) {
    return <div>Error loading metrics</div>;
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-600">Overview of your BackendKit metrics</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Tenants"
          value={metrics.totalTenants}
          icon={Building2}
          description="Active clients"
        />
        <MetricCard
          title="Total Users"
          value={metrics.totalUsers}
          icon={Users}
          description="All registered users"
        />
        <MetricCard
          title="Active Subscriptions"
          value={metrics.activeSubscriptions}
          icon={CreditCard}
          description="Paying customers"
        />
        <MetricCard
          title="MRR"
          value={`$${metrics.mrr.toFixed(2)}`}
          icon={DollarSign}
          description="Monthly Recurring Revenue"
        />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <MetricCard
          title="New Users (30d)"
          value={metrics.newUsersLast30Days}
          icon={TrendingUp}
          description="Last 30 days"
        />
        <MetricCard
          title="Churn Rate"
          value={`${metrics.churnRate.toFixed(1)}%`}
          icon={TrendingDown}
          description="Cancellation rate"
        />
      </div>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>User Growth (Last 30 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <UserGrowthChart data={metrics.userGrowth} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}