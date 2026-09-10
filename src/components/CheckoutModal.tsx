import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Phone, 
  User, 
  Bike, 
  Store, 
  CreditCard, 
  Wallet, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { CartItem, OrderType, Branch, DeliveryDetails, TakeawayDetails, PaymentMethod, Order } from '../types';
import { CITY_AREAS, BRANCHES, PROMO_CODES } from '../data/bakeryData';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  orderType: OrderType;
  setOrderType: (type: OrderType) => void;
  selectedCity: 'Karachi' | 'Lahore' | 'Islamabad';
  selectedArea: string;
  selectedBranch: Branch;
  appliedPromo: string;
  onOrderPlaced: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  orderType,
  setOrderType,
  selectedCity,
  selectedArea,
  selectedBranch,
  appliedPromo,
  onOrderPlaced,
}) => {
  // Form State
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('03');
  const [email, setEmail] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [landmark, setLandmark] = useState('');
  const [instructions, setInstructions] = useState('');
  const [deliveryTiming, setDeliveryTiming] = useState<'asap' | 'scheduled'>('asap');
  const [scheduledTime, setScheduledTime] = useState('Today, 7:00 PM');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!fullName.trim()) {
      setErrorMsg('Please enter your full name');
      return;
    }

    // Pakistani phone validation (03XX XXXXXXX or +923XXXXXXXXX)
    const cleanPhone = phone.replace(/[\s-]/g, '');
    if (cleanPhone.length < 11) {
      setErrorMsg('Please enter a valid Pakistani phone number (e.g. 0300 1234567)');
      return;
    }

    if (orderType === 'delivery' && !streetAddress.trim()) {
      setErrorMsg('Please provide your complete street address & house/flat number');
      return;
    }

    setSubmitting(true);

    const orderNumber = `CK-${Math.floor(100000 + Math.random() * 900000)}`;

    const deliveryDetails: DeliveryDetails | undefined = orderType === 'delivery' ? {
      fullName,
      phone,
      email,
      city: selectedCity,
      area: selectedArea,
      streetAddress,
      landmark: landmark.trim() ? landmark : undefined,
      instructions: instructions.trim() ? instructions : undefined,
      deliveryTime: deliveryTiming,
      scheduledTime: deliveryTiming === 'scheduled' ? scheduledTime : undefined,
    } : undefined;

    const takeawayDetails: TakeawayDetails | undefined = orderType === 'takeaway' ? {
      fullName,
      phone,
      branchId: selectedBranch.id,
      pickupTime: deliveryTiming,
      scheduledTime: deliveryTiming === 'scheduled' ? scheduledTime : undefined,
    } : undefined;

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber,
      orderType,
      items: [...cartItems],
      subtotal,
      deliveryFee,
      discount,
      appliedPromo: appliedPromo || undefined,
      total: grandTotal,
      deliveryDetails,
      takeawayDetails,
      paymentMethod,
      status: 'placed',
      placedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      estimatedTime: orderType === 'delivery' ? '30-40 mins' : '15-20 mins',
      riderName: orderType === 'delivery' ? 'Muhammad Rizwan (Speedy Rider)' : undefined,
      riderPhone: orderType === 'delivery' ? '+92 321 9876543' : undefined,
    };

    setTimeout(() => {
      setSubmitting(false);
      onOrderPlaced(newOrder);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#23120b] border border-[#542a17] rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[94vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-[#1a0c06] px-6 py-4 border-b border-[#3b1c10] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#e07a3f] text-white flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-display font-black text-white">
                Finalize Your Bakery Order
              </h2>
              <p className="text-xs text-[#b89582]">{selectedCity} Branch • {cartItems.length} items</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-[#b38e7b] hover:text-white hover:bg-[#341a0f] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {errorMsg && (
            <div className="bg-[#7f1d1d]/40 border border-[#ef4444] text-[#fca5a5] p-3 rounded-xl text-xs font-semibold">
              {errorMsg}
            </div>
          )}

          {/* Delivery vs Takeaway Switcher */}
          <div className="flex bg-[#180b05] p-1.5 rounded-2xl border border-[#3d1e13]">
            <button
              type="button"
              onClick={() => setOrderType('delivery')}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                orderType === 'delivery'
                  ? 'bg-[#e07a3f] text-white shadow'
                  : 'text-[#be9c8b] hover:text-white'
              }`}
            >
              <Bike className="w-4 h-4" />
              <span>Doorstep Delivery ({selectedCity})</span>
            </button>
            <button
              type="button"
              onClick={() => setOrderType('takeaway')}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                orderType === 'takeaway'
                  ? 'bg-[#e07a3f] text-white shadow'
                  : 'text-[#be9c8b] hover:text-white'
              }`}
            >
              <Store className="w-4 h-4" />
              <span>Store Pickup ({selectedBranch.name})</span>
            </button>
          </div>

          {/* Customer Personal Details */}
          <div className="space-y-3">
            <span className="text-xs uppercase font-bold text-[#e07a3f] tracking-wider block">
              1. Customer Information
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-[#c29f8c] block mb-1 font-semibold">Full Name *</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="e.g. Areeba Khan"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-[#180b06] text-white text-xs px-3.5 py-2.5 rounded-xl border border-[#422013] focus:outline-none focus:border-[#e07a3f] pl-9"
                  />
                  <User className="w-4 h-4 text-[#8f6d5a] absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div>
                <label className="text-xs text-[#c29f8c] block mb-1 font-semibold">Pakistani Mobile / WhatsApp *</label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    placeholder="0300 1234567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#180b06] text-white text-xs px-3.5 py-2.5 rounded-xl border border-[#422013] focus:outline-none focus:border-[#e07a3f] pl-9"
                  />
                  <Phone className="w-4 h-4 text-[#8f6d5a] absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>
            </div>
          </div>

          {/* Address if Delivery or Branch Confirmation if Takeaway */}
          {orderType === 'delivery' ? (
            <div className="space-y-3">
              <span className="text-xs uppercase font-bold text-[#e07a3f] tracking-wider block">
                2. Delivery Destination ({selectedCity} - {selectedArea})
              </span>

              <div>
                <label className="text-xs text-[#c29f8c] block mb-1 font-semibold">
                  House / Apartment #, Street & Building *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. House 42-B, Street 14, Phase 5"
                  value={streetAddress}
                  onChange={(e) => setStreetAddress(e.target.value)}
                  className="w-full bg-[#180b06] text-white text-xs px-3.5 py-2.5 rounded-xl border border-[#422013] focus:outline-none focus:border-[#e07a3f]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-[#c29f8c] block mb-1 font-semibold">
                    Nearest Landmark (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Near Shell Pump / Saba Commercial"
                    value={landmark}
                    onChange={(e) => setLandmark(e.target.value)}
                    className="w-full bg-[#180b06] text-white text-xs px-3.5 py-2.5 rounded-xl border border-[#422013] focus:outline-none focus:border-[#e07a3f]"
                  />
                </div>

                <div>
                  <label className="text-xs text-[#c29f8c] block mb-1 font-semibold">
                    Rider Delivery Timing
                  </label>
                  <select
                    value={deliveryTiming}
                    onChange={(e) => setDeliveryTiming(e.target.value as any)}
                    className="w-full bg-[#180b06] text-white text-xs px-3.5 py-2.5 rounded-xl border border-[#422013] focus:outline-none focus:border-[#e07a3f]"
                  >
                    <option value="asap">⚡ ASAP (Fresh Out of Oven in 30-40 mins)</option>
                    <option value="scheduled">🕒 Schedule for Later Today / Evening</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs text-[#c29f8c] block mb-1 font-semibold">
                  Delivery Notes / Ring Bell Instructions
                </label>
                <input
                  type="text"
                  placeholder="e.g. Please leave at reception or call on arrival"
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  className="w-full bg-[#180b06] text-white text-xs px-3.5 py-2.5 rounded-xl border border-[#422013] focus:outline-none focus:border-[#e07a3f]"
                />
              </div>
            </div>
          ) : (
            <div className="bg-[#1b0b05] p-4 rounded-2xl border border-[#3e1e12] space-y-2">
              <span className="text-xs uppercase font-bold text-[#e07a3f] tracking-wider block">
                2. Takeaway Pickup Location
              </span>
              <h4 className="font-bold text-sm text-white">{selectedBranch.name}</h4>
              <p className="text-xs text-[#c7a492]">{selectedBranch.address}</p>
              <div className="flex items-center gap-4 text-xs text-[#f7a268] pt-1">
                <span>⏱ Ready in {selectedBranch.pickupTime}</span>
                <span>📞 {selectedBranch.phone}</span>
              </div>
            </div>
          )}

          {/* Payment Method in Pakistan */}
          <div className="space-y-3">
            <span className="text-xs uppercase font-bold text-[#e07a3f] tracking-wider block">
              3. Payment Method
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[
                { id: 'cod' as const, name: 'Cash on Delivery (COD)', desc: 'Pay cash when your warm box arrives', icon: Wallet },
                { id: 'jazzcash' as const, name: 'JazzCash Mobile Account', desc: 'Instant transfer via 0300-XXXXXXX', icon: Phone },
                { id: 'easypaisa' as const, name: 'EasyPaisa Wallet', desc: 'Scan QR or mobile payment', icon: Phone },
                { id: 'nayapay' as const, name: 'NayaPay / SadaPay', desc: 'Instant fast payment', icon: Sparkles },
                { id: 'card' as const, name: 'Debit / Credit Card', desc: 'Visa, Mastercard & PayPak', icon: CreditCard },
              ].map((p) => {
                const Icon = p.icon;
                return (
                  <button
                    type="button"
                    key={p.id}
                    onClick={() => setPaymentMethod(p.id)}
                    className={`p-3 rounded-2xl text-left border flex items-start gap-3 transition-all cursor-pointer ${
                      paymentMethod === p.id
                        ? 'bg-[#3b1d11] border-[#e07a3f] text-white shadow-md'
                        : 'bg-[#180b06] border-[#381a0e] text-[#bda08f] hover:bg-[#28130a]'
                    }`}
                  >
                    <Icon className="w-4 h-4 text-[#e07a3f] flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-bold text-white block">{p.name}</span>
                      <span className="text-[11px] text-[#9c7865] block">{p.desc}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Order Summary & Halal Guarantee */}
          <div className="bg-[#190b05] p-4 rounded-2xl border border-[#3a1b0f] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-[#38a169]">
              <ShieldCheck className="w-4 h-4 flex-shrink-0" />
              <span>100% Halal Certified • Freshly Baked with Pure Butter</span>
            </div>

            <div className="text-right w-full sm:w-auto">
              <span className="text-[11px] text-[#a8826e] uppercase block">Total Amount</span>
              <span className="text-xl font-black text-[#f7a268]">
                Rs. {grandTotal.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 rounded-2xl text-xs font-bold text-[#c49f8b] hover:text-white bg-[#25120a] border border-[#3e1f13]"
            >
              Back to Bag
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-8 py-3.5 rounded-2xl text-xs sm:text-sm font-black text-white bg-[#e07a3f] hover:bg-[#eb874d] shadow-xl shadow-[#e07a3f]/30 flex items-center gap-2 disabled:opacity-50 active:scale-95 cursor-pointer"
            >
              {submitting ? (
                <span>Sending to Bakery Oven...</span>
              ) : (
                <>
                  <span>Confirm & Place Order</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
