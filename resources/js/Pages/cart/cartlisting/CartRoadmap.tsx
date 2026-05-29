import React from 'react';
import { CheckCircle2, Gift, Truck, X } from "lucide-react";
import { ThemePalette } from "@/types/ThemeTypes";
import { Milestone } from "./CartPage";

interface CartRoadmapProps {
    subtotal: number;
    milestones: Milestone[];
    theme: ThemePalette;
    onClose: () => void;
}

export default function CartRoadmap({ subtotal, milestones, theme, onClose }: CartRoadmapProps) {
    if (milestones.length === 0) return null;

    const reachedCount = milestones.filter(m => subtotal >= m.goal).length;
    const maxGoal = Math.max(...milestones.map(m => m.goal));
    const progressPercentage = Math.min(100, (subtotal / maxGoal) * 100);

    return (
        <div 
            style={{ 
                backgroundColor: theme.card, 
                borderColor: theme.border,
                borderRadius: theme.borderRadius,
                boxShadow: theme.shadowMd
            }}
            className="mb-8 p-4 pt-10 border shadow-sm relative group animate-in fade-in slide-in-from-top-4 duration-500"
        >
            {/* Close Button */}
            <button 
                onClick={onClose}
                style={{ color: theme.textMuted }}
                className="absolute top-3 right-3 p-1 hover:bg-slate-100 rounded-full transition-colors z-30"
            >
                <X size={16} />
            </button>

            <div className="relative pb-8 px-4">
                {/* Background Track */}
                <div className="absolute top-1/2 left-0 w-full h-1.5 bg-slate-100 rounded-full -translate-y-1/2" />
                
                {/* Active Progress */}
                <div 
                    className="absolute top-1/2 left-0 h-1.5 rounded-full transition-all duration-1000 ease-out -translate-y-1/2"
                    style={{ 
                        width: `${progressPercentage}%`, 
                        backgroundColor: theme.primary,
                        boxShadow: `0 0 15px ${theme.primary}60`
                    }}
                />

                {/* Milestones */}
                {milestones.map((m, idx) => {
                    const isReached = subtotal >= m.goal;
                    const pos = (m.goal / maxGoal) * 100;
                    
                    return (
                        <div 
                            key={idx}
                            className="absolute top-1/2 -translate-y-1/2"
                            style={{ left: `${pos}%` }}
                        >
                            <div 
                                className="relative flex flex-col items-center"
                                style={{ transform: 'translateX(-50%)' }}
                            >
                                {/* Marker */}
                                <div 
                                    style={{ 
                                        backgroundColor: isReached ? theme.success : theme.card,
                                        borderColor: isReached ? theme.success : theme.border,
                                        color: isReached ? 'white' : theme.textMuted,
                                        boxShadow: isReached ? `0 0 10px ${theme.success}40` : 'none'
                                    }}
                                    className="w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-500 z-20 hover:scale-110 cursor-pointer"
                                >
                                    {isReached ? (
                                        <CheckCircle2 size={12} strokeWidth={3} />
                                    ) : (
                                        m.type === 'free_shipping' ? <Truck size={10} /> : <Gift size={10} />
                                    )}
                                </div>

                                {/* Label Bottom */}
                                <div className="absolute top-6 text-center">
                                    <span 
                                        className="text-[9px] font-black whitespace-nowrap uppercase tracking-tight block"
                                        style={{ color: isReached ? theme.success : theme.text }}
                                    >
                                        {m.label}
                                    </span>
                                </div>

                                {/* Pulse Effect for current target */}
                                {!isReached && idx === reachedCount && (
                                    <div 
                                        className="absolute w-8 h-8 rounded-full animate-ping opacity-20 z-0"
                                        style={{ backgroundColor: theme.primary }}
                                    />
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
