import React from "react";
import { AdminLayout } from "@/admin/components/layout/AdminLayout";
import CardsConfig from "../settings/configStore/cardsConfig/Components/CardsConfig";
import { useTheme } from "@/contextHooks/useTheme";

export const CardsConfigPage = () => {
    const { theme: currentTheme } = useTheme();

    return (
        <div className="h-full flex flex-col" style={{ background: currentTheme.bg, color: currentTheme.text }}>
            <div className="p-6 pb-0">
                <h1 className="text-2xl font-bold mb-2">Product Cards</h1>
                <p className="opacity-60 mb-6 border-b pb-4" style={{ borderColor: currentTheme.border }}>
                    Customize the layout and visible elements of products in your catalog.
                </p>
            </div>
            <div className="flex-1 overflow-hidden">
                <CardsConfig />
            </div>
        </div>
    );
};

CardsConfigPage.layout = (page: any) => <AdminLayout children={page} />;
export default CardsConfigPage;

