import { StoreConfigContext } from "@/context/StoreConfigContext";
import { currentThemeExample } from "@/data/currentTheme";
import { StoreConfigAction, StoreConfigType, CardOption } from "@/types/StoreConfigTypes";
import { ThemeMode, ThemeStyle } from "@/types/ThemeTypes";
import { useReducer, useEffect } from "react";
import { router, usePage } from "@inertiajs/react";
import { route } from "ziggy-js";

const saveSetting = (key: string, value: any) => {
   router.put(route("store.update"), { key, value }, {
      preserveScroll: true,
   });
};

const reducer = (state: StoreConfigType, action: StoreConfigAction): StoreConfigType => {
   let newState: StoreConfigType;
   switch (action.type) {
      case "SET_LAYOUT":
         newState = { ...state, currentLayoutStyle: action.payload };
         saveSetting("store_layout_style", action.payload);
         return newState;

      case "SET_THEME_STYLE":
         newState = {
            ...state,
            currentThemeStyle: action.payload,
            currentTheme: currentThemeExample[action.payload][state.currentThemeMode]
         };
         saveSetting("store_theme_style", action.payload);
         return newState;

      case "SET_THEME_MODE":
         newState = {
            ...state,
            currentThemeMode: action.payload,
            currentTheme: currentThemeExample[state.currentThemeStyle][action.payload]
         };
         localStorage.setItem("store_theme_mode", action.payload);
         return newState;

      case "SET_CARD":
         newState = {
            ...state,
            currentCardConf: { ...action.payload, cardId: action.payload.cardId as CardOption }
         };
         saveSetting("store_card_config", newState.currentCardConf);
         return newState;

      default: return state;
   }
}

const StoreConfigProvider = ({ children, initialStoreConfigs }: { children: React.ReactNode, initialStoreConfigs?: any }) => {
   const { props } = usePage() || { props: {} };
   const storeConfigs = initialStoreConfigs || (props as any).storeConfigs;

   const getInitialThemeMode = () => {
      const saved = localStorage.getItem("store_theme_mode");
      if (saved === "light" || saved === "dark") return saved;
      return "dark";
   };

   const initialThemeMode = getInitialThemeMode() as ThemeMode;
   const initialThemeStyle = (storeConfigs?.store_theme_style || "orangeNight") as ThemeStyle;

   const initialState: StoreConfigType = {
      currentThemeMode: initialThemeMode,
      currentThemeStyle: initialThemeStyle,
      currentTheme: currentThemeExample[initialThemeStyle][initialThemeMode],
      currentLayoutStyle: storeConfigs?.store_layout_style || 'grid',
      currentCardConf: storeConfigs?.store_card_config || {
         cardId: 'card-2',
         showPrice: true,
         showRating: true,
         showBorder: true,
         isRounded: true
      }
   };

   const [state, dispatch] = useReducer(reducer, initialState);

   return (
      <StoreConfigContext.Provider value={{ state, dispatch }} >
         {children}
      </StoreConfigContext.Provider>
   )
}

export default StoreConfigProvider;
