import React, { useState, useEffect, useCallback } from 'react';
import { Head, router, Link } from '@inertiajs/react';
import { useStoreConfigCtx } from '@/contextHooks/useStoreConfigCtx';
import ProductCardMaster from '@/components/partials/ProductCardMaster';
import { PaginationSlide } from '@/components/ui/PaginationSlide';
import Layout from '@/Layouts/Layout';
import { 
    Search, 
    Filter, 
    ChevronDown, 
    Star, 
    X,
    Check,
    MapPin,
    ShoppingCart,
    Heart,
    ChevronRight,
    ArrowUpDown,
    SlidersHorizontal
} from 'lucide-react';
import { debounce } from 'lodash';
import { ProductClient } from '@/types/clientSideTypes';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Skeleton } from '@/components/ui/skeleton';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { 
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from '@/components/ui/badge';

interface Category {
    id: number;
    name: string;
    products_count: number;
}

interface MarketplaceProps {
    products: {
        data: any[];
        meta: {
            current_page: number;
            last_page: number;
            total: number;
        };
    };
    categories: Category[];
    brands: string[];
    priceRange: {
        min: number;
        max: number;
    };
    filters: {
        search?: string;
        category?: string;
        min_price?: string;
        max_price?: string;
        rating?: string;
        sort?: string;
        in_stock?: string;
        brand?: string;
        is_featured?: string;
        source?: string;
    };
}

const SORT_OPTIONS = [
    { label: 'Newest', value: 'newest' },
    { label: 'Price: Low to High', value: 'price_low' },
    { label: 'Price: High to Low', value: 'price_high' },
    { label: 'Best Rated', value: 'best_rated' },
    { label: 'Most Popular', value: 'most_popular' },
];

export default function Marketplace({ products, categories, brands, priceRange, filters }: MarketplaceProps) {
    const { state: { currentTheme: theme } } = useStoreConfigCtx();
    const [localSearch, setLocalSearch] = useState(filters.search || '');
    const [isLoading, setIsLoading] = useState(false);
    const [priceValues, setPriceValues] = useState([
        Number(filters.min_price) || priceRange.min,
        Number(filters.max_price) || priceRange.max
    ]);

    const debouncedSearch = useCallback(
        debounce((value: string) => {
            handleFilterChange('search', value);
        }, 500),
        []
    );

    useEffect(() => {
        setLocalSearch(filters.search || '');
    }, [filters.search]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setLocalSearch(value);
        debouncedSearch(value);
    };

    const handleFilterChange = (key: string, value: any) => {
        setIsLoading(true);
        const newFilters = { ...filters, [key]: value };
        if (key !== 'page') {
            // @ts-ignore
            delete newFilters.page;
        }
        
        router.get(route('marketplace.index'), newFilters, {
            preserveState: true,
            preserveScroll: true,
            onFinish: () => setIsLoading(false),
        });
    };

    const handleBrandToggle = (brand: string) => {
        const currentBrands = filters.brand ? filters.brand.split(',') : [];
        const newBrands = currentBrands.includes(brand)
            ? currentBrands.filter(b => b !== brand)
            : [...currentBrands, brand];
        
        handleFilterChange('brand', newBrands.length > 0 ? newBrands.join(',') : null);
    };

    const clearFilters = () => {
        setIsLoading(true);
        router.get(route('marketplace.index'), {}, {
            preserveState: true,
            preserveScroll: true,
            onFinish: () => setIsLoading(false),
        });
    };

    const activeFilterChips = [
        filters.category && { key: 'category', label: categories.find(c => c.id === Number(filters.category))?.name },
        filters.search && { key: 'search', label: `Search: ${filters.search}` },
        filters.min_price && { key: 'min_price', label: `Min: $${filters.min_price}` },
        filters.max_price && { key: 'max_price', label: `Max: $${filters.max_price}` },
        filters.rating && { key: 'rating', label: `${filters.rating}+ Stars` },
        filters.in_stock === 'true' && { key: 'in_stock', label: 'In Stock' },
        filters.is_featured === 'true' && { key: 'is_featured', label: 'Featured' },
        filters.source === 'new_arrivals' && { key: 'source', label: 'New Arrivals' },
        ...(filters.brand ? filters.brand.split(',').map(b => ({ key: 'brand', label: b, value: b })) : []),
    ].filter(Boolean);

    return (
        <Layout currentPage="shop" seo={{ title: "Marketplace - OdaPlace Style", description: "Find the best products on our marketplace" }}>
            <div className="bg-[#f4f7f9] min-h-screen">
                {/* Marketplace Header (Sub-header) */}
                <div className="bg-white border-b sticky top-0 z-40">
                    <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
                        <div className="flex items-center h-16 gap-8">
                            {/* Categories Dropdown */}
                            <div className="hidden lg:block">
                                <Select 
                                    value={filters.category || "all"} 
                                    onValueChange={(val) => handleFilterChange('category', val === 'all' ? null : val)}
                                >
                                    <SelectTrigger className="w-[200px] border-none font-bold text-slate-700 bg-slate-50 hover:bg-slate-100">
                                        <div className="flex items-center gap-2">
                                            <Filter className="w-4 h-4" />
                                            <SelectValue placeholder="Categories" />
                                        </div>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Categories</SelectItem>
                                        {categories.map(cat => (
                                            <SelectItem key={cat.id} value={cat.id.toString()}>
                                                {cat.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Search Center */}
                            <div className="flex-1 flex items-center gap-2">
                                <div className="relative flex-1 group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Search className="h-5 w-5 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
                                    </div>
                                    <input
                                        type="text"
                                        value={localSearch}
                                        onChange={handleSearchChange}
                                        placeholder="What are you looking for..."
                                        className="block w-full pl-12 pr-4 py-3 bg-slate-50 border-2 border-transparent rounded-full text-slate-900 focus:bg-white focus:border-orange-500 focus:ring-0 transition-all outline-none"
                                    />
                                    <button 
                                        className="absolute right-2 top-1.5 bottom-1.5 px-6 bg-orange-500 text-white font-bold rounded-full hover:bg-orange-600 transition-colors"
                                        onClick={() => handleFilterChange('search', localSearch)}
                                    >
                                        Search
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Secondary Nav Links */}
                        <div className="flex items-center gap-6 py-3 overflow-x-auto scrollbar-hide text-sm font-semibold text-slate-600">
                            <Link href="#" className="whitespace-nowrap hover:text-orange-500 transition-colors">Ready to ship</Link>
                            <Link href="#" className="whitespace-nowrap hover:text-orange-500 transition-colors">Personal Protective</Link>
                            <Link href="#" className="whitespace-nowrap hover:text-orange-500 transition-colors">Buyer Central</Link>
                            <Link href="#" className="whitespace-nowrap hover:text-orange-500 transition-colors">Sell on Store</Link>
                            <Link href="#" className="whitespace-nowrap hover:text-orange-500 transition-colors flex items-center gap-1">
                                Help <ChevronDown className="w-3 h-3" />
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-8">
                    <div className="flex gap-8">
                        {/* Sidebar Filters */}
                        <aside className="hidden lg:block w-72 flex-shrink-0 space-y-6">
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-lg font-bold text-slate-800">Filter</h2>
                                    <button 
                                        onClick={clearFilters}
                                        className="text-xs font-bold text-orange-500 hover:text-orange-600 uppercase tracking-wider"
                                    >
                                        Clear All
                                    </button>
                                </div>

                                <div className="space-y-8">
                                    {/* Brands (Sync with project) */}
                                    <div>
                                        <h3 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-widest">Brands</h3>
                                        <div className="space-y-3 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                                            {brands.map(brand => (
                                                <div key={brand} className="flex items-center gap-3">
                                                    <Checkbox 
                                                        id={`brand-${brand}`} 
                                                        checked={filters.brand?.split(',').includes(brand)}
                                                        onCheckedChange={() => handleBrandToggle(brand)}
                                                    />
                                                    <label htmlFor={`brand-${brand}`} className="text-sm font-medium text-slate-600 cursor-pointer hover:text-orange-500 transition-colors">
                                                        {brand}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Price Range */}
                                    <div>
                                        <h3 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-widest">Price</h3>
                                        <div className="space-y-6">
                                            <Slider 
                                                defaultValue={priceValues} 
                                                max={priceRange.max} 
                                                min={priceRange.min} 
                                                step={1}
                                                onValueChange={(val) => setPriceValues(val)}
                                                onValueCommit={(val) => {
                                                    handleFilterChange('min_price', val[0]);
                                                    handleFilterChange('max_price', val[1]);
                                                }}
                                                className="mt-2"
                                            />
                                            <div className="flex items-center gap-2">
                                                <div className="relative flex-1">
                                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">$</span>
                                                    <input 
                                                        type="number" 
                                                        value={priceValues[0]}
                                                        onChange={(e) => setPriceValues([Number(e.target.value), priceValues[1]])}
                                                        onBlur={() => handleFilterChange('min_price', priceValues[0])}
                                                        className="w-full pl-7 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold focus:border-orange-500 focus:ring-0 outline-none"
                                                    />
                                                </div>
                                                <span className="text-slate-400">-</span>
                                                <div className="relative flex-1">
                                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">$</span>
                                                    <input 
                                                        type="number" 
                                                        value={priceValues[1]}
                                                        onChange={(e) => setPriceValues([priceValues[0], Number(e.target.value)])}
                                                        onBlur={() => handleFilterChange('max_price', priceValues[1])}
                                                        className="w-full pl-7 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold focus:border-orange-500 focus:ring-0 outline-none"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Rating */}
                                    <div>
                                        <h3 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-widest">Min Rating</h3>
                                        <div className="space-y-2">
                                            {[4, 3, 2, 1].map((stars) => (
                                                <button 
                                                    key={stars}
                                                    onClick={() => handleFilterChange('rating', stars)}
                                                    className={`w-full flex items-center justify-between p-2 rounded-lg transition-colors ${Number(filters.rating) === stars ? 'bg-orange-50 text-orange-600' : 'hover:bg-slate-50'}`}
                                                >
                                                    <div className="flex items-center gap-1">
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star 
                                                                key={i} 
                                                                className={`w-3.5 h-3.5 ${i < stars ? 'fill-orange-400 text-orange-400' : 'text-slate-200'}`} 
                                                            />
                                                        ))}
                                                        <span className="ml-2 text-sm font-bold">& Up</span>
                                                    </div>
                                                    {Number(filters.rating) === stars && <Check className="w-4 h-4" />}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Availability */}
                                    <div className="flex items-center justify-between pt-4 border-t">
                                        <span className="text-sm font-bold text-slate-900">In Stock Only</span>
                                        <Checkbox 
                                            checked={filters.in_stock === 'true'}
                                            onCheckedChange={(checked) => handleFilterChange('in_stock', checked ? 'true' : null)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </aside>

                        {/* Main Grid Area */}
                        <div className="flex-1">
                            {/* Toolbar & Chips */}
                            <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm border border-slate-100">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                                    <div className="text-slate-600 font-medium">
                                        <span className="text-slate-900 font-bold">{products.meta.total}</span> results found
                                        {filters.search && <span> for "<span className="text-orange-500 font-bold">{filters.search}</span>"</span>}
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <Select 
                                            value={filters.sort || 'newest'}
                                            onValueChange={(val) => handleFilterChange('sort', val)}
                                        >
                                            <SelectTrigger className="w-[180px] border-slate-200 font-bold">
                                                <div className="flex items-center gap-2">
                                                    <ArrowUpDown className="w-4 h-4" />
                                                    <SelectValue placeholder="Sort by" />
                                                </div>
                                            </SelectTrigger>
                                            <SelectContent>
                                                {SORT_OPTIONS.map(opt => (
                                                    <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                {/* Filter Chips */}
                                {activeFilterChips.length > 0 && (
                                    <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-50">
                                        {activeFilterChips.map((chip: any, i) => (
                                            <Badge 
                                                key={i} 
                                                variant="secondary"
                                                className="bg-slate-100 text-slate-700 hover:bg-slate-200 pl-3 pr-1 py-1 gap-1 border-none rounded-full font-bold"
                                            >
                                                {chip.label}
                                                <button 
                                                    onClick={() => {
                                                        if (chip.key === 'brand') {
                                                            handleBrandToggle(chip.value);
                                                        } else {
                                                            handleFilterChange(chip.key, null);
                                                        }
                                                    }}
                                                    className="p-0.5 rounded-full hover:bg-slate-300 transition-colors"
                                                >
                                                    <X className="w-3 h-3" />
                                                </button>
                                            </Badge>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Product Grid */}
                            {isLoading ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                                    {[...Array(8)].map((_, i) => (
                                        <div key={i} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 space-y-4">
                                            <Skeleton className="h-64 w-full rounded-xl" />
                                            <Skeleton className="h-4 w-3/4" />
                                            <Skeleton className="h-4 w-1/2" />
                                            <div className="flex justify-between">
                                                <Skeleton className="h-6 w-20" />
                                                <Skeleton className="h-6 w-12" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : products.data.length > 0 ? (
                                <>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                                        {products.data.map((product) => (
                                            <ProductCardMaster key={product.id} product={product} />
                                        ))}
                                    </div>
                                    
                                    <div className="mt-12 flex justify-center">
                                        <PaginationSlide 
                                            currentPage={products.meta.current_page}
                                            totalPages={products.meta.last_page}
                                            pages={Array.from({ length: products.meta.last_page }, (_, i) => i + 1)}
                                            onPageChange={(page) => handleFilterChange('page', page)}
                                        />
                                    </div>
                                </>
                            ) : (
                                <div className="bg-white rounded-3xl p-20 text-center shadow-sm border border-slate-100">
                                    <div className="inline-flex items-center justify-center w-24 h-24 rounded-full mb-6 bg-slate-50">
                                        <Search className="w-10 h-10 text-slate-300" />
                                    </div>
                                    <h2 className="text-2xl font-black text-slate-800 mb-2">No matching products</h2>
                                    <p className="text-slate-500 mb-8 max-w-md mx-auto">
                                        We couldn't find anything matching your current filters. Try adjusting your search or clear all filters to start over.
                                    </p>
                                    <Button 
                                        onClick={clearFilters}
                                        className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-2xl shadow-lg shadow-orange-500/20"
                                    >
                                        Reset All Filters
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
