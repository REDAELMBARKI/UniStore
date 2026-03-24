import { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TopHeader } from '@/app/components/TopHeader';
import { StatusBadge } from '@/app/components/StatusBadge';
import { PlanBadge } from '@/app/components/PlanBadge';
import { mockStores, mockOrdersByStore } from '@/app/data/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowLeft, ShoppingCart, DollarSign, Package, TrendingUp } from 'lucide-react';
import TenantAdminPanel from './TenantAdminPanel';

function MiniKpi({ label, value, icon: Icon, color }) {
  return (
    <Card className="shadow-sm">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground mb-0.5">{label}</p>
            <p className="text-xl font-bold">{value}</p>
          </div>
          <div className={`h-9 w-9 rounded-lg flex items-center justify-center ${color}`}>
            <Icon className="h-4 w-4 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function TenantDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const store  = useMemo(() => mockStores.find(s => s.id === id), [id]);
  const orders = useMemo(() => mockOrdersByStore[id] || [], [id]);

  const revenueChart = useMemo(() => [
    { month: 'Oct', revenue: Math.round((store?.totalRevenue ?? 0) * 0.12) },
    { month: 'Nov', revenue: Math.round((store?.totalRevenue ?? 0) * 0.14) },
    { month: 'Dec', revenue: Math.round((store?.totalRevenue ?? 0) * 0.18) },
    { month: 'Jan', revenue: Math.round((store?.totalRevenue ?? 0) * 0.16) },
    { month: 'Feb', revenue: Math.round((store?.totalRevenue ?? 0) * 0.19) },
    { month: 'Mar', revenue: Math.round((store?.totalRevenue ?? 0) * 0.21) },
  ], [store]);

  if (!store) {
    return (
      <div className="flex flex-col h-full">
        <TopHeader title="Store Not Found" />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-muted-foreground mb-4">No store found with this ID.</p>
            <Button onClick={() => navigate('/stores')}>Back to Stores</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <TopHeader title={store.name} subtitle={`Tenant ID: ${store.id} · ${store.country}`} />
      <div className="flex-1 overflow-y-auto p-6 bg-background space-y-6">

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="gap-1.5" onClick={() => navigate('/stores')}>
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>
        </div>

        <Card className="shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-start gap-5 flex-wrap">
              <div className="h-14 w-14 rounded-xl bg-primary flex items-center justify-center text-2xl font-bold text-primary-foreground flex-shrink-0">
                {store.name[0]}
              </div>
              <div className="flex-1 min-w-[200px]">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <h2 className="text-lg font-bold">{store.name}</h2>
                  <PlanBadge plan={store.plan} />
                  <StatusBadge status={store.status} />
                </div>
                <p className="text-sm text-muted-foreground">{store.owner} · {store.email}</p>
                <div className="flex gap-4 mt-2 text-xs text-muted-foreground flex-wrap">
                  <span>Country: <strong className="text-foreground">{store.country}</strong></span>
                  <span>Created: <strong className="text-foreground">{store.createdAt}</strong></span>
                  <span>Last Active: <strong className="text-foreground">{store.lastActive}</strong></span>
                  <span>MRR: <strong className="text-foreground">{store.mrr === 0 ? 'Free' : `$${store.mrr}/mo`}</strong></span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <MiniKpi label="Total Orders"    value={store.totalOrders.toLocaleString()}             icon={ShoppingCart} color="bg-blue-500" />
          <MiniKpi label="Total Revenue"   value={`$${(store.totalRevenue / 1000).toFixed(1)}k`}  icon={DollarSign}   color="bg-emerald-500" />
          <MiniKpi label="Active Products" value={store.activeProducts.toLocaleString()}           icon={Package}      color="bg-violet-500" />
          <MiniKpi label="Avg Order Value" value={`$${store.avgOrderValue}`}                       icon={TrendingUp}   color="bg-orange-500" />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold">Revenue (Last 6 Months)</CardTitle>
            </CardHeader>
            <CardContent className="p-5 pt-0">
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={revenueChart} margin={{ top: 5, right: 8, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} />
                  <YAxis tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} width={48} />
                  <Tooltip formatter={v => [`$${Number(v).toLocaleString()}`, 'Revenue']} contentStyle={{ fontSize: 12, borderRadius: 6, border: '1px solid var(--border)', background: 'var(--card)' }} />
                  <Bar dataKey="revenue" fill="rgb(22,131,236)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold">Recent Orders</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/40">
                    <th className="py-2 pl-4 pr-2 text-left text-xs font-medium text-muted-foreground">Order ID</th>
                    <th className="py-2 px-2 text-left text-xs font-medium text-muted-foreground">Date</th>
                    <th className="py-2 px-2 text-left text-xs font-medium text-muted-foreground">Amount</th>
                    <th className="py-2 pl-2 pr-4 text-left text-xs font-medium text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o, i) => (
                    <tr key={o.id} className={`hover:bg-muted/30 ${i < orders.length - 1 ? 'border-b border-border' : ''}`}>
                      <td className="py-2.5 pl-4 pr-2 font-mono text-xs text-muted-foreground">{o.id}</td>
                      <td className="py-2.5 px-2 text-muted-foreground text-xs">{o.date}</td>
                      <td className="py-2.5 px-2 font-semibold">${o.amount}</td>
                      <td className="py-2.5 pl-2 pr-4">
                        <span className={`text-xs font-medium ${o.status === 'Completed' ? 'text-emerald-600' : o.status === 'Pending' ? 'text-amber-600' : 'text-red-500'}`}>
                          {o.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>zB    BBSD .,    NM,VV,, ,,,  
          </Card>
        </div>

      </div>
    </div>
  );
}

TenantDetailPage.layout = page => <TenantAdminPanel>{page}</TenantAdminPanel>;