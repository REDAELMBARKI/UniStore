import { Link, usePage } from '@inertiajs/react';
import { LayoutDashboard, Store, CreditCard, BarChart3, ChevronRight } from 'lucide-react';

const navItems = [
  { href: '/tanent/overview',               label: 'Overview',        icon: LayoutDashboard },
  { href: '/tanent/stores',        label: 'Stores',          icon: Store },
  { href: '/tanent/subscriptions', label: 'Subscriptions',   icon: CreditCard },
  { href: '/tanent/analytics',     label: 'Sales Analytics', icon: BarChart3 },
];

const theme = {
  sidebar:         '#f5f7ee',
  sidebarBorder:   '#d6dfc0',
  sidebarFg:       '#3a4a1e',
  sidebarAccent:   '#ddeaa0',
  sidebarAccentFg: '#2d3d12',
  primary:         '#7aab00',
  primaryFg:       '#ffffff',
  muted:           '#7a8a5a',
  bg:              '#fafcf5',
};

function Sidebar() {
  const { url } = usePage();

  const isActive = (href) => {
    if (href === '/admin') return url === '/admin' || url === '/admin/';
    return url.startsWith(href);
  };

  return (
    <aside
      className="flex h-full w-60 flex-col"
      style={{ background: theme.sidebar, borderRight: `1px solid ${theme.sidebarBorder}` }}
    >
      {/* Brand */}
      <div
        className="flex items-center gap-2 px-5"
        style={{ borderBottom: `1px solid ${theme.sidebarBorder}`, height: '56px', minHeight: '56px' }}
      >
        <div
          className="flex h-7 w-7 items-center justify-center rounded-md flex-shrink-0"
          style={{ background: theme.primary }}
        >
          <Store className="h-4 w-4" style={{ color: theme.primaryFg }} />
        </div>
        <span className="text-sm font-semibold tracking-tight" style={{ color: theme.sidebarFg }}>
          TenantHub
        </span>
      </div>

      {/* Nav links */}
      <nav className="flex flex-col gap-1 p-3" style={{ flex: '0 0 auto' }}>
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = isActive(href);
          return (
            <Link
              key={href}
              href={href}
              className="group flex items-center justify-between rounded-md px-3 text-sm font-medium transition-colors"
              style={{
                background: active ? theme.sidebarAccent : 'transparent',
                color:      active ? theme.sidebarAccentFg : theme.sidebarFg,
                height: '36px',
                minHeight: '36px',
                maxHeight: '36px',
                flexShrink: 0,
              }}
            >
              <span className="flex items-center gap-2.5">
                <Icon className="h-4 w-4" style={{ color: active ? theme.primary : theme.muted }} />
                {label}
              </span>
              {active && (
                <ChevronRight className="h-3 w-3" style={{ color: theme.primary }} />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Footer */}
      <div className="p-3" style={{ borderTop: `1px solid ${theme.sidebarBorder}` }}>
        <p className="px-3 text-xs" style={{ color: theme.muted }}>Platform v2.0 · Admin</p>
      </div>
    </aside>
  );
}

export default function TenantAdminPanel({ children }) {
  return (
    <div className="flex h-screen w-screen overflow-hidden" style={{ background: theme.bg }}>
      <Sidebar />
      <main className="flex flex-1 flex-col overflow-hidden">
        {children}
      </main>
    </div>
  );
}