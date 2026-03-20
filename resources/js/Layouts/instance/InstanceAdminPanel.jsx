import { useSelector } from 'react-redux';
import { useAuth } from '../../hooks/useAuth';
import { Header } from './Header';
import { AuthProvider } from '../../context/AuthContext';
import { Sidebar } from './SideBar';
import { ToastProvider } from '../../hooks/ToastProvider';

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
        <Sidebar />
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