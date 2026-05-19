'use client';

import { useState } from 'react';
import { AdminLayout } from '@/admin/components/layout/AdminLayout';
import { usePage, Link, router } from '@inertiajs/react';
import { route } from 'ziggy-js';
import {
  Plus, Pencil, Trash2, Ticket, Search, Filter, Hash, Tag, Calendar, CheckCircle, XCircle
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DeleteConfirmationModal } from '@/components/ui/DeleteConfirmationModal';

interface Coupon {
  id: number;
  code: string;
  description: string | null;
  type: 'percentage' | 'fixed';
  value: string;
  minimum_order_amount: string | null;
  minimum_items: number | null;
  max_uses: number | null;
  max_uses_per_user: number;
  times_used: number;
  valid_from: string | null;
  valid_until: string | null;
  is_active: boolean;
}

interface Props {
  coupons: Coupon[];
}

export default function Index() {
  const { coupons } = usePage().props as unknown as Props;
  const [search, setSearch] = useState('');
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleteName, setDeleteName] = useState<string>('');

  const filteredCoupons = (coupons || []).filter(c =>
    c.code.toLowerCase().includes(search.toLowerCase()) ||
    (c.description && c.description.toLowerCase().includes(search.toLowerCase()))
  );

  const handleDelete = () => {
    if (deleteId) {
      router.delete(route('coupons.destroy', deleteId), {
        onSuccess: () => setDeleteId(null),
      });
    }
  };

  const fmtDiscount = (type: string, value: string) => {
    if (type === 'percentage') return `${value}% off`;
    if (type === 'fixed') return `${value} MAD off`;
    return value;
  };

  const fmtDate = (d: string | null) => {
    if (!d) return 'N/A';
    return new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  return (
    <AdminLayout>
      <div className="space-y-6 p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold flex items-center gap-2">
              <Ticket className="h-6 w-6" />
              Coupons
            </h1>
            <p className="text-sm text-muted-foreground">
              Manage promotional codes and discounts for your store
            </p>
          </div>
            <Link href={route('coupons.create')}>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Create Coupon
              </Button>
            </Link>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <CardTitle className="text-lg font-semibold">All Coupons</CardTitle>
              <div className="relative w-full md:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by code or description..."
                  className="pl-9"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Code</TableHead>
                    <TableHead>Discount</TableHead>
                    <TableHead>Usage</TableHead>
                    <TableHead>Validity</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCoupons.length > 0 ? (
                    filteredCoupons.map((coupon) => (
                      <TableRow key={coupon.id}>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="font-mono font-bold text-primary">{coupon.code}</span>
                            <span className="text-xs text-muted-foreground truncate max-w-[200px]">
                              {coupon.description || 'No description'}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="font-medium">
                            {fmtDiscount(coupon.type, coupon.value)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col text-sm">
                            <span>{coupon.times_used} uses</span>
                            {coupon.max_uses && (
                              <span className="text-xs text-muted-foreground">Max: {coupon.max_uses}</span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              <span>{fmtDate(coupon.valid_from)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              <span>{fmtDate(coupon.valid_until)}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {coupon.is_active ? (
                            <Badge className="bg-green-500/10 text-green-500 border-green-500/20 hover:bg-green-500/20">
                              <CheckCircle className="mr-1 h-3 w-3" /> Active
                            </Badge>
                          ) : (
                            <Badge variant="secondary" className="bg-gray-500/10 text-gray-500 border-gray-500/20">
                              <XCircle className="mr-1 h-3 w-3" /> Inactive
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Link href={route('coupons.edit', coupon.id)}>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Pencil className="h-4 w-4" />
                              </Button>
                            </Link>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                              onClick={() => {
                                setDeleteId(coupon.id);
                                setDeleteName(coupon.code);
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                        No coupons found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      <DeleteConfirmationModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        name={deleteName}
        entityType="item"
      />
    </AdminLayout>
  );
}
