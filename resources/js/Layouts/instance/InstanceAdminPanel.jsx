import { useSelector } from 'react-redux';
import { ToastProvider  , AuthProvider } from '@/providers/ToastProvider';
import { InstanceSideBar } from './Partials/InstanceSideBar';
import { Header } from './Partials/Header';

export function InstanceAdminPanel({ children }) {
  return (
    <ToastProvider>
      <AuthProvider>
        <InstanceAdminPanelContent children={children} />
      </AuthProvider>
    </ToastProvider>
  );
}

const InstanceAdminPanelContent = ({ children }) => {
  const { admin, isLoading } = useAuth();
  const { colors } = useSelector((state) => state.theme);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center text-gray-700">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex h-dvh">
      {/* Sidebar: fixed width, full height, stays visible */}
      <div className="w-64 flex-shrink-0 h-full">
        <InstanceSideBar />
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header fixed height */}
        <Header />

        {/* Scrollable content */}
        <main
          className="flex-1 overflow-auto"
          style={{ color: colors.text, background: colors.bgSecondary }}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default InstanceAdminPanelContent;