import { useState } from 'react';
import { useSelector } from 'react-redux';
import { InstanceSideBar } from './Partials/InstanceSideBar';
import { Header } from './Partials/Header';
import { ToastProvider } from '@/providers/ToastProvider';
import { AuthProvider } from '@/providers/AuthProvider';
import { useAuth } from '@/hooks/useAuth';

export default function InstanceAdminPanel({ children }) {
  return (
    <ToastProvider>
      <AuthProvider>
        <InstanceAdminPanelContent>{children}</InstanceAdminPanelContent>
      </AuthProvider>
    </ToastProvider>
  );
}

const InstanceAdminPanelContent = ({ children }) => {
  const { isLoading } = useAuth();
  const { colors } = useSelector((state) => state.theme);
  const [collapsed, setCollapsed] = useState(false);

  if (isLoading) {
    return (
      <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>
        Loading...
      </div>
    );
  }

  const SIDEBAR_W = collapsed ? 72 : 256;

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: colors.bgSecondary }}>

      {/* ── Sidebar ── */}
      <div style={{
        width: `${SIDEBAR_W}px`,
        minWidth: `${SIDEBAR_W}px`,
        maxWidth: `${SIDEBAR_W}px`,
        height: '100vh',
        flexShrink: 0,
        transition: 'width 0.3s ease, min-width 0.3s ease, max-width 0.3s ease',
        overflow: 'hidden',
        position: 'relative',
        zIndex: 10,
      }}>
        <InstanceSideBar collapsed={collapsed} setCollapsed={setCollapsed} />
      </div>

      {/* ── Right side: Header + Main ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>
        <Header />
        <main style={{
          flex: 1,
          overflowY: 'auto',
          color: colors.text,
          background: colors.bgSecondary,
        }}>
          {children}
        </main>
      </div>

    </div>
  );
};