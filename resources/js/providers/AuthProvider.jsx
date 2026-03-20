import { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { usePage } from '@inertiajs/react';

export function AuthProvider({ children }) {
  const { props } = usePage();
  const [admin, setAdmin]       = useState(props.auth?.admin ?? null);
  const [isLoading, setIsLoading] = useState(false);

  // Keep admin in sync if Inertia shared props update
  useEffect(() => {
    setAdmin(props.auth?.admin ?? null);
  }, [props.auth]);

  return (
    <AuthContext.Provider value={{ admin, setAdmin, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}