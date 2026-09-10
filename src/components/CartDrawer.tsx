import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, Plus, Minus, ArrowRight, Sparkles, Tag, Gift, Bike, Store, Check } from 'lucide-react';
import { CartItem, OrderType, Branch } from '../types';
import { PROMO_CODES, CITY_AREAS } from '../data/bakeryData';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onProceedToCheckout: () => void;
  orderType: OrderType;
  setOrderType: (type: OrderType) => void;
  selectedCity: 'Karachi' | 'Lahore' | 'Islamabad';
  selectedArea: string;
  appliedPromo: string;
  setAppliedPromo: (promo: string) => void;
  onOpenBoxBuilder: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  orderType,
  setOrderType,
  selectedCity,
  selectedArea,
  appliedPromo,
  setAppliedPromo,
  onOpenBoxBuilder,
}) => {
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');

  if (!isOpen) return null;

  const currentAreaInfo = CITY_AREAS[selectedCity]?.find((a) => a.name === selectedArea) || CITY_AREAS[selectedCity]?.[0] || { deliveryFee: 150 };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.item.price * item.quantity), 0);
  const freeDeliveryThreshold = 2000;
  const isFreeDelivery = orderType === 'takeaway' || subtotal >= freeDeliveryThreshold;
  const deliveryFee = isFreeDelivery ? 0 : currentAreaInfo.deliveryFee;

  let discount = 0;
  if (appliedPromo && PROMO_CODES[appliedPromo]) {
    const promo = PROMO_CODES[appliedPromo];
    if (subtotal >= promo.minSubtotal) {
      discount = Math.round((subtotal * promo.discountPercent) / 100);
    }
  }

  const grandTotal = Math.max(0, subtotal - discount + deliveryFee);
  const amountNeededForFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);

  const handleApplyPromo = () => {
    setPromoError('');
    const code = promoInput.trim().toUpperCase();
    if (!code) return;

    if (PROMO_CODES[code]) {
      const promo = PROMO_CODES[code];
      if (subtotal < promo.minSubtotal) {
        setPromoError(`Requires minimum subtotal of Rs. ${promo.minSubtotal}`);
        return;
      }
      setAppliedPromo(code);
      setPromoInput('');
    } else {
      setPromoError('Invalid promo code. Try WELCOME10');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-xs">
      <div className="w-full max-w-md bg-[#23120b] h-full flex flex-col shadow-2xl border-l border-[#472214] animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-[#1a0c06] border-b border-[#3b1c10] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#e07a3f] text-white flex items-center justify-center font-bold">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-black text-white text-base sm:text-lg">Your Bakery Bag</h3>
              <span className="text-xs text-[#b89380]">{cartItems.length} items • {selectedCity}</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-[#bda08f] hover:text-white hover:bg-[#341a0f] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Delivery Bar */}
        {orderType === 'delivery' && (
          <div className="bg-[#2d150c] px-4 py-2.5 border-b border-[#422013]">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-[#f7a268] font-bold flex items-center gap-1">
                <Bike className="w-3.5 h-3.5" />
                {isFreeDelivery ? '🎉 FREE Delivery Unlocked!' : `Add Rs. ${amountNeededForFreeDelivery.toLocaleString()} for Free Delivery`}
              </span>
              <span className="text-[#a8826e]">{subtotal} / {freeDeliveryThreshold}</span>
            </div>
            <div className="w-full bg-[#1b0c06] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#22c55e] h-full rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, (subtotal / freeDeliveryThreshold) * 100)}%` }}
              />
            </div>
          </div>
        )}

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#31160c] flex items-center justify-center text-[#946954]">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="text-base font-bold text-white">Your bag is empty</h4>
              <p className="text-xs text-[#b89582] max-w-xs">
                Our fresh batches are coming out of the oven! Explore our menu or build a custom gift box.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onOpenBoxBuilder();
                }}
                className="bg-[#e07a3f] text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-[#eb874d]"
              >
                Build Custom Box →
              </button>
            </div>
          ) : (
            cartItems.map((cartItem) => (
              <div
                key={cartItem.cartItemId}
                className="bg-[#2a140d] border border-[#442214] rounded-2xl p-3 flex gap-3 relative group"
              >
                <img
                  src={cartItem.item.image}
                  alt={cartItem.item.name}
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 rounded-xl object-cover flex-shrink-0 bg-black"
                />

                <div className="flex-1 min-w-0 pr-6">
                  <h4 className="text-xs font-bold text-white truncate">{cartItem.item.name}</h4>
                  
                  {cartItem.selectedOption && (
                    <span className="text-[10px] text-[#e07a3f] block font-medium">
                      {cartItem.selectedOption}
                    </span>
                  )}
                  
                  {cartItem.serveWarm && (
                    <span className="text-[9px] bg-[#421d0e] text-[#f8cbb1] px-1.5 py-0.5 rounded inline-block mt-0.5">
                      🔥 Serve Warm
                    </span>
                  )}

                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs font-black text-[#f7a268]">
                      Rs. {(cartItem.item.price * cartItem.quantity).toLocaleString()}
                    </span>

                    {/* Quantity Selector */}
                    <div className="flex items-center bg-[#190b05] rounded-lg border border-[#3b1c10] p-0.5">
                      <button
                        onClick={() => onUpdateQuantity(cartItem.cartItemId, cartItem.quantity - 1)}
                        className="w-5 h-5 rounded flex items-center justify-center text-xs font-bold text-[#f7a268] hover:bg-[#341a0f]"
                      >
                        -
                      </button>
                      <span className="w-6 text-center text-xs font-bold text-white">
                        {cartItem.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(cartItem.cartItemId, cartItem.quantity + 1)}
                        className="w-5 h-5 rounded flex items-center justify-center text-xs font-bold text-white bg-[#e07a3f] hover:bg-[#eb874d]"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Remove item button */}
                <button
                  onClick={() => onRemoveItem(cartItem.cartItemId)}
                  className="absolute top-2.5 right-2.5 text-[#8f6853] hover:text-[#ef4444] transition-colors p-1"
                  title="Remove item"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer with promo code & checkout */}
        {cartItems.length > 0 && (
          <div className="bg-[#1a0c06] p-4 sm:p-5 border-t border-[#3b1c10] space-y-3.5">
            
            {/* Promo Code Input */}
            <div className="space-y-1">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Promo (e.g. WELCOME10)"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    className="w-full bg-[#120703] text-white text-xs px-3 py-2 rounded-xl border border-[#3e1f13] focus:outline-none focus:border-[#e07a3f] uppercase placeholder:normal-case"
                  />
                  <Tag className="w-3.5 h-3.5 text-[#8f6d5a] absolute right-3 top-1/2 -translate-y-1/2" />
                </div>
                <button
                  onClick={handleApplyPromo}
                  className="bg-[#3b1d11] hover:bg-[#502616] text-[#f7a268] border border-[#e07a3f]/40 px-3.5 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  Apply
                </button>
              </div>

              {promoError && <p className="text-[10px] text-[#ef4444]">{promoError}</p>}
              
              {appliedPromo && (
                <div className="flex items-center justify-between text-xs bg-[#14532d]/30 border border-[#166534] px-2.5 py-1 rounded-lg text-[#4ade80]">
                  <span>Code <b>{appliedPromo}</b> applied</span>
                  <button onClick={() => setAppliedPromo('')} className="text-[10px] underline text-gray-300">
                    Remove
                  </button>
                </div>
              )}
            </div>

            {/* Bill Breakdown */}
            <div className="space-y-1.5 text-xs text-[#c9a794] pt-2 border-t border-[#361c12]">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-semibold text-white">Rs. {subtotal.toLocaleString()}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-[#4ade80]">
                  <span>Promo Discount ({appliedPromo})</span>
                  <span>- Rs. {discount.toLocaleString()}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>{orderType === 'delivery' ? `Delivery (${selectedArea})` : 'Store Pickup Fee'}</span>
                <span className={deliveryFee === 0 ? 'text-[#4ade80] font-bold' : 'text-white'}>
                  {deliveryFee === 0 ? 'FREE' : `Rs. ${deliveryFee}`}
                </span>
              </div>

              <div className="flex justify-between text-sm sm:text-base font-black text-white pt-2 border-t border-[#3d1e13]">
                <span>Total Payable</span>
                <span className="text-[#f7a268]">Rs. {grandTotal.toLocaleString()}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={() => {
                onClose();
                onProceedToCheckout();
              }}
              className="w-full bg-[#e07a3f] hover:bg-[#eb874d] text-white py-3.5 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xl shadow-[#e07a3f]/25 transition-all cursor-pointer active:scale-95"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>
        )}

      </div>
    </div>
  );
};
