export const PLAN_PRICES = { Free: 0, Starter: 29, Pro: 79, Enterprise: 299 };

export const mockStores = [
  { id: 's1',  name: 'Maple Goods',       owner: 'Alice Johnson',  email: 'alice@maple.io',    plan: 'Pro',        status: 'Active',    mrr: 79,  country: 'US', createdAt: '2024-01-15', lastActive: '2026-03-18', totalOrders: 1240, totalRevenue: 98400,  activeProducts: 320,  avgOrderValue: 79 },
  { id: 's2',  name: 'BlueSky Store',     owner: 'Bob Lee',        email: 'bob@bluesky.io',    plan: 'Enterprise', status: 'Active',    mrr: 299, country: 'UK', createdAt: '2023-09-01', lastActive: '2026-03-19', totalOrders: 4510, totalRevenue: 312000, activeProducts: 850,  avgOrderValue: 69 },
  { id: 's3',  name: 'Neon Threads',      owner: 'Clara Smith',    email: 'clara@neon.io',     plan: 'Starter',    status: 'Active',    mrr: 29,  country: 'CA', createdAt: '2024-06-10', lastActive: '2026-03-17', totalOrders: 340,  totalRevenue: 18700,  activeProducts: 95,   avgOrderValue: 55 },
  { id: 's4',  name: 'Terra Home',        owner: 'David Park',     email: 'david@terra.io',    plan: 'Pro',        status: 'Suspended', mrr: 79,  country: 'AU', createdAt: '2024-03-22', lastActive: '2026-02-10', totalOrders: 780,  totalRevenue: 54200,  activeProducts: 210,  avgOrderValue: 69 },
  { id: 's5',  name: 'Orion Electronics', owner: 'Eva Martinez',   email: 'eva@orion.io',      plan: 'Enterprise', status: 'Active',    mrr: 299, country: 'DE', createdAt: '2023-05-17', lastActive: '2026-03-19', totalOrders: 6200, totalRevenue: 489000, activeProducts: 1100, avgOrderValue: 79 },
  { id: 's6',  name: 'Pine & Petal',      owner: 'Frank Wu',       email: 'frank@pine.io',     plan: 'Free',       status: 'Active',    mrr: 0,   country: 'US', createdAt: '2025-01-04', lastActive: '2026-03-15', totalOrders: 42,   totalRevenue: 1900,   activeProducts: 18,   avgOrderValue: 45 },
  { id: 's7',  name: 'Velvet Shelf',      owner: 'Grace Kim',      email: 'grace@velvet.io',   plan: 'Starter',    status: 'Churned',   mrr: 0,   country: 'KR', createdAt: '2024-07-29', lastActive: '2026-01-02', totalOrders: 220,  totalRevenue: 11200,  activeProducts: 0,    avgOrderValue: 51 },
  { id: 's8',  name: 'Cobalt Crafts',     owner: 'Henry Adams',    email: 'henry@cobalt.io',   plan: 'Pro',        status: 'Active',    mrr: 79,  country: 'FR', createdAt: '2024-02-14', lastActive: '2026-03-18', totalOrders: 950,  totalRevenue: 71000,  activeProducts: 280,  avgOrderValue: 75 },
  { id: 's9',  name: 'Spark Supply Co.',  owner: 'Iris Brown',     email: 'iris@spark.io',     plan: 'Enterprise', status: 'Active',    mrr: 299, country: 'US', createdAt: '2022-11-30', lastActive: '2026-03-19', totalOrders: 9800, totalRevenue: 720000, activeProducts: 1400, avgOrderValue: 73 },
  { id: 's10', name: 'Driftwood Market',  owner: 'Jake Chen',      email: 'jake@drift.io',     plan: 'Starter',    status: 'Active',    mrr: 29,  country: 'SG', createdAt: '2024-09-15', lastActive: '2026-03-16', totalOrders: 190,  totalRevenue: 9800,   activeProducts: 60,   avgOrderValue: 52 },
  { id: 's11', name: 'Zola Apparel',      owner: 'Karen Liu',      email: 'karen@zola.io',     plan: 'Pro',        status: 'Active',    mrr: 79,  country: 'US', createdAt: '2024-04-01', lastActive: '2026-03-17', totalOrders: 1100, totalRevenue: 85000,  activeProducts: 300,  avgOrderValue: 77 },
  { id: 's12', name: 'Ember & Oak',       owner: 'Leo Torres',     email: 'leo@ember.io',      plan: 'Free',       status: 'Suspended', mrr: 0,   country: 'MX', createdAt: '2025-03-01', lastActive: '2026-02-25', totalOrders: 15,   totalRevenue: 700,    activeProducts: 8,    avgOrderValue: 47 },
  { id: 's13', name: 'Arctic Wear',       owner: 'Mia Novak',      email: 'mia@arctic.io',     plan: 'Enterprise', status: 'Active',    mrr: 299, country: 'NO', createdAt: '2023-07-22', lastActive: '2026-03-19', totalOrders: 5400, totalRevenue: 390000, activeProducts: 920,  avgOrderValue: 72 },
  { id: 's14', name: 'Sunset Bazaar',     owner: 'Nathan Ford',    email: 'nathan@sunset.io',  plan: 'Starter',    status: 'Active',    mrr: 29,  country: 'IN', createdAt: '2024-11-08', lastActive: '2026-03-14', totalOrders: 270,  totalRevenue: 13400,  activeProducts: 80,   avgOrderValue: 50 },
  { id: 's15', name: 'Pixel Goods',       owner: 'Olivia Grant',   email: 'olivia@pixel.io',   plan: 'Pro',        status: 'Churned',   mrr: 0,   country: 'US', createdAt: '2023-12-01', lastActive: '2025-12-20', totalOrders: 680,  totalRevenue: 48000,  activeProducts: 0,    avgOrderValue: 71 },
  { id: 's16', name: 'Harbor House',      owner: 'Paul Stone',     email: 'paul@harbor.io',    plan: 'Starter',    status: 'Active',    mrr: 29,  country: 'NZ', createdAt: '2025-02-17', lastActive: '2026-03-12', totalOrders: 88,   totalRevenue: 4400,   activeProducts: 35,   avgOrderValue: 50 },
  { id: 's17', name: 'Lush Living',       owner: 'Quinn Davis',    email: 'quinn@lush.io',     plan: 'Pro',        status: 'Active',    mrr: 79,  country: 'US', createdAt: '2024-05-05', lastActive: '2026-03-18', totalOrders: 830,  totalRevenue: 63000,  activeProducts: 255,  avgOrderValue: 76 },
  { id: 's18', name: 'Crimson Cart',      owner: 'Rachel White',   email: 'rachel@crimson.io', plan: 'Enterprise', status: 'Active',    mrr: 299, country: 'BR', createdAt: '2023-03-14', lastActive: '2026-03-19', totalOrders: 7200, totalRevenue: 540000, activeProducts: 1050, avgOrderValue: 75 },
  { id: 's19', name: 'Sage & Cedar',      owner: 'Sam Rivera',     email: 'sam@sage.io',       plan: 'Free',       status: 'Active',    mrr: 0,   country: 'US', createdAt: '2025-01-22', lastActive: '2026-03-10', totalOrders: 30,   totalRevenue: 1400,   activeProducts: 12,   avgOrderValue: 47 },
  { id: 's20', name: 'Marble Lane',       owner: 'Tina Brooks',    email: 'tina@marble.io',    plan: 'Pro',        status: 'Active',    mrr: 79,  country: 'IT', createdAt: '2024-08-19', lastActive: '2026-03-17', totalOrders: 670,  totalRevenue: 51000,  activeProducts: 190,  avgOrderValue: 76 },
];

export const revenueByMonth = [
  { month: 'Oct', revenue: 48200, stores: 82 },
  { month: 'Nov', revenue: 53100, stores: 87 },
  { month: 'Dec', revenue: 61800, stores: 91 },
  { month: 'Jan', revenue: 58400, stores: 94 },
  { month: 'Feb', revenue: 67300, stores: 98 },
  { month: 'Mar', revenue: 74900, stores: 102 },
];

export const mockSubscriptions = mockStores.map((store, i) => ({
  id:           `sub-${store.id}`,
  storeId:      store.id,
  storeName:    store.name,
  plan:         store.plan,
  billingCycle: i % 3 === 0 ? 'Annual' : 'Monthly',
  nextRenewal:  store.status === 'Active'
    ? `2026-0${(i % 9) + 1}-${(i % 28) + 1}`.replace(/-(\d)-/, '-0$1-')
    : 'N/A',
  amount: store.mrr,
  status: store.status === 'Active' ? 'Active' : store.status === 'Churned' ? 'Cancelled' : 'Expired',
}));

export const mockOrdersByStore = mockStores.reduce((acc, store) => {
  acc[store.id] = Array.from({ length: 10 }, (_, i) => ({
    id:     `ORD-${store.id}-${1000 + i}`,
    date:   `2026-0${(i % 3) + 1}-${String((i * 3 + 1) % 28 + 1).padStart(2, '0')}`,
    amount: Math.round(store.avgOrderValue * (0.7 + Math.random() * 0.8)),
    status: i % 5 === 0 ? 'Refunded' : i % 4 === 0 ? 'Pending' : 'Completed',
  }));
  return acc;
}, {});

export const salesAnalytics = {
  daily: Array.from({ length: 14 }, (_, i) => ({
    label:   `Mar ${6 + i}`,
    revenue: 1200 + Math.round(Math.random() * 2800),
    orders:  18 + Math.round(Math.random() * 60),
  })),
  weekly: Array.from({ length: 12 }, (_, i) => ({
    label:   `W${i + 1}`,
    revenue: 8000 + Math.round(Math.random() * 14000),
    orders:  120 + Math.round(Math.random() * 300),
  })),
  monthly: revenueByMonth.map(r => ({
    label:   r.month,
    revenue: r.revenue,
    orders:  Math.round(r.revenue / 68),
  })),
};

export function getPlatformKPIs() {
  const totalStores          = mockStores.length;
  const activeSubscriptions  = mockStores.filter(s => s.status === 'Active').length;
  const monthlyRevenue       = mockStores.filter(s => s.status === 'Active').reduce((acc, s) => acc + s.mrr, 0);
  const churnedStores        = mockStores.filter(s => s.status === 'Churned').length;
  return { totalStores, activeSubscriptions, monthlyRevenue, churnedStores };
}