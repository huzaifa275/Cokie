import React, { useState } from 'react';
import { X, Sparkles, Plus, Minus, Check, Gift, Heart, Info, ArrowRight } from 'lucide-react';
import { BAKERY_ITEMS } from '../data/bakeryData';
import { BakeryItem, CartItem } from '../types';

interface CustomBoxBuilderProps {
  isOpen: boolean;
  onClose: () => void;
  onAddBoxToCart: (cartItem: CartItem) => void;
}

export const CustomBoxBuilder: React.FC<CustomBoxBuilderProps> = ({
  isOpen,
  onClose,
  onAddBoxToCart,
}) => {
  const [boxSize, setBoxSize] = useState<4 | 6 | 12>(6);
  const [selectedItems, setSelectedItems] = useState<{ item: BakeryItem; count: number }[]>([]);
  const [giftRibbon, setGiftRibbon] = useState<'Gold' | 'Crimson Red' | 'Classic Brown' | 'Emerald Green'>('Gold');
  const [customNote, setCustomNote] = useState('');
  const [includeGiftWrap, setIncludeGiftWrap] = useState(true);

  if (!isOpen) return null;

  const cookiePool = BAKERY_ITEMS.filter((i) => i.category === 'cookies' || i.category === 'brownies' || i.category === 'traditional');

  const currentTotalSelected = selectedItems.reduce((sum, i) => sum + i.count, 0);
  const remainingSlots = boxSize - currentTotalSelected;

  const getBasePrice = () => {
    return selectedItems.reduce((sum, i) => sum + (i.item.price * i.count), 0);
  };

  const getDiscountRate = (size: number) => {
    if (size === 4) return 0.05; // 5% off
    if (size === 6) return 0.12; // 12% off
    if (size === 12) return 0.20; // 20% off
    return 0;
  };

  const rawPrice = getBasePrice();
  const discountAmount = Math.round(rawPrice * getDiscountRate(boxSize));
  const finalPrice = Math.max(rawPrice - discountAmount, 0);

  const handleAddItem = (item: BakeryItem) => {
    if (remainingSlots <= 0) return;
    const existing = selectedItems.find((s) => s.item.id === item.id);
    if (existing) {
      setSelectedItems(
        selectedItems.map((s) => (s.item.id === item.id ? { ...s, count: s.count + 1 } : s))
      );
    } else {
      setSelectedItems([...selectedItems, { item, count: 1 }]);
    }
  };

  const handleRemoveItem = (itemId: string) => {
    const existing = selectedItems.find((s) => s.item.id === itemId);
    if (!existing) return;
    if (existing.count === 1) {
      setSelectedItems(selectedItems.filter((s) => s.item.id !== itemId));
    } else {
      setSelectedItems(
        selectedItems.map((s) => (s.item.id === itemId ? { ...s, count: s.count - 1 } : s))
      );
    }
  };

  const handleSaveAndAdd = () => {
    if (remainingSlots > 0) return;

    const summaryText = selectedItems.map((s) => `${s.count}x ${s.item.name}`).join(', ');

    const boxAsBakeryItem: BakeryItem = {
      id: `custom-box-${Date.now()}`,
      name: `Custom Baker's Choice Box (${boxSize} Treats)`,
      urduName: `کسٹم گفٹ باکس (${boxSize} عدد)`,
      category: 'cookies',
      price: finalPrice,
      originalPrice: rawPrice,
      description: `Hand-picked assortment: ${summaryText}. Gift Ribbon: ${giftRibbon}.`,
      image: selectedItems[0]?.item.image || BAKERY_ITEMS[0].image,
      badge: 'Signature',
      rating: 5.0,
      reviewsCount: 1,
    };

    const cartItem: CartItem = {
      cartItemId: `box-${Date.now()}`,
      item: boxAsBakeryItem,
      quantity: 1,
      giftBox: includeGiftWrap,
      customNote: customNote.trim() ? customNote : undefined,
      selectedOption: `${boxSize}-Pack Bundle (${giftRibbon} Ribbon)`,
      serveWarm: true,
    };

    onAddBoxToCart(cartItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#23120b] border border-[#522917] rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-[#1a0c06] px-6 py-4 border-b border-[#3d1e13] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#e07a3f]/20 flex items-center justify-center text-[#e07a3f]">
              <Gift className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-display font-black text-white">
                Build Your Custom Baker's Box
              </h2>
              <p className="text-xs text-[#c9a592]">Mix & match your favorite freshly baked cookies, brownies & khatai</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-[#b38e7b] hover:text-white hover:bg-[#341a0f] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {/* Step 1: Select Box Size */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase font-bold text-[#e07a3f] tracking-wider">Step 1: Choose Box Size</span>
              <span className="text-xs text-[#a67d67]">Save up to 20% on larger packs</span>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { size: 4 as const, label: '4 Treats', discount: '5% OFF', desc: 'Mini Taster' },
                { size: 6 as const, label: '6 Treats', discount: '12% OFF', desc: 'Most Popular', popular: true },
                { size: 12 as const, label: '12 Treats', discount: '20% OFF', desc: 'Party & Family Box' },
              ].map((opt) => (
                <button
                  key={opt.size}
                  onClick={() => {
                    setBoxSize(opt.size);
                    setSelectedItems([]);
                  }}
                  className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer relative ${
                    boxSize === opt.size
                      ? 'bg-[#3b1d11] border-[#e07a3f] text-white shadow-lg'
                      : 'bg-[#1e0e08] border-[#381a0e] text-[#c9a997] hover:bg-[#2c150c]'
                  }`}
                >
                  {opt.popular && (
                    <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-[#e07a3f] text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase">
                      Best Value
                    </span>
                  )}
                  <span className="font-bold text-sm block">{opt.label}</span>
                  <span className="text-xs text-[#f7a268] font-semibold block mt-0.5">{opt.discount}</span>
                  <span className="text-[10px] text-[#9c7560] block mt-0.5">{opt.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Slots Fill Progress */}
          <div className="bg-[#1b0b05] border border-[#3b1c10] p-4 rounded-2xl">
            <div className="flex items-center justify-between mb-2 text-xs">
              <span className="font-bold text-white">
                Box Filling: {currentTotalSelected} / {boxSize} Treats Selected
              </span>
              <span className={`font-bold ${remainingSlots === 0 ? 'text-[#22c55e]' : 'text-[#f7a268]'}`}>
                {remainingSlots === 0 ? '✓ Box is Full & Ready!' : `Select ${remainingSlots} more to complete`}
              </span>
            </div>

            <div className="w-full bg-[#2a1309] h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#e07a3f] to-[#f59e0b] h-full transition-all duration-300 rounded-full"
                style={{ width: `${(currentTotalSelected / boxSize) * 100}%` }}
              />
            </div>
          </div>

          {/* Step 2: Available Bakery items to pick */}
          <div>
            <span className="text-xs uppercase font-bold text-[#e07a3f] tracking-wider block mb-3">
              Step 2: Pick Your Treats
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {cookiePool.map((item) => {
                const countInBox = selectedItems.find((s) => s.item.id === item.id)?.count || 0;
                return (
                  <div
                    key={item.id}
                    className={`bg-[#2a140d] border rounded-2xl p-3 flex items-center gap-3 transition-all ${
                      countInBox > 0 ? 'border-[#e07a3f] bg-[#33170f]' : 'border-[#422013]'
                    }`}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-14 h-14 rounded-xl object-cover flex-shrink-0 bg-black"
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-white truncate">{item.name}</h4>
                      <span className="text-xs text-[#f7a268] font-semibold">Rs. {item.price}</span>
                      
                      {/* Counter */}
                      <div className="flex items-center gap-2 mt-1.5">
                        <button
                          disabled={countInBox === 0}
                          onClick={() => handleRemoveItem(item.id)}
                          className="w-6 h-6 rounded-md bg-[#1f0d07] hover:bg-[#422013] text-[#f7a268] disabled:opacity-30 flex items-center justify-center text-xs font-bold"
                        >
                          -
                        </button>
                        <span className="text-xs font-bold text-white min-w-[14px] text-center">
                          {countInBox}
                        </span>
                        <button
                          disabled={remainingSlots <= 0}
                          onClick={() => handleAddItem(item)}
                          className="w-6 h-6 rounded-md bg-[#e07a3f] hover:bg-[#eb874d] text-white disabled:opacity-30 flex items-center justify-center text-xs font-bold"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step 3: Ribbon & Note (Gift Presentation) */}
          <div className="bg-[#1c0c06] p-4 rounded-2xl border border-[#3b1c10] space-y-3">
            <span className="text-xs uppercase font-bold text-[#e07a3f] tracking-wider block">
              Step 3: Luxury Gift Packaging & Satin Ribbon
            </span>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(['Gold', 'Crimson Red', 'Classic Brown', 'Emerald Green'] as const).map((color) => (
                <button
                  key={color}
                  onClick={() => setGiftRibbon(color)}
                  className={`p-2 rounded-xl text-xs font-semibold border transition-all ${
                    giftRibbon === color
                      ? 'bg-[#3b1d11] border-[#e07a3f] text-white'
                      : 'bg-[#25120a] border-[#381a0e] text-[#b89582]'
                  }`}
                >
                  {color} Ribbon
                </button>
              ))}
            </div>

            <div className="pt-2">
              <label className="text-xs text-[#b89582] block mb-1">
                Optional Personalized Greeting Note (Written on bakery card):
              </label>
              <input
                type="text"
                placeholder="e.g. Happy Birthday Sarah! Enjoy the treats - Ali"
                value={customNote}
                onChange={(e) => setCustomNote(e.target.value)}
                maxLength={120}
                className="w-full bg-[#140803] text-white text-xs px-3.5 py-2 rounded-xl border border-[#422013] focus:outline-none focus:border-[#e07a3f]"
              />
            </div>
          </div>

        </div>

        {/* Footer with Price Summary & Action */}
        <div className="bg-[#180b06] p-4 sm:p-6 border-t border-[#3d1e13] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-xs text-[#a67d67] uppercase block font-semibold">Custom Box Total</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-[#f7a268]">
                Rs. {finalPrice.toLocaleString()}
              </span>
              {discountAmount > 0 && (
                <>
                  <span className="text-xs text-[#8f6d5a] line-through">
                    Rs. {rawPrice.toLocaleString()}
                  </span>
                  <span className="text-xs text-[#22c55e] font-bold bg-[#14532d]/40 px-2 py-0.5 rounded-md">
                    Save Rs. {discountAmount}
                  </span>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-1/2 sm:w-auto px-5 py-3 rounded-2xl text-xs font-bold text-[#c49f8b] hover:text-white bg-[#25120a] border border-[#3e1f13]"
            >
              Cancel
            </button>
            <button
              disabled={remainingSlots > 0}
              onClick={handleSaveAndAdd}
              className="w-1/2 sm:w-auto px-7 py-3 rounded-2xl text-xs font-bold text-white bg-[#e07a3f] hover:bg-[#eb874d] disabled:opacity-40 disabled:cursor-not-allowed shadow-lg flex items-center justify-center gap-2"
            >
              <Check className="w-4 h-4" />
              <span>Add Box to Cart</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
