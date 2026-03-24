import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle ,TopHeader } from './components';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area,
} from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';
import TenantAdminPanel from '@/Layouts/tanent/TenantAdminPanel';

// ─── Mock Data ────────────────────────────────────────────────────────────────

const mockStores = [
  { id: 1,  name: 'Bloom Boutique',       totalRevenue: 84200,  totalOrders: 1040, avgOrderValue: 81  },
  { id: 2,  name: 'Tech Haven',           totalRevenue: 212500, totalOrders: 2380, avgOrderValue: 89  },
  { id: 3,  name: 'Green Roots',          totalRevenue: 47800,  totalOrders: 620,  avgOrderValue: 77  },
  { id: 4,  name: 'Urban Threads',        totalRevenue: 31200,  totalOrders: 490,  avgOrderValue: 64  },
  { id: 5,  name: 'Spark Electronics',    totalRevenue: 178900, totalOrders: 1870, avgOrderValue: 96  },
  { id: 6,  name: 'Maple & Co.',          totalRevenue: 56400,  totalOrders: 730,  avgOrderValue: 77  },
  { id: 7,  name: 'The Daily Grind',      totalRevenue: 23100,  totalOrders: 380,  avgOrderValue: 61  },
  { id: 8,  name: 'Nova Sports',          totalRevenue: 139600, totalOrders: 1550, avgOrderValue: 90  },
  { id: 9,  name: 'Pixel Studio',         totalRevenue: 95300,  totalOrders: 1120, avgOrderValue: 85  },
  { id: 10, name: 'Sunset Décor',         totalRevenue: 18700,  totalOrders: 290,  avgOrderValue: 64  },
  { id: 11, name: 'Frost & Flame',        totalRevenue: 62100,  totalOrders: 810,  avgOrderValue: 77  },
  { id: 12, name: 'Atlas Outdoors',       totalRevenue: 154800, totalOrders: 1690, avgOrderValue: 92  },
  { id: 13, name: 'Cedar & Stone',        totalRevenue: 44500,  totalOrders: 570,  avgOrderValue: 78  },
  { id: 14, name: 'Luxe Living',          totalRevenue: 201300, totalOrders: 2100, avgOrderValue: 96  },
  { id: 15, name: 'Bare Essentials',      totalRevenue: 29800,  totalOrders: 420,  avgOrderValue: 71  },
];

const salesAnalytics = {
  daily: [
    { label: 'Mon', revenue: 4200 },
    { label: 'Tue', revenue: 5800 },
    { label: 'Wed', revenue: 4900 },
    { label: 'Thu', revenue: 7100 },
    { label: 'Fri', revenue: 9300 },
    { label: 'Sat', revenue: 11200 },
    { label: 'Sun', revenue: 8400 },
  ],
  weekly: [
    { label: 'W1',  revenue: 38400 },
    { label: 'W2',  revenue: 42700 },
    { label: 'W3',  revenue: 51200 },
    { label: 'W4',  revenue: 47900 },
    { label: 'W5',  revenue: 55600 },
    { label: 'W6',  revenue: 61300 },
    { label: 'W7',  revenue: 58100 },
    { label: 'W8',  revenue: 67400 },
  ],
  monthly: [
    { label: 'Jan', revenue: 142000 },
    { label: 'Feb', revenue: 158000 },
    { label: 'Mar', revenue: 171000 },
    { label: 'Apr', revenue: 163000 },
    { label: 'May', revenue: 189000 },
    { label: 'Jun', revenue: 204000 },
    { label: 'Jul', revenue: 197000 },
    { label: 'Aug', revenue: 221000 },
    { label: 'Sep', revenue: 214000 },
    { label: 'Oct', revenue: 238000 },
    { label: 'Nov', revenue: 256000 },
    { label: 'Dec', revenue: 279000 },
  ],
};

// ─── Derived Data ─────────────────────────────────────────────────────────────

const ranges = ['Daily', 'Weekly', 'Monthly'];

const topStoresChart = [...mockStores]
  .sort((a, b) => b.totalRevenue - a.totalRevenue)
  .slice(0, 10)
  .map(s => ({
    name:    s.name.length > 14 ? s.name.slice(0, 13) + '…' : s.name,
    revenue: s.totalRevenue,
    orders:  s.totalOrders,
  }));

const summaryRows = [...mockStores]
  .sort((a, b) => b.totalRevenue - a.totalRevenue)
  .map((s, i) => ({ ...s, growth: (i % 3 === 0 ? -1 : 1) * (3 + (i * 7) % 28) }));

// ─── Component ────────────────────────────────────────────────────────────────

export default function AnalyticsPage() {
  const [range, setRange] = useState('Monthly');

  const chartData = useMemo(() => {
    if (range === 'Daily')  return salesAnalytics.daily;
    if (range === 'Weekly') return salesAnalytics.weekly;
    return salesAnalytics.monthly;
  }, [range]);

  return (
    <div className="flex flex-col h-full">
      <TopHeader title="Sales Analytics" subtitle="Platform-wide revenue and order insights" />
      <div className="flex-1 overflow-y-auto p-6 bg-background space-y-6">

        <div className="flex items-center gap-1 bg-muted rounded-lg p-1 w-fit">
          {ranges.map(r => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${range === r ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
            >
              {r}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold">Platform Revenue — {range}</CardTitle>
            </CardHeader>
            <CardContent className="p-5 pt-0">
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={chartData} margin={{ top: 5, right: 8, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor="#10b981" stopOpacity={0.18} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis dataKey="label" tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} />
                  <YAxis tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} width={48} />
                  <Tooltip formatter={v => [`$${Number(v).toLocaleString()}`, 'Revenue']} contentStyle={{ fontSize: 12, borderRadius: 6, border: '1px solid var(--border)', background: 'var(--card)' }} />
                  <Area type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} fill="url(#salesGrad)" dot={{ r: 3, fill: '#10b981' }} activeDot={{ r: 5 }} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold">Top 10 Stores by Revenue</CardTitle>
            </CardHeader>
            <CardContent className="p-5 pt-0">
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={topStoresChart} layout="vertical" margin={{ top: 0, right: 8, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
                  <XAxis type="number" tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} />
                  <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} width={90} />
                  <Tooltip formatter={v => [`$${Number(v).toLocaleString()}`, 'Revenue']} contentStyle={{ fontSize: 12, borderRadius: 6, border: '1px solid var(--border)', background: 'var(--card)' }} />
                  <Bar dataKey="revenue" fill="rgb(22,131,236)" radius={[0, 3, 3, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Store Performance Summary</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-y border-border bg-muted/40">
                    <th className="py-2.5 pl-5 pr-3 text-left text-xs font-medium text-muted-foreground">Store</th>
                    <th className="py-2.5 px-3 text-right text-xs font-medium text-muted-foreground">Units Sold</th>
                    <th className="py-2.5 px-3 text-right text-xs font-medium text-muted-foreground">Total Revenue</th>
                    <th className="py-2.5 px-3 text-right text-xs font-medium text-muted-foreground">AOV</th>
                    <th className="py-2.5 pl-3 pr-5 text-right text-xs font-medium text-muted-foreground">Growth</th>
                  </tr>
                </thead>
                <tbody>
                  {summaryRows.map((s, i) => (
                    <tr key={s.id} className={`hover:bg-muted/30 ${i < summaryRows.length - 1 ? 'border-b border-border' : ''}`}>
                      <td className="py-3 pl-5 pr-3 font-medium">{s.name}</td>
                      <td className="py-3 px-3 text-right text-muted-foreground">{s.totalOrders.toLocaleString()}</td>
                      <td className="py-3 px-3 text-right font-semibold">${s.totalRevenue.toLocaleString()}</td>
                      <td className="py-3 px-3 text-right text-muted-foreground">${s.avgOrderValue}</td>
                      <td className="py-3 pl-3 pr-5 text-right">
                        <span className={`inline-flex items-center gap-1 text-xs font-semibold ${s.growth >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                          {s.growth >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                          {s.growth >= 0 ? '+' : ''}{s.growth}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}

AnalyticsPage.layout = page => <TenantAdminPanel>{page}</TenantAdminPanel>;