// Pages/Cart/CartPage.tsx
import { useStoreConfigCtx } from "@/contextHooks/useStoreConfigCtx";
import Layout from "@/Layouts/Layout";
import { useEffect, useState } from "react";
import { router, usePage } from "@inertiajs/react";
import StoreConfigProvider from "@/contextProvoders/StoreConfigProvider";
import { ArrowLeft } from "lucide-react";
import { route } from "ziggy-js";
import StepIndicator from "../shared/StepIndicator";
import CartItemsList from "./CartItemsList";
import CartSummary from "./CartSummary";
import { useToast } from "@/contextHooks/useToasts";
import axios from "axios";
import { Trash2 } from "lucide-react";
import CartRoadmap from "./CartRoadmap";
import { milliseconds } from "date-fns";

interface CartPageProps {

    onStepChange : (action : 'prev' | 'next' ) => void
}


interface CartProps {
        items: any[];
        defaultShippingAmount : number ,        
        milestones : Milestone[] 
        

}

export interface Reward {
    goal: number;
    remaining: number;
    reward_type: 'free_shipping' | 'discount';
    message: string;
}

export interface Milestone {
    goal: number;
    label: string;
    type: 'discount' | 'free_shipping';
}

export default function CartPage({ onStepChange }: CartPageProps) {
    const {
        state: { currentTheme: theme },
    } = useStoreConfigCtx();
    const { items, milestones: initialMilestones , defaultShippingAmount } = usePage().props as CartProps;
    const [bestRewardForUser, setBestRewardForUser] = useState<null | Reward>(null);
    const [milestones, setMilestones] = useState<Milestone[]>(initialMilestones || []);
    
    const [coupon_code, setCoupon_code] = useState("");
    const [isRoadmapVisible, setIsRoadmapVisible] = useState(true);
    const [prevReachedCount, setPrevReachedCount] = useState(0);
    const { addToast } = useToast();
    // Calculate totals
    const subtotal = items.reduce(
        (sum, item) => sum + item.price_snapshot * item.quantity,
        0
    );
    
    
    // get all promotions check the promotion that gives the best discount for the user invite the user to be qualified for the promotions discount 
    const shipping : number = defaultShippingAmount === 0 || (bestRewardForUser !== null && subtotal >= bestRewardForUser.goal) ? 0 : defaultShippingAmount;
    
    const handleQuantityChange = (itemId: number, newQuantity: number) => {
        if (newQuantity < 1) return;
        router.patch(
            route("cart.update", itemId),
            { quantity: newQuantity },
            {
                preserveScroll: true,
                onError: (errors) => console.error("Update error:", errors),
            }
        );
    };
    
    const handleRemoveItem = (id: number) => {
        router.delete(route("cart.destroy", { id }), {
            preserveScroll: true,
            onSuccess: () => {
                addToast({
                    type: "success",
                    title: "Item removed from cart",
                });
            },
            onError: () => {
                addToast({
                    type: "error",
                    title: "Error",
                    description: "Failed to remove item",
                });
            }
        });
    };
    
    const handleClearCart = () => {
        if (!confirm("Are you sure you want to clear your cart?")) return;
        
        router.delete(route("cart.clear"), {
            preserveScroll: true,
            onSuccess: () => {
                addToast({
                    type: "success",
                    title: "Cart cleared",
                });
            },
            onError: () => {
                addToast({
                    type: "error",
                    title: "Error",
                    description: "Failed to clear cart",
                });
            }
        });
    };
    
    const handleProceedToCheckout = () => {
        onStepChange('next');
    };
    
    
    
    
    
    
    useEffect(() => {
        const getBestRewardForUser = async () => {
            const res = await axios.get(route('shipping.calculateBestRewardForUser'))
            if (res.data) {
                setBestRewardForUser(res.data.bestRewardForUser);
                if (res.data.milestones) {
                    setMilestones(res.data.milestones);
                }
            }
        }
        
        if (subtotal > 0) {
            getBestRewardForUser();
        }
    }, [subtotal]);

    
    useEffect(() => {
        const currentReachedCount = milestones.filter(m => subtotal >= m.goal).length;
        if (currentReachedCount > prevReachedCount) {
            setIsRoadmapVisible(true);
            setPrevReachedCount(currentReachedCount);
        }
    }, [subtotal, milestones, prevReachedCount]);

    useEffect(() => {
      console.log( 'millestones' ,  milestones)
    }, [milestones]);

    return (
            <div  className="min-h-screen py-6">
                <div className="container mx-auto px-4 max-w-7xl">
                
                     {/* Continue Shopping Button */}
                            <button
                                type="button"
                                onClick={() => router.visit("/")}
                                style={{ color: theme.link }}
                                className="mb-6 flex items-center gap-2 text-sm font-medium hover:underline"
                            >
                                <ArrowLeft size={16} />
                                CONTINUE SHOPPING
                            </button>

                    {isRoadmapVisible && (
                        <div className="mb-8">
                            <CartRoadmap 
                                subtotal={subtotal} 
                                milestones={milestones} 
                                theme={theme} 
                                onClose={() => setIsRoadmapVisible(false)}
                            />
                        </div>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column - Cart Items */}
                        <div className="lg:col-span-2">
                           

                            {/* Cart Header */}
                            <div className="mb-6 flex items-center justify-between">
                                <h1 style={{ color: theme.text }} className="text-2xl font-bold">
                                    Shopping Cart ({items.length} Item
                                    {items.length !== 1 ? "s" : ""}): $
                                    {(subtotal + shipping).toFixed(2)}
                                </h1>
                                {items.length > 0 && (
                                    <button 
                                        onClick={handleClearCart}
                                        className="flex items-center gap-2 text-sm font-bold text-red-500 hover:text-red-600 transition-colors uppercase tracking-wider"
                                    >
                                        <Trash2 size={16} />
                                        Clear Cart
                                    </button>
                                )}
                            </div>

                            {/* Cart Items List */}
                            <CartItemsList
                                items={items}
                                theme={theme}
                                coupon_code={coupon_code}
                                onCouponChange={setCoupon_code}
                                onQuantityChange={handleQuantityChange}
                                onRemoveItem={handleRemoveItem}
                            />
                        </div>

                        {/* Right Column - Order Summary */}
                        <div className="lg:col-span-1">
                            <CartSummary
                                subtotal={subtotal}
                                shipping={subtotal > 0 ? shipping : 0}
                                bestRewardForUser={bestRewardForUser}
                                isFreeShipping={shipping === 0}
                                itemCount={items.length}
                                theme={theme}
                                onProceedToCheckout={handleProceedToCheckout}
                            />
                        </div>
                    </div>
                </div>
            </div>
    );
}
