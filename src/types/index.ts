export interface Tenant {
  id: string;
  name: string;
  apiKey: string;
  plan: string;
  stripeCustomerId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  tenantId: string;
  email: string;
  emailVerified: boolean;
  oauthProvider?: string;
  createdAt: string;
  tenant?: Tenant;
}

export interface Subscription {
  id: string;
  tenantId: string;
  userId: string;
  stripeSubscriptionId: string;
  stripePriceId: string;
  status: string;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
  createdAt: string;
  tenant?: Tenant;
  user?: User;
}

export interface Metrics {
  totalTenants: number;
  totalUsers: number;
  activeSubscriptions: number;
  mrr: number;
  newUsersLast30Days: number;
  churnRate: number;
  revenueByPlan: {
    starter: number;
    pro: number;
  };
  userGrowth: Array<{
    date: string;
    count: number;
  }>;
}