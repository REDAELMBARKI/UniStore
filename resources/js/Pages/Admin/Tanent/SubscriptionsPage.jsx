import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './components';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components';
import { TopHeader } from './components';
import { PlanBadge } from './components';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import TenantAdminPanel from '@/Layouts/tanent/TenantAdminPanel';

// ─── Mock Data ────────────────────────────────────────────────────────────────

const PLAN_PRICES = { Free: 0, Starter: 29, Pro: 79, Enterprise: 199 };

const mockStores = [
  { id: 1,  name: 'Bloom Boutique',      plan: 'Pro' },
  { id: 2,  name: 'Tech Haven',          plan: 'Enterprise' },
  { id: 3,  name: 'Green Roots',         plan: 'Starter' },
  { id: 4,  name: 'Urban Threads',       plan: 'Free' },
  { id: 5,  name: 'Spark Electronics',   plan: 'Pro' },
  { id: 6,  name: 'Maple & Co.',         plan: 'Starter' },
  { id: 7,  name: 'The Daily Grind',     plan: 'Free' },
  { id: 8,  name: 'Nova Sports',         plan: 'Enterprise' },
  { id: 9,  name: 'Pixel Studio',        plan: 'Pro' },
  { id: 10, name: 'Sunset Décor',        plan: 'Free' },
  { id: 11, name: 'Frost & Flame',       plan: 'Starter' },
  { id: 12, name: 'Atlas Outdoors',      plan: 'Enterprise' },
];

const mockSubscriptions = [
  { id: 1,  storeName: 'Bloom Boutique',    plan: 'Pro',        billingCycle: 'Monthly',  nextRenewal: '2025-08-01', amount: 79,  status: 'Active' },
  { id: 2,  storeName: 'Tech Haven',        plan: 'Enterprise', billingCycle: 'Annual',   nextRenewal: '2026-01-15', amount: 199, status: 'Active' },
  { id: 3,  storeName: 'Green Roots',       plan: 'Starter',    billingCycle: 'Monthly',  nextRenewal: '2025-08-10', amount: 29,  status: 'Active' },
  { id: 4,  storeName: 'Urban Threads',     plan: 'Free',       billingCycle: '—',        nextRenewal: '—',          amount: 0,   status: 'Active' },
  { id: 5,  storeName: 'Spark Electronics', plan: 'Pro',        billingCycle: 'Annual',   nextRenewal: '2026-03-22', amount: 79,  status: 'Active' },
  { id: 6,  storeName: 'Maple & Co.',       plan: 'Starter',    billingCycle: 'Monthly',  nextRenewal: '2025-07-30', amount: 29,  status: 'Expired' },
  { id: 7,  storeName: 'The Daily Grind',   plan: 'Free',       billingCycle: '—',        nextRenewal: '—',          amount: 0,   status: 'Active' },
  { id: 8,  storeName: 'Nova Sports',       plan: 'Enterprise', billingCycle: 'Annual',   nextRenewal: '2025-11-05', amount: 199, status: 'Active' },
  { id: 9,  storeName: 'Pixel Studio',      plan: 'Pro',        billingCycle: 'Monthly',  nextRenewal: '2025-08-18', amount: 79,  status: 'Cancelled' },
  { id: 10, storeName: 'Sunset Décor',      plan: 'Free',       billingCycle: '—',        nextRenewal: '—',          amount: 0,   status: 'Active' },
  { id: 11, storeName: 'Frost & Flame',     plan: 'Starter',    billingCycle: 'Monthly',  nextRenewal: '2025-08-25', amount: 29,  status: 'Active' },
  { id: 12, storeName: 'Atlas Outdoors',    plan: 'Enterprise', billingCycle: 'Annual',   nextRenewal: '2026-06-01', amount: 199, status: 'Active' },
];

// ─── Constants ────────────────────────────────────────────────────────────────

const PLAN_COLORS = { Free: '#6b7280', Starter: '#3b82f6', Pro: '#7c3aed', Enterprise: '#ea580c' };
const PLANS       = ['All', 'Free', 'Starter', 'Pro', 'Enterprise'];
const STATUSES    = ['All', 'Active', 'Expired', 'Cancelled'];

const planCounts = ['Free', 'Starter', 'Pro', 'Enterprise'].map(plan => ({
  name:  plan,
  value: mockStores.filter(s => s.plan === plan).length,
  price: PLAN_PRICES[plan],
  color: PLAN_COLORS[plan],
}));

// ─── Component ────────────────────────────────────────────────────────────────

export default function SubscriptionsPage() {
  const [planFilter, setPlanFilter]     = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const filtered = useMemo(() => mockSubscriptions.filter(s =>
    (planFilter === 'All' || s.plan === planFilter) &&
    (statusFilter === 'All' || s.status === statusFilter)
  ), [planFilter, statusFilter]);

  return (
    <div className="flex flex-col h-full">
      <TopHeader title="Subscriptions & Plans" subtitle="Billing and subscription management" />
      <div className="flex-1 overflow-y-auto p-6 bg-background space-y-6">

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {planCounts.map(p => (
            <Card key={p.name} className="shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <PlanBadge plan={p.name} />
                  <span className="text-lg font-bold">{p.value}</span>
                </div>
                <p className="text-xs text-muted-foreground">{p.value} stores</p>
                <p className="text-sm font-semibold mt-1">{p.price === 0 ? 'Free' : `$${p.price}/mo`}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Card className="shadow-sm lg:col-span-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold">Plan Distribution</CardTitle>
              <p className="text-xs text-muted-foreground">Stores per subscription tier</p>
            </CardHeader>
            <CardContent className="p-5 pt-0">
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie data={planCounts} cx="50%" cy="50%" innerRadius={55} outerRadius={85} dataKey="value" paddingAngle={3}>
                    {planCounts.map(p => <Cell key={p.name} fill={p.color} />)}
                  </Pie>
                  <Tooltip formatter={(v, name) => [`${v} stores`, name]} contentStyle={{ fontSize: 12, borderRadius: 6, border: '1px solid var(--border)' }} />
                  <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="shadow-sm lg:col-span-2">
            <CardHeader className="flex-row items-center gap-3 pb-4 flex-wrap">
              <CardTitle className="text-sm font-semibold flex-1">All Subscriptions</CardTitle>
              <Select value={planFilter} onValueChange={setPlanFilter}>
                <SelectTrigger className="w-32 h-8 text-xs"><SelectValue /></SelectTrigger>
                <SelectContent>{PLANS.map(p => <SelectItem key={p} value={p}>{p === 'All' ? 'All Plans' : p}</SelectItem>)}</SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32 h-8 text-xs"><SelectValue /></SelectTrigger>
                <SelectContent>{STATUSES.map(s => <SelectItem key={s} value={s}>{s === 'All' ? 'All Statuses' : s}</SelectItem>)}</SelectContent>
              </Select>
            </CardHeader>
            <CardContent className="p-0 max-h-64 overflow-y-auto">
              <table className="w-full text-sm">
                <thead className="sticky top-0 bg-muted/60 backdrop-blur-sm">
                  <tr className="border-b border-border">
                    <th className="py-2 pl-4 pr-2 text-left text-xs font-medium text-muted-foreground">Store</th>
                    <th className="py-2 px-2 text-left text-xs font-medium text-muted-foreground">Plan</th>
                    <th className="py-2 px-2 text-left text-xs font-medium text-muted-foreground">Cycle</th>
                    <th className="py-2 px-2 text-left text-xs font-medium text-muted-foreground">Next Renewal</th>
                    <th className="py-2 px-2 text-left text-xs font-medium text-muted-foreground">Amount</th>
                    <th className="py-2 pl-2 pr-4 text-left text-xs font-medium text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((sub, i) => (
                    <tr key={sub.id} className={`hover:bg-muted/30 ${i < filtered.length - 1 ? 'border-b border-border' : ''}`}>
                      <td className="py-2.5 pl-4 pr-2 font-medium">{sub.storeName}</td>
                      <td className="py-2.5 px-2"><PlanBadge plan={sub.plan} /></td>
                      <td className="py-2.5 px-2 text-muted-foreground text-xs">{sub.billingCycle}</td>
                      <td className="py-2.5 px-2 text-muted-foreground text-xs">{sub.nextRenewal}</td>
                      <td className="py-2.5 px-2 font-semibold">{sub.amount === 0 ? '—' : `$${sub.amount}`}</td>
                      <td className="py-2.5 pl-2 pr-4">
                        <span className={`text-xs font-medium ${sub.status === 'Active' ? 'text-emerald-600' : sub.status === 'Expired' ? 'text-amber-600' : 'text-red-500'}`}>
                          {sub.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}

SubscriptionsPage.layout = page => <TenantAdminPanel>{page}</TenantAdminPanel>;