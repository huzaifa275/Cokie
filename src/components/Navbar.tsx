import React from 'react';
import { ShoppingBag, Search, MapPin, Clock, Phone, Sparkles, X, Menu as MenuIcon, CheckCircle2 } from 'lucide-react';
import { Branch, CartItem, Order } from '../types';

interface NavbarProps {
  cartItems: CartItem[];
  setIsCartOpen: (open: boolean) => void;
  selectedCity: 'Karachi' | 'Lahore' | 'Islamabad';
  setSelectedCity: (city: 'Karachi' | 'Lahore' | 'Islamabad') => void;
  orderType: 'delivery' | 'takeaway';
  setOrderType: (type: 'delivery' | 'takeaway') => void;
  onOpenSearch: () => void;
  onOpenBoxBuilder: () => void;
  onOpenCustomCake: () => void;
  activeOrder: Order | null;
  onOpenTracker: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartItems,
  setIsCartOpen,
  selectedCity,
  setSelectedCity,
  orderType,
  setOrderType,
  onOpenSearch,
  onOpenBoxBuilder,
  onOpenCustomCake,
  activeOrder,
  onOpenTracker,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [showCityDropdown, setShowCityDropdown] = React.useState(false);

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalCartPrice = cartItems.reduce((sum, item) => sum + (item.item.price * item.quantity), 0);

  const cities: Array<'Karachi' | 'Lahore' | 'Islamabad'> = ['Karachi', 'Lahore', 'Islamabad'];

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Notification / City Ribbon */}
      <div id="top-announcement-bar" className="bg-[#180b06] border-b border-[#361c13] text-[#e8cbb8] text-xs py-2 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 bg-[#4a2818] text-[#f8d7c4] px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide">
              <Sparkles className="w-3 h-3 text-[#f7a268]" />
              FRESH BATCH OUT OF OVEN
            </span>
            <span className="hidden md:inline text-xs text-[#d3b09b]">
              Free delivery across {selectedCity} on orders above Rs. 2,000 | Code: <span className="text-[#f7a268] font-bold">WELCOME10</span>
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            {/* City Selector */}
            <div className="relative">
              <button
                id="city-selector-btn"
                onClick={() => setShowCityDropdown(!showCityDropdown)}
                className="flex items-center gap-1.5 text-[#f8e7dc] hover:text-white bg-[#2e160e] hover:bg-[#3d1e13] px-3 py-1 rounded-full border border-[#4a2818] transition-colors cursor-pointer"
              >
                <MapPin className="w-3.5 h-3.5 text-[#e07a3f]" />
                <span className="font-semibold">{selectedCity}</span>
                <span className="text-[10px] text-[#b38e79]">▼</span>
              </button>

              {showCityDropdown && (
                <div id="city-dropdown-menu" className="absolute right-0 mt-1.5 w-44 bg-[#23120b] border border-[#4a2818] rounded-xl shadow-2xl z-50 overflow-hidden py-1">
                  <div className="px-3 py-1.5 text-[10px] uppercase font-bold text-[#a67c66] tracking-wider border-b border-[#361c13]">
                    Select Your City
                  </div>
                  {cities.map((city) => (
                    <button
                      key={city}
                      onClick={() => {
                        setSelectedCity(city);
                        setShowCityDropdown(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-[#361c13] transition-colors ${
                        selectedCity === city ? 'text-[#f7a268] font-bold bg-[#2f170e]' : 'text-[#e6cfc2]'
                      }`}
                    >
                      <span>{city}</span>
                      {selectedCity === city && <CheckCircle2 className="w-3.5 h-3.5 text-[#f7a268]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mode: Delivery vs Takeaway toggle */}
            <div className="hidden sm:flex bg-[#23120b] p-0.5 rounded-full border border-[#4a2818]">
              <button
                onClick={() => setOrderType('delivery')}
                className={`px-3 py-0.5 rounded-full text-xs font-semibold transition-all ${
                  orderType === 'delivery' ? 'bg-[#e07a3f] text-white shadow-md' : 'text-[#c7a996] hover:text-white'
                }`}
              >
                Delivery
              </button>
              <button
                onClick={() => setOrderType('takeaway')}
                className={`px-3 py-0.5 rounded-full text-xs font-semibold transition-all ${
                  orderType === 'takeaway' ? 'bg-[#e07a3f] text-white shadow-md' : 'text-[#c7a996] hover:text-white'
                }`}
              >
                Takeaway
              </button>
            </div>

            {/* Direct Helpline / WhatsApp */}
            <a
              href="https://wa.me/923001234567?text=Hello%20Cokie%20Bakery,%20I%20want%20to%20place%20an%20order"
              target="_blank"
              rel="noreferrer"
              className="hidden lg:flex items-center gap-1.5 text-[#25D366] hover:text-[#45e881] font-medium"
            >
              <Phone className="w-3 h-3" />
              <span>+92 300 1234567</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-40 bg-[#23120b]/90 backdrop-blur-md border-b border-[#3d1e13]/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('hero');
            }}
            className="flex items-center gap-2.5 group"
          >
            <span className="font-script text-4xl sm:text-5xl text-white tracking-wider text-shadow-sm group-hover:text-[#f7a268] transition-colors">
              Cokie
            </span>
            <span className="hidden sm:inline-block text-[10px] uppercase font-bold tracking-[0.25em] text-[#d69f80] border-l border-[#4a2818] pl-2.5 leading-tight">
              Artisan Bakery<br />Pakistan
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold tracking-wider uppercase text-[#e2cfc4]">
            <button
              onClick={() => scrollToSection('hero')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('menu')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Categories
            </button>
            <button
              onClick={onOpenBoxBuilder}
              className="text-[#f7a268] hover:text-[#ffbe93] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>Custom Box</span>
              <span className="bg-[#4a2818] text-[#f7a268] text-[10px] px-1.5 py-0.5 rounded font-bold">4/6/12</span>
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              About Us
            </button>
            <button
              onClick={() => scrollToSection('locations')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Locations
            </button>
            <button
              onClick={onOpenCustomCake}
              className="hover:text-[#f7a268] transition-colors cursor-pointer text-xs bg-[#361c13] px-3 py-1.5 rounded-full border border-[#4a2818]"
            >
              Custom Cakes
            </button>
          </nav>

          {/* Right Action Icons & Cart */}
          <div className="flex items-center gap-3">
            {/* Search Trigger */}
            <button
              id="search-btn"
              onClick={onOpenSearch}
              className="p-2.5 rounded-full text-[#dfc5b6] hover:text-white hover:bg-[#361c13] transition-colors cursor-pointer"
              title="Search bakery items"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Active Order Tracker Button (if exists) */}
            {activeOrder && (
              <button
                id="active-order-btn"
                onClick={onOpenTracker}
                className="hidden sm:flex items-center gap-2 bg-[#3b1d12] hover:bg-[#4d2618] text-[#f7a268] border border-[#e07a3f]/50 px-3 py-1.5 rounded-full text-xs font-bold animate-pulse cursor-pointer"
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Track #{activeOrder.orderNumber}</span>
              </button>
            )}

            {/* Cart Button with Count & Amount */}
            <button
              id="cart-btn"
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2.5 bg-[#e07a3f] hover:bg-[#ea874d] text-white px-4 py-2.5 rounded-full font-bold shadow-lg shadow-[#e07a3f]/20 transition-all cursor-pointer active:scale-95"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5" />
                {totalCartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#23120b] text-white text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#e07a3f]">
                    {totalCartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline text-xs font-extrabold tracking-wide">
                {totalCartCount > 0 ? `Rs. ${totalCartPrice.toLocaleString()}` : 'Order'}
              </span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 md:hidden text-[#d6b9a8] hover:text-white hover:bg-[#361c13] rounded-lg transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#23120b] border-t border-[#3d1e13] px-6 py-5 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center pb-3 border-b border-[#361c13]">
              <span className="text-xs text-[#a8826e] font-bold uppercase">Order Mode</span>
              <div className="flex bg-[#180b06] p-1 rounded-full border border-[#4a2818]">
                <button
                  onClick={() => setOrderType('delivery')}
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    orderType === 'delivery' ? 'bg-[#e07a3f] text-white' : 'text-[#b89582]'
                  }`}
                >
                  Delivery
                </button>
                <button
                  onClick={() => setOrderType('takeaway')}
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    orderType === 'takeaway' ? 'bg-[#e07a3f] text-white' : 'text-[#b89582]'
                  }`}
                >
                  Takeaway
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-3 font-semibold text-base text-[#edd6c8]">
              <button
                onClick={() => scrollToSection('hero')}
                className="text-left py-2 hover:text-[#f7a268] border-b border-[#361c13]/50"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('menu')}
                className="text-left py-2 hover:text-[#f7a268] border-b border-[#361c13]/50"
              >
                Menu & Categories
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBoxBuilder();
                }}
                className="text-left py-2 text-[#f7a268] flex items-center justify-between border-b border-[#361c13]/50"
              >
                <span>Build Custom Baker's Box</span>
                <span className="bg-[#4a2818] text-[#f7a268] text-xs px-2 py-0.5 rounded font-bold">4 / 6 / 12</span>
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="text-left py-2 hover:text-[#f7a268] border-b border-[#361c13]/50"
              >
                Our Story & Ingredients
              </button>
              <button
                onClick={() => scrollToSection('locations')}
                className="text-left py-2 hover:text-[#f7a268] border-b border-[#361c13]/50"
              >
                Karachi, Lahore & Islamabad Branches
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCustomCake();
                }}
                className="text-left py-2 text-[#f7a268]"
              >
                Custom Cake & Wedding Inquiries
              </button>
            </div>

            {activeOrder && (
              <div className="pt-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenTracker();
                  }}
                  className="w-full bg-[#361c13] hover:bg-[#4a2818] text-[#f7a268] border border-[#e07a3f] py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2"
                >
                  <Clock className="w-4 h-4" />
                  <span>Track Active Order #{activeOrder.orderNumber}</span>
                </button>
              </div>
            )}
          </div>
        )}
      </header>
    </>
  );
};
