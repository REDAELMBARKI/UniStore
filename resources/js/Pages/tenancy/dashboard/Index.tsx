import React from 'react';
import { Head } from '@inertiajs/react';
import TenancyLayout from '@/Layouts/tenancy/TenancyLayout';
import AdminLayout from '@/Layouts/tenancy/AdminLayout';

const Dashboard = () => {
    return (
        <>
            <Head title="Tenancy Dashboard" />
            <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Welcome to Tenancy Admin</h2>
                    <p className="text-slate-600">Manage your multi-tenant store infrastructure from here.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { label: 'Total Stores', value: '12', color: 'bg-blue-600' },
                        { label: 'Active Tenants', value: '10', color: 'bg-emerald-600' },
                        { label: 'Total Users', value: '156', color: 'bg-amber-600' },
                    ].map((stat) => (
                        <div key={stat.label} className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
                            <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                            <p className="text-3xl font-bold text-slate-900 mt-1">{stat.value}</p>
                            <div className={`h-1 w-12 mt-4 rounded-full ${stat.color}`}></div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

Dashboard.layout = (page: React.ReactNode) => (
    <TenancyLayout>
        <AdminLayout>{page}</AdminLayout>
    </TenancyLayout>
);

export default Dashboard;
