import { useStoreConfigCtx } from "@/contextHooks/useStoreConfigCtx";
import ProductImageSlideshow from "@/components/partials/ProductImageSlideshow";
import { Eye, Heart, ShoppingCart, Star, Check } from "lucide-react";

// Card 2: Horizontal Card
const Card2 = ({ product }:{product : any}) => {
     const {state :{currentCardConf :{isRounded , showPrice , showRating , showBorder}} } = useStoreConfigCtx()

  if(!product ) return null
  return (
      <div key={product.id} className="group">
                <div className={`relative overflow-hidden rounded-lg bg-gray-100 mb-4 ${showBorder ? 'border-2 border-gray-300' : ''}`} >
                  <ProductImageSlideshow 
                    images={product.images || [product.image]} 
                    alt={product.name ?? 'image'} 
                    className="w-full h-80 transition-transform duration-500 group-hover:scale-110" 
                  />
                  
                  {/* Product Actions */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 flex space-x-2">
                      <button className="bg-white text-gray-900 p-3 rounded-full hover:bg-gray-100 transition-colors">
                        <ShoppingCart className="w-5 h-5" />
                      </button>
                      <button className="bg-white text-gray-900 p-3 rounded-full hover:bg-gray-100 transition-colors">
                        <Eye className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Wishlist Button */}
                  <button className="absolute top-4 right-4 bg-white bg-opacity-90 text-gray-600 p-2 rounded-full hover:bg-white hover:text-red-500 transition-colors">
                    <Heart className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                    {product?.name ?? ''}
                  </h3>
                  
                  {/* Rating & Sold */}
                  <div className="flex items-center justify-between">
                    {showRating && (
                      <div className="flex items-center space-x-1">
                        <Star className="w-3.5 h-3.5 text-orange-400 fill-current" />
                        <span className="text-sm font-bold text-slate-700">{product?.rating ?? '0.0'}</span>
                      </div>
                    )}
                    <span className="text-xs font-medium text-slate-500">Sold {product?.sold_count ?? 0}</span>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    {showPrice && (
                      <p className="text-lg font-black text-slate-900">${product?.price ?? '0.00'}</p>
                    )}
                    {product?.is_verified && (
                      <div className="flex items-center gap-1 bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-tighter border border-blue-100">
                        <Check className="w-2.5 h-2.5" />
                        Verified
                      </div>
                    )}
                  </div>
                  </div>
              </div>
              
  );
};


export default Card2;   