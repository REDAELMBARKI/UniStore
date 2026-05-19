'use client';

import { useState, useEffect } from 'react';
import { AdminLayout } from '@/admin/components/layout/AdminLayout';
import { usePage, router, Link } from '@inertiajs/react';
import { route } from 'ziggy-js';
import {
  Ticket, ArrowLeft, Save, Trash2, Calendar, Percent, Banknote, ShoppingCart, Layers, Package, Info, Check
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import MultiSelectDropdownForObject, { AllowedObjectsType } from '@/components/ui/MultiSelectDropdownForObject';
import { useForm } from '@inertiajs/react';

interface Product {
  id: number;
  name: string;
}

interface Category {
  id: number;
  name: string;
}

interface Coupon {
  id?: number;
  code: string;
  description: string | null;
  type: 'percentage' | 'fixed';
  value: number;
  minimum_order_amount: number | null;
  minimum_items: number | null;
  max_uses: number | null;
  max_uses_per_user: number;
  valid_from: string | null;
  valid_until: string | null;
  is_active: boolean;
  applicable_product_ids: number[] | null;
  applicable_category_ids: number[] | null;
  applicable_sub_category_ids: number[] | null;
}

interface Props {
  coupon?: Coupon;
  products: Product[];
  categories: Category[];
  subCategories: Category[];
}

export default function Create() {
  const { coupon, products, categories, subCategories } = usePage().props as unknown as Props;
  const isEditing = !!coupon;

  const { data, setData, post, put, processing, errors } = useForm({
    code: coupon?.code || '',
    description: coupon?.description || '',
    type: coupon?.type || 'percentage',
    value: coupon?.value || 0,
    minimum_order_amount: coupon?.minimum_order_amount || null,
    minimum_items: coupon?.minimum_items || null,
    max_uses: coupon?.max_uses || null,
    max_uses_per_user: coupon?.max_uses_per_user || 1,
    valid_from: coupon?.valid_from ? new Date(coupon.valid_from).toISOString().slice(0, 16) : null,
    valid_until: coupon?.valid_until ? new Date(coupon.valid_until).toISOString().slice(0, 16) : null,
    is_active: coupon?.is_active ?? true,
    applicable_product_ids: coupon?.applicable_product_ids || [],
    applicable_category_ids: coupon?.applicable_category_ids || [],
    applicable_sub_category_ids: coupon?.applicable_sub_category_ids || [],
  });

  const productOptions: AllowedObjectsType[] = products.map(p => ({ value: p.id, label: p.name }));
  const categoryOptions: AllowedObjectsType[] = categories.map(c => ({ value: c.id, label: c.name }));
  const subCategoryOptions: AllowedObjectsType[] = subCategories.map(c => ({ value: c.id, label: c.name }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      put(route('coupons.update', coupon.id));
    } else {
      post(route('coupons.store'));
    }
  };

  return (
    <AdminLayout>
      <form onSubmit={handleSubmit} className="space-y-6 p-6 max-w-5xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href={route('coupons.index')}>
              <Button variant="ghost" size="icon" type="button">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-semibold">
                {isEditing ? `Edit Coupon: ${coupon.code}` : 'Create New Coupon'}
              </h1>
              <p className="text-sm text-muted-foreground">
                {isEditing ? 'Update your coupon configuration' : 'Set up a new promotional code for your customers'}
              </p>
            </div>
          </div>
          <Button type="submit" disabled={processing} className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            {isEditing ? 'Update Coupon' : 'Save Coupon'}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5 text-primary" />
                  Basic Information
                </CardTitle>
                <CardDescription>Core details of the coupon</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="code">Coupon Code</Label>
                    <Input
                      id="code"
                      placeholder="e.g. SUMMER2024"
                      className="uppercase font-mono font-bold"
                      value={data.code}
                      onChange={e => setData('code', e.target.value.toUpperCase())}
                    />
                    {errors.code && <p className="text-xs text-destructive">{errors.code}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="is_active">Status</Label>
                    <div className="flex items-center gap-2 h-10">
                      <Switch
                        id="is_active"
                        checked={data.is_active}
                        onCheckedChange={checked => setData('is_active', checked)}
                      />
                      <span className="text-sm">{data.is_active ? 'Active' : 'Inactive'}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe what this coupon offers..."
                    rows={2}
                    value={data.description}
                    onChange={e => setData('description', e.target.value)}
                  />
                  {errors.description && <p className="text-xs text-destructive">{errors.description}</p>}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Percent className="h-5 w-5 text-primary" />
                  Discount Configuration
                </CardTitle>
                <CardDescription>Define how much discount is applied</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Discount Type</Label>
                    <Select value={data.type} onValueChange={val => setData('type', val as 'percentage' | 'fixed')}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="percentage">
                          <div className="flex items-center gap-2">
                            <Percent className="h-4 w-4" />
                            <span>Percentage (%)</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="fixed">
                          <div className="flex items-center gap-2">
                            <Banknote className="h-4 w-4" />
                            <span>Fixed Amount (MAD)</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="value">Discount Value</Label>
                    <div className="relative">
                      <Input
                        id="value"
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        className="pr-12"
                        value={data.value}
                        onChange={e => setData('value', parseFloat(e.target.value))}
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">
                        {data.type === 'percentage' ? '%' : 'MAD'}
                      </span>
                    </div>
                    {errors.value && <p className="text-xs text-destructive">{errors.value}</p>}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-primary" />
                  Applicability
                </CardTitle>
                <CardDescription>Restrict coupon to specific products or categories</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Restrict to Products</Label>
                  <MultiSelectDropdownForObject
                    label="Products"
                    options={productOptions}
                    selectedValues={productOptions.filter(o => data.applicable_product_ids?.includes(o.value as number))}
                    onChange={selected => setData('applicable_product_ids', selected.map(s => s.value as number))}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Restrict to Categories</Label>
                    <MultiSelectDropdownForObject
                      label="Categories"
                      options={categoryOptions}
                      selectedValues={categoryOptions.filter(o => data.applicable_category_ids?.includes(o.value as number))}
                      onChange={selected => setData('applicable_category_ids', selected.map(s => s.value as number))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Restrict to Sub-categories</Label>
                    <MultiSelectDropdownForObject
                      label="Sub-categories"
                      options={subCategoryOptions}
                      selectedValues={subCategoryOptions.filter(o => data.applicable_sub_category_ids?.includes(o.value as number))}
                      onChange={selected => setData('applicable_sub_category_ids', selected.map(s => s.value as number))}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <ShoppingCart className="h-4 w-4 text-primary" />
                  Usage Limits
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="minimum_order_amount">Min. Order Amount (MAD)</Label>
                  <Input
                    id="minimum_order_amount"
                    type="number"
                    step="0.01"
                    placeholder="No minimum"
                    value={data.minimum_order_amount || ''}
                    onChange={e => setData('minimum_order_amount', e.target.value ? parseFloat(e.target.value) : null)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="minimum_items">Min. Items Quantity</Label>
                  <Input
                    id="minimum_items"
                    type="number"
                    placeholder="No minimum"
                    value={data.minimum_items || ''}
                    onChange={e => setData('minimum_items', e.target.value ? parseInt(e.target.value) : null)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="max_uses">Total Usage Limit</Label>
                  <Input
                    id="max_uses"
                    type="number"
                    placeholder="Unlimited"
                    value={data.max_uses || ''}
                    onChange={e => setData('max_uses', e.target.value ? parseInt(e.target.value) : null)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="max_uses_per_user">Limit Per User</Label>
                  <Input
                    id="max_uses_per_user"
                    type="number"
                    value={data.max_uses_per_user}
                    onChange={e => setData('max_uses_per_user', parseInt(e.target.value))}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Calendar className="h-4 w-4 text-primary" />
                  Validity Period
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="valid_from">Start Date</Label>
                  <Input
                    id="valid_from"
                    type="datetime-local"
                    value={data.valid_from || ''}
                    onChange={e => setData('valid_from', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="valid_until">End Date</Label>
                  <Input
                    id="valid_until"
                    type="datetime-local"
                    value={data.valid_until || ''}
                    onChange={e => setData('valid_until', e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </AdminLayout>
  );
}
