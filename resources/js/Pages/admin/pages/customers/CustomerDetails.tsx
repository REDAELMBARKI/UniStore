import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, ShoppingBag, Star, Calendar, FileText, Bell, StickyNote, AlertTriangle, Package, Heart, CreditCard, Edit2, Shield, Trash2, Plus } from 'lucide-react';
import EmptyListSection from '@/admin/components/partials/EmptyListSection';
import { AdminLayout } from '@/admin/components/layout/AdminLayout';
import { useToast } from '@/contextHooks/useToasts';
import { router } from '@inertiajs/react';
import { Button } from "@/components/ui/button";

interface Role {
  id: number;
  name: string;
}

interface CustomerData {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  status: string;
  memberSince: string;
  totalOrders: number;
  totalSpent: number;
  recentOrders: any[] | null;
  avatarUrl?: string | null;
  primaryInterest?: string | null;
  allInterests?: string[] | null;
  importantNotes?: string[] | null;
  roles?: Role[];
}

export default function CustomerDetails({ customer: backendCustomer, allRoles }: { customer?: CustomerData, allRoles: Role[] }) {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const { addToast } = useToast();
  
  // Default fallback if no data passed (though middleware/controller should handle this)
  const customer: CustomerData = backendCustomer || {
    id: 0,
    name: 'Unknown Customer',
    email: 'N/A',
    phone: 'N/A',
    address: 'N/A',
    status: 'Inactive',
    memberSince: 'N/A',
    totalOrders: 0,
    totalSpent: 0,
    recentOrders: null,
    roles: []
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Heart },
    { id: 'roles', label: 'Roles', icon: Shield },
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
    { id: 'preferences', label: 'Preferences', icon: Star },
    { id: 'notes', label: 'Notes', icon: StickyNote }
  ];

  const handleBack = () => {
    window.location.href = '/admin/customers';
  };

  const handleAssignRole = (roleId: string) => {
    if (!roleId) return;
    router.post(route('admin.users.assignRole', { user: customer.id }), { role_id: roleId }, {
      onSuccess: () => addToast({ type: 'success', title: 'Assigned', description: 'Role assigned successfully' })
    });
  };

  const handleRemoveRole = (roleId: number) => {
    router.delete(route('admin.users.removeRole', { user: customer.id }), { 
      data: { role_id: roleId },
      onSuccess: () => addToast({ type: 'success', title: 'Removed', description: 'Role removed successfully' })
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Back Button */}
      <button 
        onClick={handleBack}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
      >
        <span className="text-xl">←</span>
        <span className="font-medium">Back to Customers</span>
      </button>

      {/* Customer Header Card */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        {/* ... (existing header content) ... */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex gap-6">
            {/* Avatar */}
            <div className="w-32 h-32 bg-gradient-to-br from-slate-300 to-slate-400 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden">
              {customer.avatarUrl ? (
                <img src={customer.avatarUrl} alt={customer.name} className="w-full h-full object-cover" />
              ) : (
                <User className="w-16 h-16 text-slate-600" />
              )}
            </div>

            {/* Customer Info */}
            <div className="space-y-3">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-3xl font-bold text-gray-900">{customer.name}</h1>
                  <button className="text-gray-400 hover:text-gray-600 transition-colors">
                    <Edit2 className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-gray-600">
                  {customer.status} • Member since {customer.memberSince}
                </p>
              </div>

              <div className="flex items-center gap-2 text-gray-700">
                <Mail className="w-4 h-4 text-gray-400" />
                <span>{customer.email}</span>
                <button className="text-gray-400 hover:text-gray-600 transition-colors ml-1">
                  <Edit2 className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center gap-2 text-gray-700">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span>{customer.address}</span>
              </div>
            </div>
          </div>

          {/* Status Badge */}
          <span className={`px-4 py-2 rounded-md text-sm font-semibold ${
            customer.status === 'Active' 
              ? 'bg-green-500 text-white' 
              : 'bg-gray-400 text-white'
          }`}>
            {customer.status}
          </span>
        </div>

        {/* Contact Row */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div className="flex items-center gap-2 text-gray-700">
            <Phone className="w-4 h-4 text-gray-400" />
            <span>{customer.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <User className="w-4 h-4 text-gray-400" />
            <span>Orders: {customer.totalOrders} • Spent: {customer.totalSpent} MAD</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg shadow-sm mb-6 overflow-x-auto">
        <div className="flex border-b border-gray-200 min-w-max">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors relative ${
                  activeTab === tab.id
                    ? 'text-emerald-600 bg-emerald-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{tab.label}</span>
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600"></div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="space-y-6">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Interests and Notes (same as before) */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center gap-2 mb-6">
                <Heart className="w-5 h-5 text-gray-600" />
                <h2 className="text-xl font-bold text-gray-900">Customer Interests</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-600 mb-2">Primary Interest</h3>
                  {customer.primaryInterest ? (
                    <span className="inline-block bg-emerald-500 text-white px-4 py-2 rounded-md font-medium">{customer.primaryInterest}</span>
                  ) : (
                    <div className="text-gray-400 italic py-2">No primary interest set</div>
                  )}
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-600 mb-2">All Interests</h3>
                  <div className="flex flex-wrap gap-2">
                    {customer.allInterests?.map((interest, i) => (
                      <span key={i} className="bg-white border border-gray-300 text-gray-700 px-3 py-1.5 rounded-md text-sm font-medium">{interest}</span>
                    )) || <div className="text-gray-400 italic py-2">No interests recorded</div>}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center gap-2 mb-6">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                <h2 className="text-xl font-bold text-gray-900">Important Notes</h2>
              </div>
              {customer.importantNotes && customer.importantNotes.length > 0 ? (
                <div className="space-y-3">
                  {customer.importantNotes.map((note, i) => (
                    <div key={i} className="bg-red-50 border border-red-200 rounded-md p-4 flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5" />
                      <span className="text-red-800 font-medium">{note}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-gray-50 border border-gray-200 rounded-md p-4 text-center text-gray-400 italic">No important notes</div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'roles' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Shield className="w-6 h-6 text-slate-700" />
                <h2 className="text-xl font-bold text-slate-900">Assigned Roles</h2>
              </div>
              <div className="flex gap-2">
                <select 
                  className="px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 text-sm"
                  onChange={(e) => handleAssignRole(e.target.value)}
                  defaultValue=""
                >
                  <option value="" disabled>Add a role...</option>
                  {allRoles.filter(r => !customer.roles?.some(ur => ur.id === r.id)).map(role => (
                    <option key={role.id} value={role.id}>{role.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {customer.roles && customer.roles.length > 0 ? (
                customer.roles.map((role) => (
                  <div key={role.id} className="flex items-center justify-between p-4 rounded-xl border border-slate-200 bg-slate-50 group">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-emerald-100 rounded-lg">
                        <Shield className="w-4 h-4 text-emerald-600" />
                      </div>
                      <span className="font-semibold text-slate-900">{role.name}</span>
                    </div>
                    <button 
                      onClick={() => handleRemoveRole(role.id)}
                      className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))
              ) : (
                <div className="col-span-full py-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200 text-slate-400">
                  This user has no assigned roles.
                </div>
              )}
            </div>
          </div>
        )}

        {/* ... (Orders tab would go here if implemented) ... */}
      </div>
    </div>
  );
}



CustomerDetails.layout = (page : any) => <AdminLayout children={page}/> 