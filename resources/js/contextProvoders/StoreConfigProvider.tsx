import { StoreConfigContext } from "@/context/StoreConfigContext";
import { currentThemeExample } from "@/data/currentTheme";
import { StoreConfigAction, StoreConfigType, CardOption } from "@/types/StoreConfigTypes";
import { ThemeMode, ThemeStyle } from "@/types/ThemeTypes";
import { useReducer, useEffect, useRef, useState } from "react";
import { router } from "@inertiajs/react";
import { route } from "ziggy-js";
import { ca } from "date-fns/locale";

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
   
   const [storeConfigs] = useState(() => {
      if(initialStoreConfigs){
         localStorage.setItem('store_config' , JSON.stringify(initialStoreConfigs)) ;
         return initialStoreConfigs;
      }
       const cached = localStorage.getItem('store_config')  ;
       if(cached){
           try{
                return JSON.parse(cached) ;
           }catch(e){
              console.log(e)
               return null; 
           }
       }
   });

   const getInitialThemeMode = () => {
      const saved = localStorage.getItem("store_theme_mode");
      if (saved === "light" || saved === "dark") return saved;
      return "light";
   };


  
   const initialThemeMode = getInitialThemeMode() as ThemeMode;
  
   const initialThemeStyle = (storeConfigs?.store_theme_style || 'softPastel') as ThemeStyle;
 
   const initialState: StoreConfigType = {
      currentThemeMode: initialThemeMode,
      currentThemeStyle: initialThemeStyle,
      currentTheme: currentThemeExample[initialThemeStyle][initialThemeMode],
      currentLayoutStyle: storeConfigs?.store_layout_style,
      currentCardConf: storeConfigs?.store_card_config 
   };

   const [state, dispatch] = useReducer(reducer, initialState);

   return (
      <StoreConfigContext.Provider value={{ state, dispatch }} >
         {children}
      </StoreConfigContext.Provider>
   )
}

export default StoreConfigProvider;
