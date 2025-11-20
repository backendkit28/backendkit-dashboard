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
import { CreditCard, DollarSign } from 'lucide-react';

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

  function getStatusColor(status: string) {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'canceled':
        return 'bg-red-100 text-red-800';
      case 'past_due':
        return 'bg-yellow-100 text-yellow-800';
      case 'incomplete':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  function getPlanPrice(priceId: string) {
    if (priceId === process.env.NEXT_PUBLIC_STRIPE_PRICE_STARTER) {
      return '$9.99/mo';
    }
    if (priceId === process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO) {
      return '$29.99/mo';
    }
    return 'Unknown';
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Subscriptions</h1>
        <p className="text-gray-600">Active and past subscriptions</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Subscriptions ({subscriptions.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Tenant</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Current Period</TableHead>
                <TableHead>Cancel at Period End</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subscriptions.map((subscription) => (
                <TableRow key={subscription.id}>
                  <TableCell className="font-medium">
                    {subscription.user?.email || 'N/A'}
                  </TableCell>
                  <TableCell>
                    {subscription.tenant?.name || 'N/A'}
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(subscription.status)}>
                      {subscription.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-gray-400" />
                      {getPlanPrice(subscription.stripePriceId)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{format(new Date(subscription.currentPeriodStart), 'MMM d, yyyy')}</div>
                      <div className="text-gray-500">
                        to {format(new Date(subscription.currentPeriodEnd), 'MMM d, yyyy')}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {subscription.cancelAtPeriodEnd ? (
                      <Badge className="bg-red-100 text-red-800">
                        Yes
                      </Badge>
                    ) : (
                      <span className="text-gray-500">No</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {subscriptions.length === 0 && (
            <div className="py-8 text-center text-gray-500">
              <CreditCard className="mx-auto mb-2 h-12 w-12 text-gray-400" />
              <p>No subscriptions yet</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}