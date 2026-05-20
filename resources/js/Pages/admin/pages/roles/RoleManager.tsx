import React, { useState } from 'react';
import { AdminLayout } from '@/admin/components/layout/AdminLayout';
import { 
  Shield, Plus, Trash2, Edit2, Users, 
  Search, Filter, MoreVertical, X, Check,
  AlertCircle
} from 'lucide-react';
import { router, usePage } from '@inertiajs/react';
import { Button } from "@/components/ui/button";
import { useToast } from '@/contextHooks/useToasts';
import { useStoreConfigCtx } from '@/contextHooks/useStoreConfigCtx';

interface Role {
  id: number;
  name: string;
  users_count: number;
  created_at: string;
}

export default function RoleManager({ roles }: { roles: Role[] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [roleName, setRoleName] = useState('');
  const { addToast } = useToast();
  const { state: { currentTheme: theme } } = useStoreConfigCtx();

  const filteredRoles = roles.filter(role => 
    role.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenModal = (role: Role | null = null) => {
    setEditingRole(role);
    setRoleName(role ? role.name : '');
    setIsModalOpen(true);
  };

  const handleSaveRole = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingRole) {
      router.put(route('admin.roles.update', { role: editingRole.id }), { name: roleName }, {
        onSuccess: () => {
          setIsModalOpen(false);
          addToast({ type: 'success', title: 'Success', description: 'Role updated successfully' });
        }
      });
    } else {
      router.post(route('admin.roles.store'), { name: roleName }, {
        onSuccess: () => {
          setIsModalOpen(false);
          addToast({ type: 'success', title: 'Success', description: 'Role created successfully' });
        }
      });
    }
  };

  const handleDeleteRole = (id: number) => {
    if (confirm('Are you sure you want to delete this role? This might affect user permissions.')) {
      router.delete(route('admin.roles.destroy', { role: id }), {
        onSuccess: () => {
          addToast({ type: 'success', title: 'Deleted', description: 'Role removed successfully' });
        }
      });
    }
  };

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 rounded-xl">
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Role Management</h1>
              <p className="text-slate-500">Define and manage user roles across your platform</p>
            </div>
          </div>
          <Button 
            onClick={() => handleOpenModal()}
            className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
          >
            <Plus size={18} /> Add New Role
          </Button>
        </div>

        {/* Filters/Search */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              type="text"
              placeholder="Search roles..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Roles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRoles.map((role) => (
            <div 
              key={role.id}
              className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="bg-slate-50 p-2 rounded-lg group-hover:bg-blue-50 transition-colors">
                  <Shield className="w-6 h-6 text-slate-400 group-hover:text-blue-500" />
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => handleOpenModal(role)}
                    className="p-2 hover:bg-slate-100 rounded-lg text-slate-600"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button 
                    onClick={() => handleDeleteRole(role.id)}
                    className="p-2 hover:bg-red-50 rounded-lg text-red-500"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <h3 className="text-lg font-bold text-slate-900 mb-1">{role.name}</h3>
              <div className="flex items-center gap-2 text-slate-500 text-sm mb-4">
                <Users size={14} />
                <span>{role.users_count} Users assigned</span>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                  Created {new Date(role.created_at).toLocaleDateString()}
                </span>
                <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                  View Users
                </Button>
              </div>
            </div>
          ))}

          {filteredRoles.length === 0 && (
            <div className="col-span-full py-12 text-center bg-white rounded-xl border border-dashed border-slate-300">
              <Shield className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500">No roles found matching your search.</p>
            </div>
          )}
        </div>
      </div>

      {/* Role Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-900">
                {editingRole ? 'Edit Role' : 'Create New Role'}
              </h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-slate-100 rounded-full text-slate-400"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSaveRole} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Role Name
                </label>
                <input 
                  type="text"
                  required
                  placeholder="e.g. Moderator, Content Editor"
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  value={roleName}
                  onChange={(e) => setRoleName(e.target.value)}
                  autoFocus
                />
                <p className="mt-2 text-xs text-slate-500 flex items-center gap-1">
                  <AlertCircle size={12} />
                  Role names should be unique and descriptive.
                </p>
              </div>

              <div className="pt-4 flex gap-3">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="flex-1 rounded-xl"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
                >
                  {editingRole ? 'Update Role' : 'Save Role'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
