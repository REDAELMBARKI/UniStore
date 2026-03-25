webkitURLimport ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { store } from '@/store/store';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Provider, useSelector } from 'react-redux';

export default function AuthenticatedLayout({ header, children }){
    const user = usePage().props.auth.user;
    const theme = useSelector((state) => state.theme) ; 
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false)
    return (
            <div className="min-h-screen "  
            //  style={{ background :theme.colors.primary }}
             >

                {/* navbar/ */}
                <main>
                    {children}

                </main>
            </div>
        );
}
