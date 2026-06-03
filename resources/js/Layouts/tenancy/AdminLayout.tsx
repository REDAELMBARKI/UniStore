import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { 
    LayoutDashboard, 
    Store, 
    Users, 
    LogOut, 
    Menu,
    ChevronRight
} from 'lucide-react';

interface AdminLayoutProps {
    children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
    const { url } = usePage();

    const navigation = [
        { name: 'Dashboard', href: '/tenancy/dashboard', icon: LayoutDashboard },
        { name: 'Stores', href: '/tenancy/stores', icon: Store },
        { name: 'Roles', href: '/tenancy/roles', icon: Users },
    ];

    return (
        <div className="flex h-screen overflow-hidden bg-white">
            {/* Sidebar */}
            <aside className="hidden md:flex md:flex-shrink-0">
                <div className="flex flex-col w-64 border-r border-slate-200 bg-white">
                    <div className="flex items-center h-16 px-6 border-b border-slate-200">
                        <span className="text-xl font-bold text-blue-600">UniStore Tenancy</span>
                    </div>
                    <div className="flex flex-col flex-1 overflow-y-auto">
                        <nav className="flex-1 px-4 py-4 space-y-1">
                            {navigation.map((item) => {
                                const isActive = url.startsWith(item.href);
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                                            isActive 
                                                ? 'bg-blue-50 text-blue-600' 
                                                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                        }`}
                                    >
                                        <item.icon className={`mr-3 h-5 w-5 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                                        {item.name}
                                        {isActive && <ChevronRight className="ml-auto h-4 w-4" />}
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>
                    <div className="flex-shrink-0 p-4 border-t border-slate-200">
                        <Link
                            href="/logout"
                            method="post"
                            as="button"
                            className="flex items-center w-full px-3 py-2 text-sm font-medium text-slate-600 rounded-md hover:bg-slate-50 hover:text-slate-900 transition-colors"
                        >
                            <LogOut className="mr-3 h-5 w-5 text-slate-400" />
                            Logout
                        </Link>
                    </div>
                </div>
            </aside>

            {/* Main content */}
            <div className="flex flex-col flex-1 w-0 overflow-hidden">
                <header className="relative z-10 flex flex-shrink-0 h-16 bg-white border-b border-slate-200">
                    <button className="px-4 text-slate-500 md:hidden">
                        <Menu className="h-6 w-6" />
                    </button>
                    <div className="flex justify-between flex-1 px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-1 items-center">
                            <h1 className="text-lg font-semibold text-slate-900">Admin Panel</h1>
                        </div>
                        <div className="flex items-center ml-4 md:ml-6">
                            {/* Profile dropdown could go here */}
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
                                    A
                                </div>
                                <span className="text-sm font-medium text-slate-700">Admin User</span>
                            </div>
                        </div>
                    </div>
                </header>

                <main className="relative flex-1 overflow-y-auto focus:outline-none bg-slate-50">
                    <div className="py-6">
                        <div className="px-4 mx-auto max-w-7xl sm:px-6 md:px-8">
                            {children}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
