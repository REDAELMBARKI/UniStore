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

interface CartPageProps {

    onStepChange : (action : 'prev' | 'next' ) => void
}


interface CartProps {
        items: any[];
    defaultShippingAmount :  number ;
}


export default function CartPage({ onStepChange }: CartPageProps) {
    const {
        state: { currentTheme: theme },
    } = useStoreConfigCtx();
    const {items , defaultShippingAmount} = usePage().props  as  CartProps;

    const [bestGoalForuser , setBestGoalForuser] =  useState<null|number>(null);
    const [coupon_code, setCoupon_code] = useState("");
    const {addToast} = useToast() ; 
    // Calculate totals
    const subtotal = items.reduce(
        (sum, item) => sum + item.price_snapshot * item.quantity,
        0
    );


    // get all promotions check the promotion that gives the best discount for the user invite the user to be qualified for the promotions discount 
    const shipping: number = defaultShippingAmount === 0 || (bestGoalForuser !== null && subtotal >= bestGoalForuser) ? 0 : defaultShippingAmount;
    
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
       const getBestGoalForUser = async () => {
            const res = await axios.get(route('shipping.calculateBestGoalForUser'))
            if (res.data) {
                setBestGoalForuser(res.data.bestGoalForUser);
            }
       }

       if(subtotal > 0) {
        getBestGoalForUser();
       }
    }, [subtotal]);

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
                                shipping={subtotal > 0 ? shipping : 0 }
                                bestGoalForuser={bestGoalForuser}
                                isFreeShipping={shipping == 0}
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
