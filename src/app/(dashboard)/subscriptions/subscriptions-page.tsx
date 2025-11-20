'use client';

import { useEffect, useState } from 'react';
import { getSubscriptions } from '@/lib/api';
import { Subscription } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { CreditCard, DollarSign, Activity, AlertCircle } from 'lucide-react';

export default function SubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSubscriptions();
  }, []);

  async function loadSubscriptions() {
    try {
      const data = await getSubscriptions();
      setSubscriptions(data.subscriptions || data);
    } catch (error) {
      console.error('Error loading subscriptions:', error);
    } finally {
      setLoading(false);
    }
  }

  function getStatusBadge(status: string) {
    const statusMap: Record<string, { variant: 'success' | 'danger' | 'warning' | 'default'; label: string }> = {
      active: { variant: 'success', label: 'Active' },
      canceled: { variant: 'danger', label: 'Canceled' },
      past_due: { variant: 'warning', label: 'Past Due' },
      incomplete: { variant: 'default', label: 'Incomplete' },
      trialing: { variant: 'secondary' as any, label: 'Trial' },
    };

    const statusInfo = statusMap[status] || { variant: 'default', label: status };
    
    return (
      <Badge variant={statusInfo.variant}>
        {statusInfo.label}
      </Badge>
    );
  }

  function getPlanPrice(priceId: string) {
    if (priceId === process.env.NEXT_PUBLIC_STRIPE_PRICE_STARTER) {
      return { amount: '$9.99', period: '/mo', plan: 'Starter' };
    }
    if (priceId === process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO) {
      return { amount: '$29.99', period: '/mo', plan: 'Pro' };
    }
    return { amount: 'Unknown', period: '', plan: 'Unknown' };
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="flex flex-col items-center gap-3">
          <Activity className="h-8 w-8 animate-spin text-blue-600" />
          <p className="text-sm text-gray-600">Loading subscriptions...</p>
        </div>
      </div>
    );
  }

  const activeCount = subscriptions.filter(s => s.status === 'active').length;
  const totalRevenue = subscriptions
    .filter(s => s.status === 'active')
    .reduce((sum, s) => {
      const price = getPlanPrice(s.stripePriceId);
      return sum + parseFloat(price.amount.replace('$', ''));
    }, 0);

  return (
    <div className="space-y-8">
      {/* Header mejorado */}
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          Subscriptions
        </h1>
        <p className="text-gray-600 mt-2">Manage and monitor all active subscriptions</p>
      </div>

      {/* Stats rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-gray-200">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                <CreditCard className="h-4 w-4 text-white" />
              </div>
              <CardTitle className="text-sm font-medium text-gray-600">Active</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{activeCount}</div>
            <p className="text-xs text-gray-500 mt-1">Currently paying</p>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <DollarSign className="h-4 w-4 text-white" />
              </div>
              <CardTitle className="text-sm font-medium text-gray-600">MRR</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">${totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-gray-500 mt-1">Monthly recurring</p>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                <Activity className="h-4 w-4 text-white" />
              </div>
              <CardTitle className="text-sm font-medium text-gray-600">Total</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{subscriptions.length}</div>
            <p className="text-xs text-gray-500 mt-1">All time</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabla principal */}
      <Card className="border-gray-200 shadow-md">
        <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
          <CardTitle>All Subscriptions</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {subscriptions.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Tenant</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Current Period</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {subscriptions.map((subscription) => {
                  const planInfo = getPlanPrice(subscription.stripePriceId);
                  return (
                    <TableRow key={subscription.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-semibold">
                            {subscription.user?.email?.[0]?.toUpperCase() || 'U'}
                          </div>
                          <div>
                            <div className="font-medium">{subscription.user?.email || 'N/A'}</div>
                            <div className="text-xs text-gray-500">ID: {subscription.userId.slice(0, 8)}...</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{subscription.tenant?.name || 'N/A'}</div>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(subscription.status)}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-semibold text-gray-900">
                            {planInfo.amount}<span className="text-xs text-gray-500">{planInfo.period}</span>
                          </span>
                          <span className="text-xs text-gray-500">{planInfo.plan}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div className="font-medium">
                            {format(new Date(subscription.currentPeriodStart), 'MMM d, yyyy')}
                          </div>
                          <div className="text-gray-500 text-xs">
                            to {format(new Date(subscription.currentPeriodEnd), 'MMM d, yyyy')}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {subscription.cancelAtPeriodEnd ? (
                          <Badge variant="danger" className="gap-1">
                            <AlertCircle className="h-3 w-3" />
                            Canceling
                          </Badge>
                        ) : (
                          <button className="text-xs font-medium text-blue-600 hover:text-blue-800 transition-colors">
                            Manage
                          </button>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          ) : (
            <div className="py-16 text-center">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 mb-4">
                <CreditCard className="h-8 w-8 text-gray-400" />
              </div>
              <p className="text-lg font-semibold text-gray-900">No subscriptions yet</p>
              <p className="text-sm text-gray-600 mt-1">Subscriptions will appear here when users subscribe</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
