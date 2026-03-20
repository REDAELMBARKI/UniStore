import { useMemo } from 'react';
import { router } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle, TopHeader, StatusBadge, PlanBadge } from './components';
import { mockStores, revenueByMonth, getPlatformKPIs } from '../../../data/mockData';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Store, CreditCard, DollarSign, TrendingDown, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import TenantAdminPanel from '@/Layouts/tanent/TenantAdminPanel';

const fmt = (n) => n >= 1000 ? `$${(n / 1000).toFixed(1)}k` : `$${n}`;

function KpiCard({ label, value, sub, icon: Icon, trend, color }) {
  return (
    <Card className="shadow-sm">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-1">{label}</p>
            <p className="text-2xl font-bold text-foreground tracking-tight">{value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{sub}</p>
          </div>
          <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${color}`}>
            <Icon className="h-5 w-5 text-white" />
          </div>
        </div>
        {trend && (
          <div className={`mt-3 flex items-center gap-1 text-xs font-medium ${trend === 'up' ? 'text-emerald-600' : 'text-red-500'}`}>
            {trend === 'up' ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
            {trend === 'up' ? '+8.2% from last month' : '+1 more this month'}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function OverviewPage() {
  const kpis      = useMemo(() => getPlatformKPIs(), []);
  const topStores = useMemo(() => [...mockStores].sort((a, b) => b.mrr - a.mrr).slice(0, 5), []);

  return (
    <div className="flex flex-col h-full">
      <TopHeader title="Platform Overview" subtitle="All tenants · Real-time dashboard" />
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-background">

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <KpiCard label="Total Stores"         value={kpis.totalStores.toString()}                sub="Registered tenants"              icon={Store}        trend="up"   color="bg-blue-500" />
          <KpiCard label="Active Subscriptions" value={kpis.activeSubscriptions.toString()}        sub={`${kpis.totalStores - kpis.activeSubscriptions} inactive`} icon={CreditCard} trend="up" color="bg-emerald-500" />
          <KpiCard label="Monthly Revenue"      value={`$${kpis.monthlyRevenue.toLocaleString()}`} sub="MRR across active tenants"       icon={DollarSign}   trend="up"   color="bg-violet-500" />
          <KpiCard label="Churned Stores"       value={kpis.churnedStores.toString()}              sub="Cancelled subscriptions"         icon={TrendingDown} trend="down" color="bg-red-500" />
        </div>

        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-sm font-semibold">Platform Revenue Trend</CardTitle>
                <p className="text-xs text-muted-foreground mt-0.5">Monthly recurring revenue — last 6 months</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-foreground">${revenueByMonth[revenueByMonth.length - 1].revenue.toLocaleString()}</p>
                <p className="text-xs text-emerald-600 font-medium">▲ MRR this month</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-5 pt-0">
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={revenueByMonth} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="rgb(22,131,236)" stopOpacity={0.18} />
                    <stop offset="95%" stopColor="rgb(22,131,236)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} />
                <YAxis tickFormatter={fmt} tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} width={52} />
                <Tooltip formatter={v => [`$${Number(v).toLocaleString()}`, 'Revenue']} contentStyle={{ fontSize: 12, borderRadius: 6, border: '1px solid var(--border)', background: 'var(--card)' }} />
                <Area type="monotone" dataKey="revenue" stroke="rgb(22,131,236)" strokeWidth={2} fill="url(#revGrad)" dot={{ r: 3, fill: 'rgb(22,131,236)' }} activeDot={{ r: 5 }} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-sm font-semibold">Top Stores by MRR</CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">Highest paying active tenants</p>
            </div>
            <Link href="/admin/stores" className="text-xs text-primary font-medium hover:underline">
              View all →
            </Link>
          </CardHeader>
          <CardContent className="p-0">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="py-2.5 pl-5 pr-3 text-left text-xs font-medium text-muted-foreground">Store</th>
                  <th className="py-2.5 px-3 text-left text-xs font-medium text-muted-foreground">Plan</th>
                  <th className="py-2.5 px-3 text-left text-xs font-medium text-muted-foreground">Status</th>
                  <th className="py-2.5 px-3 text-left text-xs font-medium text-muted-foreground">MRR</th>
                  <th className="py-2.5 pl-3 pr-5 text-left text-xs font-medium text-muted-foreground">Last Active</th>
                </tr>
              </thead>
              <tbody>
                {topStores.map((store, i) => (
                  <tr
                    key={store.id}
                    className={`cursor-pointer hover:bg-muted/40 transition-colors ${i < topStores.length - 1 ? 'border-b border-border' : ''}`}
                    onClick={() => router.visit(`/admin/stores/${store.id}`)}
                  >
                    <td className="py-3 pl-5 pr-3">
                      <div className="font-medium text-foreground">{store.name}</div>
                      <div className="text-xs text-muted-foreground">{store.owner}</div>
                    </td>
                    <td className="py-3 px-3"><PlanBadge plan={store.plan} /></td>
                    <td className="py-3 px-3"><StatusBadge status={store.status} /></td>
                    <td className="py-3 px-3 font-semibold text-foreground">{store.mrr === 0 ? '—' : `$${store.mrr}`}</td>
                    <td className="py-3 pl-3 pr-5 text-muted-foreground">{store.lastActive}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}

OverviewPage.layout = page => <TenantAdminPanel>{page}</TenantAdminPanel>;