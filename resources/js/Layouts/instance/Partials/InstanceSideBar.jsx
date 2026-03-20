import { useSelector } from 'react-redux';
import { Link, usePage } from '@inertiajs/react';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { route } from 'ziggy-js';
import { navigationLinks } from '../navigationLinks';

export function InstanceSideBar({ collapsed, setCollapsed }) {
  const [expandedItem, setExpandedItem] = useState('Dashboard');
  const { url } = usePage();
  const { colors } = useSelector((state) => state.theme);
  const toggleExpanded = (itemTitle) => {
    if (collapsed) {
      setCollapsed(false);
      setExpandedItem(itemTitle);
      return;
    }
    setExpandedItem((prev) => (prev === itemTitle ? null : itemTitle));
  };

  // ── shared button hover helpers ──
  const btnEnter = (e) => {
    e.currentTarget.style.backgroundColor = colors.sidebarHover;
    e.currentTarget.style.color = colors.sidebarFg;
  };
  const btnLeave = (e, isActive) => {
    if (!isActive) {
      e.currentTarget.style.backgroundColor = 'transparent';
      e.currentTarget.style.color = colors.sidebarFg;
    }
  };

  return (
    <div style={{
      width: '100%',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: colors.sidebarBg,
      color: colors.sidebarFg,
      borderRight: `1px solid ${colors.sidebarBorder}`,
      overflow: 'hidden',
    }}>

      {/* ── Logo row ── */}
      <div style={{
        height: '64px',
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: collapsed ? 'center' : 'space-between',
        padding: '0 12px',
        borderBottom: `1px solid ${colors.sidebarBorder}`,
      }}>
        {!collapsed && (
          <span style={{ fontWeight: 700, fontSize: '1.1rem', letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>
            Ecom
          </span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          title={collapsed ? 'Expand' : 'Collapse'}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: 32, height: 32, flexShrink: 0,
            border: 'none', borderRadius: 6, background: 'transparent',
            cursor: 'pointer', color: colors.sidebarMutedFg,
          }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = colors.sidebarHover; e.currentTarget.style.color = colors.sidebarFg; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = colors.sidebarMutedFg; }}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* ── Nav list ── */}
      <div className="sidebar-scroll" style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', padding: '8px 0' }}>
        {navigationLinks.map((item, index) => {

          // Section header
          if (item.section) {
            return (
              <div key={`s-${index}`} style={{ padding: collapsed ? '12px 0 4px' : '12px 16px 4px' }}>
                {collapsed
                  ? <div style={{ height: 1, backgroundColor: colors.sidebarBorder, margin: '0 12px' }} />
                  : <span style={{ fontSize: '0.65rem', fontWeight: 700, color: colors.sidebarMutedFg, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      {item.sectionTitle}
                    </span>
                }
              </div>
            );
          }

          const Icon = item.icon;
          const isExpanded = expandedItem === item.title && !collapsed;
          const hasActiveChild = item.subLinks?.some((sub) => sub.href && url.includes(sub.href));
          const isActive = isExpanded || hasActiveChild;

          return (
            <div key={item.title}>

              {/* Parent row */}
              <button
                onClick={() => toggleExpanded(item.title)}
                title={collapsed ? item.title : undefined}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: collapsed ? 'center' : 'space-between',
                  gap: 10,
                  padding: collapsed ? '10px 0' : '9px 16px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background 0.15s',
                  backgroundColor: isActive ? colors.sidebarActive : 'transparent',
                  color: isActive ? colors.sidebarActiveFg : colors.sidebarFg,
                  textAlign: 'left',
                }}
                onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.backgroundColor = colors.sidebarHover; }}
                onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.backgroundColor = 'transparent'; }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
                  <Icon size={18} style={{ flexShrink: 0 }} />
                  {!collapsed && (
                    <span style={{ fontSize: '0.875rem', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {item.title}
                    </span>
                  )}
                </div>

                {!collapsed && item.subLinks && (
                  <ChevronDown size={14} style={{
                    flexShrink: 0,
                    opacity: 0.5,
                    transition: 'transform 0.2s',
                    transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                  }} />
                )}
              </button>

              {/* Sub links */}
              {isExpanded && item.subLinks && (
                <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: `${colors.sidebarHover}50` }}>
                  {item.subLinks.map((sub, si) => {
                    const SubIcon = sub.icon;
                    const isSubActive = sub.href && url.includes(sub.href);
                    const isDisabled = !sub.href || sub.disabled;

                    return (
                      <Link
                        key={`${sub.title}-${si}`}
                        href={isDisabled ? '#' : route(sub.href)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 10,
                          padding: '8px 16px 8px 42px',
                          fontSize: '0.825rem',
                          fontWeight: 500,
                          textDecoration: 'none',
                          cursor: isDisabled ? 'not-allowed' : 'pointer',
                          opacity: isDisabled ? 0.4 : 1,
                          transition: 'background 0.15s',
                          backgroundColor: isSubActive ? colors.sidebarActive : 'transparent',
                          color: isSubActive ? colors.sidebarActiveFg : colors.sidebarMutedFg,
                          borderLeft: `2px solid ${isSubActive ? colors.sidebarActiveFg : 'transparent'}`,
                        }}
                        onMouseEnter={(e) => { if (!isSubActive && !isDisabled) { e.currentTarget.style.backgroundColor = colors.sidebarHover; e.currentTarget.style.color = colors.sidebarFg; } }}
                        onMouseLeave={(e) => { if (!isSubActive && !isDisabled) { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = colors.sidebarMutedFg; } }}
                      >
                        <SubIcon size={14} style={{ flexShrink: 0 }} />
                        <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {sub.title}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              )}

            </div>
          );
        })}
      </div>

      <style>{`
        .sidebar-scroll::-webkit-scrollbar { width: 3px; }
        .sidebar-scroll::-webkit-scrollbar-track { background: transparent; }
        .sidebar-scroll::-webkit-scrollbar-thumb { background: ${colors.sidebarMuted}; border-radius: 2px; }
      `}</style>
    </div>
  );
}