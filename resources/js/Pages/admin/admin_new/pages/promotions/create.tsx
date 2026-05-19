'use client';

import { useState, useEffect } from 'react';
import { AdminLayout } from '@/admin/components/layout/AdminLayout';
import { usePage, router, Link } from '@inertiajs/react';
import { route } from 'ziggy-js';
import {
  Megaphone, ArrowLeft, Save, Trash2, Calendar, Percent, Banknote, ShoppingCart, Layers, Package, Info, Check, Truck, TrendingUp
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

interface Promotion {
  id?: number;
  name: string;
  type: 'percentage' | 'fixed' | 'free_shipping';
  value: number;
  minimum_order_amount: number | null;
  minimum_items: number | null;
  max_uses: number | null;
  valid_from: string | null;
  valid_until: string | null;
  is_active: boolean;
  priority: number;
  applicable_product_ids: number[] | null;
  applicable_category_ids: number[] | null;
  applicable_sub_category_ids: number[] | null;
}

interface Props {
  promotion?: Promotion;
  products: Product[];
  categories: Category[];
  subCategories: Category[];
}

export default function Create() {
  const { promotion, products, categories, subCategories } = usePage().props as unknown as Props;
  const isEditing = !!promotion;

  const { data, setData, post, put, processing, errors } = useForm({
    name: promotion?.name || '',
    type: promotion?.type || 'percentage',
    value: promotion?.value || 0,
    minimum_order_amount: promotion?.minimum_order_amount || null,
    minimum_items: promotion?.minimum_items || null,
    max_uses: promotion?.max_uses || null,
    valid_from: promotion?.valid_from ? new Date(promotion.valid_from).toISOString().slice(0, 16) : null,
    valid_until: promotion?.valid_until ? new Date(promotion.valid_until).toISOString().slice(0, 16) : null,
    is_active: promotion?.is_active ?? true,
    priority: promotion?.priority ?? 0,
    applicable_product_ids: promotion?.applicable_product_ids || [],
    applicable_category_ids: promotion?.applicable_category_ids || [],
    applicable_sub_category_ids: promotion?.applicable_sub_category_ids || [],
  });

  const productOptions: AllowedObjectsType[] = products.map(p => ({ value: p.id, label: p.name }));
  const categoryOptions: AllowedObjectsType[] = categories.map(c => ({ value: c.id, label: c.name }));
  const subCategoryOptions: AllowedObjectsType[] = subCategories.map(c => ({ value: c.id, label: c.name }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      put(route('promotions.update', promotion.id));
    } else {
      post(route('promotions.store'));
    }
  };

  return (
    <AdminLayout>
      <form onSubmit={handleSubmit} className="space-y-6 p-6 max-w-5xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href={route('promotions.index')}>
              <Button variant="ghost" size="icon" type="button">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-semibold">
                {isEditing ? `Edit Promotion: ${promotion.name}` : 'Create New Promotion'}
              </h1>
              <p className="text-sm text-muted-foreground">
                {isEditing ? 'Update your promotion configuration' : 'Set up a new automatic promotion for your store'}
              </p>
            </div>
          </div>
          <Button type="submit" disabled={processing} className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            {isEditing ? 'Update Promotion' : 'Save Promotion'}
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
                <CardDescription>Core details of the promotion</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Promotion Name</Label>
                    <Input
                      id="name"
                      placeholder="e.g. Summer Sale 2024"
                      value={data.name}
                      onChange={e => setData('name', e.target.value)}
                    />
                    {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
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
                  <Label htmlFor="priority">Priority</Label>
                  <div className="flex items-center gap-4">
                    <Input
                      id="priority"
                      type="number"
                      className="w-32"
                      value={data.priority}
                      onChange={e => setData('priority', parseInt(e.target.value))}
                    />
                    <p className="text-xs text-muted-foreground">
                      Higher priority promotions will be applied first if multiple qualify.
                    </p>
                  </div>
                  {errors.priority && <p className="text-xs text-destructive">{errors.priority}</p>}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Percent className="h-5 w-5 text-primary" />
                  Discount Configuration
                </CardTitle>
                <CardDescription>Define how the promotion discount is calculated</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Promotion Type</Label>
                    <Select value={data.type} onValueChange={val => setData('type', val as 'percentage' | 'fixed' | 'free_shipping')}>
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
                        <SelectItem value="free_shipping">
                          <div className="flex items-center gap-2">
                            <Truck className="h-4 w-4" />
                            <span>Free Shipping</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {data.type !== 'free_shipping' && (
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
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-primary" />
                  Applicability
                </CardTitle>
                <CardDescription>Restrict promotion to specific products or categories</CardDescription>
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
