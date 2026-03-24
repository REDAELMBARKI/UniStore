import { useState, useMemo } from 'react';
import { router } from '@inertiajs/react';
import { Card, CardContent, CardHeader } from './components';
import { Button } from './components';
import { Input } from './components';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './components';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components';
import { TopHeader } from './components';
import { StatusBadge } from './components';
import { PlanBadge } from './components';
import { Search, X, ExternalLink, Pencil } from 'lucide-react';
import TenantAdminPanel from '@/Layouts/tanent/TenantAdminPanel';

// ─── Mock Data ────────────────────────────────────────────────────────────────

const mockStores = [
  { id: 1,  name: 'Bloom & Co',         owner: 'Sarah Mitchell',   email: 'sarah@bloomco.com',        plan: 'Pro',        status: 'Active',    mrr: 149, country: 'US', createdAt: '2023-03-12', lastActive: '2024-12-01' },
  { id: 2,  name: 'The Spice Vault',     owner: 'Raj Patel',        email: 'raj@spicevault.io',        plan: 'Starter',    status: 'Active',    mrr: 49,  country: 'IN', createdAt: '2023-06-20', lastActive: '2024-11-28' },
  { id: 3,  name: 'Nordic Goods',        owner: 'Lena Eriksson',    email: 'lena@nordicgoods.se',      plan: 'Enterprise', status: 'Active',    mrr: 499, country: 'SE', createdAt: '2022-11-05', lastActive: '2024-12-02' },
  { id: 4,  name: 'Pixel Prints',        owner: 'Marcus Webb',      email: 'marcus@pixelprints.co',    plan: 'Free',       status: 'Active',    mrr: 0,   country: 'UK', createdAt: '2024-01-14', lastActive: '2024-11-15' },
  { id: 5,  name: 'Olive & Vine',        owner: 'Camille Dupont',   email: 'c.dupont@olivevine.fr',    plan: 'Pro',        status: 'Suspended', mrr: 0,   country: 'FR', createdAt: '2023-08-30', lastActive: '2024-10-10' },
  { id: 6,  name: 'Craft Cave',          owner: 'Dylan Torres',     email: 'dylan@craftcave.com',      plan: 'Starter',    status: 'Active',    mrr: 49,  country: 'MX', createdAt: '2024-02-19', lastActive: '2024-12-01' },
  { id: 7,  name: 'Amber Market',        owner: 'Priya Nair',       email: 'priya@ambermarket.in',     plan: 'Pro',        status: 'Active',    mrr: 149, country: 'IN', createdAt: '2023-05-11', lastActive: '2024-11-30' },
  { id: 8,  name: 'Stone & Thread',      owner: 'Jake Harmon',      email: 'jake@stonethread.com',     plan: 'Enterprise', status: 'Churned',   mrr: 0,   country: 'AU', createdAt: '2022-07-22', lastActive: '2024-08-14' },
  { id: 9,  name: 'Mango Street Store',  owner: 'Aiko Tanaka',      email: 'aiko@mangostreet.jp',      plan: 'Free',       status: 'Active',    mrr: 0,   country: 'JP', createdAt: '2024-04-03', lastActive: '2024-11-25' },
  { id: 10, name: 'Velvet & Oak',        owner: 'Charlotte James',  email: 'charlotte@velvetoak.co.uk',plan: 'Starter',    status: 'Active',    mrr: 49,  country: 'UK', createdAt: '2023-09-17', lastActive: '2024-12-02' },
  { id: 11, name: 'Desert Bloom',        owner: 'Omar Al-Farsi',    email: 'omar@desertbloom.ae',      plan: 'Pro',        status: 'Active',    mrr: 149, country: 'AE', createdAt: '2023-12-01', lastActive: '2024-11-29' },
  { id: 12, name: 'Kindred Supply',      owner: 'Nina Russo',       email: 'nina@kindredsupply.it',    plan: 'Free',       status: 'Suspended', mrr: 0,   country: 'IT', createdAt: '2024-05-08', lastActive: '2024-09-30' },
];

const mockOrdersByStore = {
  1:  [
    { id: '#1001', date: '2024-11-28', amount: '320.00', status: 'Completed' },
    { id: '#1002', date: '2024-11-25', amount: '85.50',  status: 'Completed' },
    { id: '#1003', date: '2024-11-20', amount: '210.00', status: 'Pending'   },
    { id: '#1004', date: '2024-11-18', amount: '47.00',  status: 'Completed' },
    { id: '#1005', date: '2024-11-10', amount: '130.75', status: 'Refunded'  },
  ],
  2:  [
    { id: '#2001', date: '2024-11-27', amount: '58.00',  status: 'Completed' },
    { id: '#2002', date: '2024-11-21', amount: '94.00',  status: 'Completed' },
    { id: '#2003', date: '2024-11-15', amount: '22.50',  status: 'Pending'   },
  ],
  3:  [
    { id: '#3001', date: '2024-12-01', amount: '1200.00', status: 'Completed' },
    { id: '#3002', date: '2024-11-29', amount: '450.00',  status: 'Completed' },
    { id: '#3003', date: '2024-11-26', amount: '890.00',  status: 'Completed' },
    { id: '#3004', date: '2024-11-20', amount: '310.00',  status: 'Pending'   },
    { id: '#3005', date: '2024-11-15', amount: '740.00',  status: 'Completed' },
  ],
  4:  [
    { id: '#4001', date: '2024-11-10', amount: '29.99', status: 'Completed' },
    { id: '#4002', date: '2024-10-30', amount: '14.50', status: 'Refunded'  },
  ],
  5:  [
    { id: '#5001', date: '2024-09-15', amount: '205.00', status: 'Completed' },
    { id: '#5002', date: '2024-09-01', amount: '98.00',  status: 'Refunded'  },
  ],
  6:  [
    { id: '#6001', date: '2024-11-30', amount: '67.00', status: 'Completed' },
    { id: '#6002', date: '2024-11-22', amount: '43.00', status: 'Pending'   },
    { id: '#6003', date: '2024-11-14', amount: '88.50', status: 'Completed' },
  ],
  7:  [
    { id: '#7001', date: '2024-11-29', amount: '175.00', status: 'Completed' },
    { id: '#7002', date: '2024-11-24', amount: '60.00',  status: 'Completed' },
    { id: '#7003', date: '2024-11-18', amount: '230.00', status: 'Pending'   },
    { id: '#7004', date: '2024-11-12', amount: '95.00',  status: 'Completed' },
  ],
  8:  [
    { id: '#8001', date: '2024-08-10', amount: '540.00', status: 'Completed' },
    { id: '#8002', date: '2024-07-28', amount: '310.00', status: 'Refunded'  },
  ],
  9:  [
    { id: '#9001', date: '2024-11-20', amount: '33.00', status: 'Completed' },
    { id: '#9002', date: '2024-11-05', amount: '18.50', status: 'Completed' },
  ],
  10: [
    { id: '#10001', date: '2024-12-01', amount: '112.00', status: 'Completed' },
    { id: '#10002', date: '2024-11-27', amount: '75.50',  status: 'Pending'   },
    { id: '#10003', date: '2024-11-20', amount: '48.00',  status: 'Completed' },
  ],
  11: [
    { id: '#11001', date: '2024-11-28', amount: '290.00', status: 'Completed' },
    { id: '#11002', date: '2024-11-22', amount: '145.00', status: 'Completed' },
    { id: '#11003', date: '2024-11-16', amount: '380.00', status: 'Pending'   },
  ],
  12: [
    { id: '#12001', date: '2024-09-25', amount: '55.00', status: 'Completed' },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────

const PLANS    = ['All', 'Free', 'Starter', 'Pro', 'Enterprise'];
const STATUSES = ['All', 'Active', 'Suspended', 'Churned'];

export default function StoresPage() {
  const [stores, setStores]             = useState(mockStores);
  const [search, setSearch]             = useState('');
  const [planFilter, setPlanFilter]     = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [drawerStore, setDrawerStore]   = useState(null);
  const [editStore, setEditStore]       = useState(null);
  const [editPlan, setEditPlan]         = useState('');
  const [editStatus, setEditStatus]     = useState('');

  const filtered = useMemo(() => stores.filter(s => {
    const matchSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.owner.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase());
    return matchSearch &&
      (planFilter   === 'All' || s.plan   === planFilter) &&
      (statusFilter === 'All' || s.status === statusFilter);
  }), [stores, search, planFilter, statusFilter]);

  function openEdit(store) {
    setEditStore(store);
    setEditPlan(store.plan);
    setEditStatus(store.status);
  }

  function saveEdit() {
    setStores(prev => prev.map(s =>
      s.id === editStore.id
        ? { ...s, plan: editPlan, status: editStatus, mrr: editStatus !== 'Active' ? 0 : s.mrr }
        : s
    ));
    if (drawerStore?.id === editStore.id)
      setDrawerStore(prev => ({ ...prev, plan: editPlan, status: editStatus }));
    setEditStore(null);
  }

  const orders = drawerStore ? (mockOrdersByStore[drawerStore.id] || []).slice(0, 5) : [];

  return (
    <div className="flex flex-col h-full">
      <TopHeader title="Stores" subtitle={`${stores.length} registered tenants`} />
      <div className="flex-1 overflow-y-auto p-6 bg-background">
        <Card className="shadow-sm">
          <CardHeader className="flex-row items-center gap-3 pb-4 flex-wrap">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search by name, owner or email…" className="pl-8 h-9" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <Select value={planFilter} onValueChange={setPlanFilter}>
              <SelectTrigger className="w-36 h-9"><SelectValue /></SelectTrigger>
              <SelectContent>{PLANS.map(p => <SelectItem key={p} value={p}>{p === 'All' ? 'All Plans' : p}</SelectItem>)}</SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-36 h-9"><SelectValue /></SelectTrigger>
              <SelectContent>{STATUSES.map(s => <SelectItem key={s} value={s}>{s === 'All' ? 'All Statuses' : s}</SelectItem>)}</SelectContent>
            </Select>
            <span className="text-xs text-muted-foreground">{filtered.length} results</span>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-y border-border bg-muted/40">
                    <th className="py-2.5 pl-5 pr-3 text-left text-xs font-medium text-muted-foreground">Store</th>
                    <th className="py-2.5 px-3 text-left text-xs font-medium text-muted-foreground">Owner</th>
                    <th className="py-2.5 px-3 text-left text-xs font-medium text-muted-foreground">Plan</th>
                    <th className="py-2.5 px-3 text-left text-xs font-medium text-muted-foreground">Status</th>
                    <th className="py-2.5 px-3 text-left text-xs font-medium text-muted-foreground">MRR</th>
                    <th className="py-2.5 px-3 text-left text-xs font-medium text-muted-foreground">Country</th>
                    <th className="py-2.5 px-3 text-left text-xs font-medium text-muted-foreground">Created</th>
                    <th className="py-2.5 pl-3 pr-5 text-left text-xs font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((store, i) => (
                    <tr key={store.id} className={`hover:bg-muted/30 transition-colors ${i < filtered.length - 1 ? 'border-b border-border' : ''}`}>
                      <td className="py-3 pl-5 pr-3">
                        <button className="text-left hover:text-primary" onClick={() => setDrawerStore(store)}>
                          <div className="font-medium text-foreground">{store.name}</div>
                          <div className="text-xs text-muted-foreground">{store.email}</div>
                        </button>
                      </td>
                      <td className="py-3 px-3 text-muted-foreground">{store.owner}</td>
                      <td className="py-3 px-3"><PlanBadge plan={store.plan} /></td>
                      <td className="py-3 px-3"><StatusBadge status={store.status} /></td>
                      <td className="py-3 px-3 font-semibold">{store.mrr === 0 ? '—' : `$${store.mrr}`}</td>
                      <td className="py-3 px-3 text-muted-foreground">{store.country}</td>
                      <td className="py-3 px-3 text-muted-foreground">{store.createdAt}</td>
                      <td className="py-3 pl-3 pr-5">
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => router.visit(`/admin/stores/${store.id}`)}>
                            <ExternalLink className="h-3.5 w-3.5" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => openEdit(store)}>
                            <Pencil className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr><td colSpan={8} className="py-12 text-center text-muted-foreground text-sm">No stores match your filters.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detail Drawer */}
      {drawerStore && (
        <div className="fixed inset-0 z-40 flex">
          <div className="flex-1 bg-black/40" onClick={() => setDrawerStore(null)} />
          <div className="w-96 bg-background border-l border-border flex flex-col h-full overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between p-5 border-b border-border">
              <h2 className="font-semibold text-base">{drawerStore.name}</h2>
              <button onClick={() => setDrawerStore(null)} className="text-muted-foreground hover:text-foreground">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="p-5 space-y-5 flex-1">
              <div className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Store Info</p>
                <div className="grid grid-cols-2 gap-y-2 text-sm">
                  <span className="text-muted-foreground">Owner</span><span className="font-medium">{drawerStore.owner}</span>
                  <span className="text-muted-foreground">Email</span><span className="font-medium text-primary">{drawerStore.email}</span>
                  <span className="text-muted-foreground">Country</span><span>{drawerStore.country}</span>
                  <span className="text-muted-foreground">Created</span><span>{drawerStore.createdAt}</span>
                  <span className="text-muted-foreground">Last Active</span><span>{drawerStore.lastActive}</span>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Subscription</p>
                <div className="flex items-center gap-2 flex-wrap">
                  <PlanBadge plan={drawerStore.plan} />
                  <StatusBadge status={drawerStore.status} />
                  <span className="text-sm font-semibold">{drawerStore.mrr === 0 ? 'Free' : `$${drawerStore.mrr}/mo`}</span>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Recent Orders</p>
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="pb-1.5 text-left font-medium text-muted-foreground">Order ID</th>
                      <th className="pb-1.5 text-left font-medium text-muted-foreground">Date</th>
                      <th className="pb-1.5 text-left font-medium text-muted-foreground">Amount</th>
                      <th className="pb-1.5 text-left font-medium text-muted-foreground">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(o => (
                      <tr key={o.id} className="border-b border-border last:border-0">
                        <td className="py-1.5 font-mono text-muted-foreground">{o.id}</td>
                        <td className="py-1.5 text-muted-foreground">{o.date}</td>
                        <td className="py-1.5 font-semibold">${o.amount}</td>
                        <td className="py-1.5">
                          <span className={`font-medium ${o.status === 'Completed' ? 'text-emerald-600' : o.status === 'Pending' ? 'text-amber-600' : 'text-red-500'}`}>
                            {o.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="p-5 border-t border-border flex gap-2">
              <Button className="flex-1" variant="outline" onClick={() => openEdit(drawerStore)}>Edit Store</Button>
              <Button className="flex-1" onClick={() => router.visit(`/admin/stores/${drawerStore.id}`)}>View Detail</Button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={!!editStore} onOpenChange={open => !open && setEditStore(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Store — {editStore?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Subscription Plan</label>
              <Select value={editPlan} onValueChange={setEditPlan}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {['Free', 'Starter', 'Pro', 'Enterprise'].map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Status</label>
              <Select value={editStatus} onValueChange={setEditStatus}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {['Active', 'Suspended', 'Churned'].map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditStore(null)}>Cancel</Button>
            <Button onClick={saveEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

StoresPage.layout = page => <TenantAdminPanel>{page}</TenantAdminPanel>;