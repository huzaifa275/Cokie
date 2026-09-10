import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { DeliveryBar } from './components/DeliveryBar';
import { MenuSection } from './components/MenuSection';
import { CustomBoxBuilder } from './components/CustomBoxBuilder';
import { ItemDetailModal } from './components/ItemDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderTrackerModal } from './components/OrderTrackerModal';
import { LocationsSection } from './components/LocationsSection';
import { AboutSection } from './components/AboutSection';
import { ReviewsSection } from './components/ReviewsSection';
import { CustomCakeModal } from './components/CustomCakeModal';
import { SearchModal } from './components/SearchModal';
import { Footer } from './components/Footer';
import { BRANCHES, BAKERY_ITEMS } from './data/bakeryData';
import { BakeryItem, CartItem, Order, OrderType, Branch } from './types';

export default function App() {
  // Persistence for cart and last active order
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('cokie_bakery_cart');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    // Default starting item to showcase the bag immediately
    return [
      {
        cartItemId: 'init-cookie-1',
        item: BAKERY_ITEMS[0],
        quantity: 2,
        selectedOption: 'Single Cookie',
        serveWarm: true,
      }
    ];
  });

  const [activeOrder, setActiveOrder] = useState<Order | null>(() => {
    try {
      const saved = localStorage.getItem('cokie_active_order');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return null;
  });

  // Location & Order Mode
  const [selectedCity, setSelectedCity] = useState<'Karachi' | 'Lahore' | 'Islamabad'>('Karachi');
  const [selectedArea, setSelectedArea] = useState('DHA (Phase 1 - 8)');
  const [selectedBranch, setSelectedBranch] = useState<Branch>(BRANCHES[0]);
  const [orderType, setOrderType] = useState<OrderType>('delivery');

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isBoxBuilderOpen, setIsBoxBuilderOpen] = useState(false);
  const [isCustomCakeOpen, setIsCustomCakeOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);
  const [selectedDetailItem, setSelectedDetailItem] = useState<BakeryItem | null>(null);
  const [appliedPromo, setAppliedPromo] = useState('WELCOME10');

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('cokie_bakery_cart', JSON.stringify(cartItems));
    } catch {
      // ignore
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      if (activeOrder) {
        localStorage.setItem('cokie_active_order', JSON.stringify(activeOrder));
      }
    } catch {
      // ignore
    }
  }, [activeOrder]);

  // Cart Operations
  const handleAddToCart = (item: CartItem) => {
    const existingIndex = cartItems.findIndex(
      (c) => c.item.id === item.item.id && c.selectedOption === item.selectedOption && c.serveWarm === item.serveWarm
    );

    if (existingIndex > -1) {
      const updated = [...cartItems];
      updated[existingIndex].quantity += item.quantity;
      setCartItems(updated);
    } else {
      setCartItems([...cartItems, item]);
    }
  };

  const handleQuickAdd = (item: BakeryItem) => {
    handleAddToCart({
      cartItemId: `${item.id}-${Date.now()}`,
      item,
      quantity: 1,
      serveWarm: true,
    });
  };

  const handleUpdateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(cartItemId);
    } else {
      setCartItems(
        cartItems.map((c) => (c.cartItemId === cartItemId ? { ...c, quantity: newQty } : c))
      );
    }
  };

  const handleRemoveCartItem = (cartItemId: string) => {
    setCartItems(cartItems.filter((c) => c.cartItemId !== cartItemId));
  };

  const handleOrderPlaced = (order: Order) => {
    setActiveOrder(order);
    setCartItems([]);
    setIsTrackerOpen(true);
  };

  const scrollToMenu = () => {
    const el = document.getElementById('menu');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectPickupBranch = (branch: Branch) => {
    setSelectedBranch(branch);
    setSelectedCity(branch.city);
    setOrderType('takeaway');
    setIsCartOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#1f100a] text-[#f8f1eb] flex flex-col selection:bg-[#e07a3f] selection:text-white">
      
      {/* Navigation Bar */}
      <Navbar
        cartItems={cartItems}
        setIsCartOpen={setIsCartOpen}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        orderType={orderType}
        setOrderType={setOrderType}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenBoxBuilder={() => setIsBoxBuilderOpen(true)}
        onOpenCustomCake={() => setIsCustomCakeOpen(true)}
        activeOrder={activeOrder}
        onOpenTracker={() => setIsTrackerOpen(true)}
      />

      {/* Main Hero Section matching the user's uploaded design */}
      <HeroSection
        onExploreMenu={scrollToMenu}
        onOrderNow={() => {
          if (cartItems.length > 0) {
            setIsCheckoutOpen(true);
          } else {
            scrollToMenu();
          }
        }}
        onSelectItem={(item) => setSelectedDetailItem(item)}
        onOpenBoxBuilder={() => setIsBoxBuilderOpen(true)}
      />

      {/* Fast Delivery vs Takeaway Bar with City and Area selector */}
      <DeliveryBar
        orderType={orderType}
        setOrderType={setOrderType}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        selectedArea={selectedArea}
        setSelectedArea={setSelectedArea}
        selectedBranch={selectedBranch}
        setSelectedBranch={setSelectedBranch}
      />

      {/* Interactive Online Menu with Categories, Filters, Pricing in PKR */}
      <MenuSection
        onSelectItem={(item) => setSelectedDetailItem(item)}
        onQuickAddToCart={handleQuickAdd}
        onOpenBoxBuilder={() => setIsBoxBuilderOpen(true)}
        selectedCity={selectedCity}
      />

      {/* Brand Craft Story & Pure Ingredients */}
      <AboutSection />

      {/* Bakery Boutiques in Karachi, Lahore, Islamabad */}
      <LocationsSection
        onSelectPickupBranch={handleSelectPickupBranch}
      />

      {/* Customer Reviews and Social Proof */}
      <ReviewsSection />

      {/* Footer with hotline and newsletter */}
      <Footer
        onOpenCustomCake={() => setIsCustomCakeOpen(true)}
        onOpenBoxBuilder={() => setIsBoxBuilderOpen(true)}
      />

      {/* --- Modals & Drawers --- */}

      {/* Item Detail Modal */}
      <ItemDetailModal
        item={selectedDetailItem}
        onClose={() => setSelectedDetailItem(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Custom Baker's Box Builder (4/6/12 packs) */}
      <CustomBoxBuilder
        isOpen={isBoxBuilderOpen}
        onClose={() => setIsBoxBuilderOpen(false)}
        onAddBoxToCart={handleAddToCart}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
        orderType={orderType}
        setOrderType={setOrderType}
        selectedCity={selectedCity}
        selectedArea={selectedArea}
        appliedPromo={appliedPromo}
        setAppliedPromo={setAppliedPromo}
        onOpenBoxBuilder={() => {
          setIsCartOpen(false);
          setIsBoxBuilderOpen(true);
        }}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        orderType={orderType}
        setOrderType={setOrderType}
        selectedCity={selectedCity}
        selectedArea={selectedArea}
        selectedBranch={selectedBranch}
        appliedPromo={appliedPromo}
        onOrderPlaced={handleOrderPlaced}
      />

      {/* Live Order Tracker Modal */}
      <OrderTrackerModal
        order={activeOrder}
        isOpen={isTrackerOpen}
        onClose={() => setIsTrackerOpen(false)}
      />

      {/* Custom Cake & Wedding Inquiry Modal */}
      <CustomCakeModal
        isOpen={isCustomCakeOpen}
        onClose={() => setIsCustomCakeOpen(false)}
        selectedCity={selectedCity}
      />

      {/* Instant Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectItem={(item) => setSelectedDetailItem(item)}
      />

    </div>
  );
}
