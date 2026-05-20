import React, { useState } from 'react';
import '../../css/main.css';
import '../../css/util.css';

import { 
  Search, 
  ShoppingCart, 
  Heart, 
  Menu, 
  X, 
  ChevronRight,
  Facebook , 

  ChevronUp,
  Instagram,
  Twitter
} from 'lucide-react';
import { Head, Link } from '@inertiajs/react';
import CartSideBar from '@/Pages/cart/cartlisting/CartSideBar';
import StoreConfigProvider from '@/contextProvoders/StoreConfigProvider';
import { ToastProvider } from '@/contextProvoders/ToastProvider';
import { useStoreConfigCtx } from '@/contextHooks/useStoreConfigCtx';


interface LayoutProps {
  children : React.ReactNode 
  currentPage : string  ; 
  seo : {
      title : string , 
      description : string 
  }
}

const Layout = ({ children, currentPage = 'home' , seo }:LayoutProps) => {
     return (
       <ToastProvider>
         
          <StoreConfigProvider >
                      <LayoutContent {...{children , currentPage , seo}}/>
          </StoreConfigProvider>
       </ToastProvider>
     )
} 

const LayoutContent = ({ children, currentPage , seo}:LayoutProps) => {
  const { state: { currentTheme: theme } } = useStoreConfigCtx();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navigation: { name: string; href: string; active?: boolean; label?: string; submenu?: string[] }[] = [
    { name: 'Home', href: '/', active: currentPage === 'home'},
    { name: 'Shop', href: '/shop', active: currentPage === 'shop' },
    { name: 'Features', href: '/features', active: currentPage === 'cart', label: 'hot' },
    { name: 'Blog', href: '/blog', active: currentPage === 'blog' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact', submenu: ['Email', 'Phone'] }
  ];

  const cartItems = [
    { id: 1, name: 'White Shirt Pleat', price: 19.00, quantity: 1, image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=100' },
    { id: 2, name: 'Converse All Star', price: 39.00, quantity: 1, image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=100' },
    { id: 3, name: 'Nixon Porter Leather', price: 17.00, quantity: 1, image: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=100' }
  ];

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Inject theme tokens as CSS variables for components that use them
  const themeVariables = {
    '--currenththeme-bg': theme.bg,
    '--currenththeme-bgSecondary': theme.bgSecondary,
    '--currenththeme-card': theme.card,
    '--currenththeme-text': theme.text,
    '--currenththeme-textSecondary': theme.textSecondary,
    '--currenththeme-textMuted': theme.textMuted,
    '--currenththeme-primary': theme.primary,
    '--currenththeme-accent': theme.accent,
    '--currenththeme-accentHover': theme.accentHover,
    '--currenththeme-border': theme.border,
    '--currenththeme-border-radius': theme.borderRadius,
    '--currenththeme-shadow': theme.shadow,
    '--currenththeme-shadowMd': theme.shadowMd,
    '--currenththeme-shadowLg': theme.shadowLg,
    '--currenththeme-starColor': theme.starColor || '#fbbf24',
    '--currenththeme-priceText': theme.priceText || theme.primary,
    '--currenththeme-priceStrike': theme.priceStrike || theme.textMuted,
    '--currenththeme-dealBg': theme.dealBg || theme.bgSecondary,
  } as React.CSSProperties;

  return (<>
    {/* header and meta data for seo */}
      <Head>
        <title>{seo?.title || 'Default Store Title'}</title>
        <meta name="description" content={seo?.description || 'Default description'} />
      </Head>

    {/* main page content */}
    <div 
      className="min-h-screen transition-colors duration-300"
      style={{ backgroundColor: theme.bg, ...themeVariables }}
    >
      {/* Header */}
      <header className="relative">
        {/* Top Bar */}
        <div style={{ backgroundColor: theme.bgSecondary, borderBottom: `1px solid ${theme.border}` }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-10 text-sm">
              <div style={{ color: theme.textSecondary }}>
                Free shipping for standard order over $100
              </div>
              <div className="hidden md:flex space-x-6">
                <a href="#" style={{ color: theme.textSecondary }} className="hover:opacity-80 transition-opacity">Help & FAQs</a>
                <a href="#" style={{ color: theme.textSecondary }} className="hover:opacity-80 transition-opacity">My Account</a>
                <a href="#" style={{ color: theme.textSecondary }} className="hover:opacity-80 transition-opacity">EN</a>
                <a href="#" style={{ color: theme.textSecondary }} className="hover:opacity-80 transition-opacity">USD</a>
              </div>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div style={{ backgroundColor: theme.card, boxShadow: theme.shadow }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <div className="flex-shrink-0">
                <a href="#" style={{ color: theme.text }} className="text-2xl font-bold">
                  COZA STORE
                </a>
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex space-x-8">
                {navigation.map((item) => (
                  <div key={item.name} className="relative group">
                    <Link
                      href={item.href}
                      style={{ 
                        color: item.active ? theme.primary : theme.textSecondary,
                        borderBottom: item.active ? `2px solid ${theme.primary}` : 'none'
                      }}
                      className="flex items-center px-3 py-2 text-sm font-medium transition-colors hover:opacity-100"
                      onMouseEnter={(e) => { if(!item.active) e.currentTarget.style.color = theme.primary }}
                      onMouseLeave={(e) => { if(!item.active) e.currentTarget.style.color = theme.textSecondary }}
                    >
                      {item.name}
                      {item.label && (
                        <span 
                          style={{ backgroundColor: theme.error, color: '#fff' }}
                          className="ml-2 px-2 py-1 text-xs rounded-full"
                        >
                          {item.label}
                        </span>
                      )}
                    </Link>
                    {item.submenu && (
                      <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                        <div className="py-1">
                          {item.submenu.map((subitem) => (
                            <a
                              key={subitem}
                              href="#"
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              {subitem}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </nav>

              {/* Header Icons */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setIsSearchOpen(true)}
                  style={{ color: theme.textSecondary }}
                  className="p-2 transition-colors hover:opacity-70"
                >
                  <Search className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setIsCartOpen(true)}
                  style={{ color: theme.textSecondary }}
                  className="relative p-2 transition-colors hover:opacity-70"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span 
                    style={{ backgroundColor: theme.primary, color: theme.textInverse }}
                    className="absolute -top-1 -right-1 text-xs rounded-full w-5 h-5 flex items-center justify-center"
                  >
                    {cartItems.length}
                  </span>
                </button>
                <button 
                  style={{ color: theme.textSecondary }}
                  className="relative p-2 transition-colors hover:opacity-70"
                >
                  <Heart className="w-5 h-5" />
                  <span 
                    style={{ backgroundColor: theme.primary, color: theme.textInverse }}
                    className="absolute -top-1 -right-1 text-xs rounded-full w-5 h-5 flex items-center justify-center"
                  >
                    0
                  </span>
                </button>
                <button
                  onClick={() => setIsMenuOpen(true)}
                  style={{ color: theme.textSecondary }}
                  className="md:hidden p-2 transition-colors hover:opacity-70"
                >
                  <Menu className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setIsMenuOpen(false)} />
          <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-xl">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">Menu</h2>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 text-gray-600 hover:text-gray-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4">
              <div className="mb-6 text-sm text-gray-600">
                Free shipping for standard order over $100
              </div>
              <nav className="space-y-4">
                {navigation.map((item) => (
                  <div key={item.name}>
                    <a
                      href={item.href}
                      className={`flex items-center justify-between py-2 text-base font-medium ${
                        item.active ? 'text-blue-600' : 'text-gray-900'
                      }`}
                    >
                      <span className="flex items-center">
                        {item.name}
                        {item.label && (
                          <span className="ml-2 px-2 py-1 text-xs bg-red-500 text-white rounded-full">
                            {item.label}
                          </span>
                        )}
                      </span>
                      {item.submenu && <ChevronRight className="w-4 h-4" />}
                    </a>
                    {item.submenu && (
                      <div className="ml-4 mt-2 space-y-2">
                        {item.submenu.map((subitem) => (
                          <a
                            key={subitem}
                            href="#"
                            className="block py-1 text-sm text-gray-600 hover:text-gray-900"
                          >
                            {subitem}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setIsSearchOpen(false)} />
          <div className="relative bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <button
              onClick={() => setIsSearchOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center border-b border-gray-200 pb-4">
              <Search className="w-5 h-5 text-gray-400 mr-3" />
              <input
                type="text"
                placeholder="Search..."
                className="flex-1 outline-none text-gray-900 placeholder-gray-500"
                autoFocus
              />
            </div>
          </div>
        </div>
      )}

      {/* Cart Sidebar */}
      {isCartOpen && (
         <CartSideBar cartItems={cartItems} total={total}  onClose={() => setIsCartOpen(false)}/>
      )}

      {/* Main Content */}
      <main style={{ backgroundColor: theme.bg }} className="transition-colors duration-300">
        {children}
      </main>

      {/* Footer */}
      <footer style={{ backgroundColor: theme.sidebarBg, color: theme.sidebarFg }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Categories */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Categories</h3>
              <ul className="space-y-3">
                <li><a href="#" style={{ color: theme.sidebarMutedFg }} className="hover:text-white transition-colors">Women</a></li>
                <li><a href="#" style={{ color: theme.sidebarMutedFg }} className="hover:text-white transition-colors">Men</a></li>
                <li><a href="#" style={{ color: theme.sidebarMutedFg }} className="hover:text-white transition-colors">Shoes</a></li>
                <li><a href="#" style={{ color: theme.sidebarMutedFg }} className="hover:text-white transition-colors">Watches</a></li>
              </ul>
            </div>

            {/* Help */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Help</h3>
              <ul className="space-y-3">
                <li><a href="#" style={{ color: theme.sidebarMutedFg }} className="hover:text-white transition-colors">Track Order</a></li>
                <li><a href="#" style={{ color: theme.sidebarMutedFg }} className="hover:text-white transition-colors">Returns</a></li>
                <li><a href="#" style={{ color: theme.sidebarMutedFg }} className="hover:text-white transition-colors">Shipping</a></li>
                <li><a href="#" style={{ color: theme.sidebarMutedFg }} className="hover:text-white transition-colors">FAQs</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Get in Touch</h3>
              <p style={{ color: theme.sidebarMutedFg }} className="mb-6 text-sm leading-relaxed">
                Any questions? Let us know in store at 8th floor, 379 Hudson St, New York, NY 10018 or call us on (+1) 96 716 6879
              </p>
              <div className="flex space-x-4">
                <a href="#" style={{ color: theme.sidebarMutedFg }} className="hover:text-white transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" style={{ color: theme.sidebarMutedFg }} className="hover:text-white transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" style={{ color: theme.sidebarMutedFg }} className="hover:text-white transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Newsletter</h3>
              <form className="space-y-4">
                <div className="relative">
                  <input
                    type="email"
                    placeholder="email@example.com"
                    style={{ backgroundColor: theme.sidebarMuted, color: theme.sidebarFg, borderColor: theme.sidebarBorder }}
                    className="w-full px-4 py-3 rounded-md focus:outline-none border"
                  />
                </div>
                <button
                  type="submit"
                  style={{ backgroundColor: theme.primary, color: theme.textInverse }}
                  className="w-full py-3 px-4 rounded-md hover:opacity-90 transition-opacity"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Payment Icons & Copyright */}
          <div style={{ borderColor: theme.sidebarBorder }} className="mt-12 pt-8 border-t">
            <div className="flex flex-wrap justify-center items-center space-x-4 mb-6">
              <div style={{ backgroundColor: theme.sidebarMuted, color: theme.sidebarMutedFg }} className="w-12 h-8 rounded flex items-center justify-center text-xs">VISA</div>
              <div style={{ backgroundColor: theme.sidebarMuted, color: theme.sidebarMutedFg }} className="w-12 h-8 rounded flex items-center justify-center text-xs">MC</div>
              <div style={{ backgroundColor: theme.sidebarMuted, color: theme.sidebarMutedFg }} className="w-12 h-8 rounded flex items-center justify-center text-xs">AMEX</div>
              <div style={{ backgroundColor: theme.sidebarMuted, color: theme.sidebarMutedFg }} className="w-12 h-8 rounded flex items-center justify-center text-xs">PP</div>
            </div>
            <p style={{ color: theme.sidebarMutedFg }} className="text-center text-sm">
              Copyright © {new Date().getFullYear()} All rights reserved | Made with ❤️ by Colorlib & distributed by ThemeWagon
            </p>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        style={{ backgroundColor: theme.primary, color: theme.textInverse }}
        className="fixed bottom-6 right-6 p-3 rounded-full shadow-lg hover:opacity-90 transition-opacity"
      >
        <ChevronUp className="w-5 h-5" />
      </button>
    </div>
  </>
  );
};

export default Layout;