import React, { useState } from 'react';
import { X, Star, Sparkles, Check, Flame, Clock, Heart, ShieldCheck, Gift, Info } from 'lucide-react';
import { BakeryItem, CartItem } from '../types';

interface ItemDetailModalProps {
  item: BakeryItem | null;
  onClose: () => void;
  onAddToCart: (cartItem: CartItem) => void;
}

export const ItemDetailModal: React.FC<ItemDetailModalProps> = ({
  item,
  onClose,
  onAddToCart,
}) => {
  if (!item) return null;

  const [quantity, setQuantity] = useState(1);
  const [selectedOption, setSelectedOption] = useState<string | undefined>(
    item.options?.[0]?.choices?.[0]?.label
  );
  const [serveWarm, setServeWarm] = useState(true);
  const [giftBox, setGiftBox] = useState(false);
  const [customNote, setCustomNote] = useState('');
  const [justAdded, setJustAdded] = useState(false);

  // Calculate extra cost from choices if any
  let extraPrice = 0;
  if (item.options && selectedOption) {
    for (const opt of item.options) {
      const match = opt.choices.find((c) => c.label === selectedOption);
      if (match?.extraPrice) {
        extraPrice += match.extraPrice;
      }
    }
  }

  const unitPrice = item.price + extraPrice;
  const totalPrice = unitPrice * quantity;

  const handleAdd = () => {
    const cartItem: CartItem = {
      cartItemId: `${item.id}-${Date.now()}`,
      item,
      quantity,
      selectedOption,
      customNote: customNote.trim() ? customNote : undefined,
      serveWarm,
      giftBox,
    };
    onAddToCart(cartItem);
    setJustAdded(true);
    setTimeout(() => {
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#23120b] border border-[#542a17] rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Image Banner */}
        <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full bg-[#180b06] overflow-hidden flex-shrink-0">
          <img
            src={item.image}
            alt={item.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#23120b] via-transparent to-black/30" />
          
          {item.badge && (
            <span className="absolute top-4 left-4 bg-[#e07a3f] text-white text-xs font-black uppercase px-3 py-1 rounded-full shadow-lg border border-white/20">
              {item.badge}
            </span>
          )}

          <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
            <div>
              {item.urduName && (
                <span className="text-xs font-serif text-[#f7a268] block">{item.urduName}</span>
              )}
              <h2 className="text-xl sm:text-2xl font-display font-black text-white">{item.name}</h2>
            </div>
            <div className="text-right">
              <span className="text-xl sm:text-2xl font-black text-[#f7a268]">
                Rs. {item.price.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          
          {/* Rating, Calories, Badges */}
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <div className="flex items-center gap-1 bg-[#32170d] px-2.5 py-1 rounded-xl text-[#f59e0b] font-bold border border-[#4d2516]">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>{item.rating}</span>
              <span className="text-white/60 font-normal">({item.reviewsCount} customer reviews)</span>
            </div>

            {item.calories && (
              <div className="flex items-center gap-1 bg-[#32170d] px-2.5 py-1 rounded-xl text-[#d4b4a1] border border-[#4d2516]">
                <Flame className="w-3.5 h-3.5 text-[#e07a3f]" />
                <span>{item.calories}</span>
              </div>
            )}

            {item.isEggless && (
              <div className="flex items-center gap-1 bg-[#14532d]/40 text-[#4ade80] px-2.5 py-1 rounded-xl border border-[#166534]">
                <Check className="w-3.5 h-3.5" />
                <span>100% Eggless (سبزی خور)</span>
              </div>
            )}
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-[#dec2b2] leading-relaxed">
            {item.description}
          </p>

          {/* Ingredients list */}
          {item.ingredients && item.ingredients.length > 0 && (
            <div className="bg-[#1b0b05] p-3.5 rounded-2xl border border-[#3e1d10]">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#e07a3f] block mb-2">
                Premium Pure Ingredients
              </span>
              <div className="flex flex-wrap gap-1.5">
                {item.ingredients.map((ing, idx) => (
                  <span
                    key={idx}
                    className="bg-[#2d140a] text-[#ecd3c4] text-[11px] px-2.5 py-1 rounded-lg border border-[#452011]"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Heating & Serving Tips */}
          <div className="bg-[#29140c] p-3.5 rounded-2xl border border-[#472213] flex items-start gap-3">
            <Flame className="w-4 h-4 text-[#f7a268] flex-shrink-0 mt-0.5" />
            <div className="text-xs text-[#d1b09d]">
              <span className="font-bold text-white block">Baker's Serving Tip:</span>
              Warm in microwave for 10-12 seconds or oven at 160°C for 2 minutes for molten gooey chocolate bliss.
            </div>
          </div>

          {/* Options & Variations */}
          {item.options?.map((opt, i) => (
            <div key={i} className="space-y-2">
              <span className="text-xs font-bold text-white uppercase tracking-wider">{opt.name}</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {opt.choices.map((choice) => (
                  <button
                    key={choice.label}
                    onClick={() => setSelectedOption(choice.label)}
                    className={`p-2.5 rounded-xl text-xs font-semibold text-left border flex items-center justify-between transition-all ${
                      selectedOption === choice.label
                        ? 'bg-[#3d1e11] border-[#e07a3f] text-white'
                        : 'bg-[#1e0e08] border-[#381a0e] text-[#c9a794] hover:bg-[#2c140c]'
                    }`}
                  >
                    <span>{choice.label}</span>
                    {choice.extraPrice ? (
                      <span className="text-[#f7a268] font-bold">+Rs. {choice.extraPrice}</span>
                    ) : null}
                  </button>
                ))}
              </div>
            </div>
          ))}

          {/* Temperature & Packaging Toggles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <label className="flex items-center gap-2.5 bg-[#1b0b05] p-3 rounded-xl border border-[#3b1b0e] cursor-pointer hover:bg-[#251007]">
              <input
                type="checkbox"
                checked={serveWarm}
                onChange={(e) => setServeWarm(e.target.checked)}
                className="w-4 h-4 accent-[#e07a3f] rounded"
              />
              <span className="text-xs text-[#e0c6b6] font-medium">Warm out of oven (Ready to eat)</span>
            </label>

            <label className="flex items-center gap-2.5 bg-[#1b0b05] p-3 rounded-xl border border-[#3b1b0e] cursor-pointer hover:bg-[#251007]">
              <input
                type="checkbox"
                checked={giftBox}
                onChange={(e) => setGiftBox(e.target.checked)}
                className="w-4 h-4 accent-[#e07a3f] rounded"
              />
              <span className="text-xs text-[#e0c6b6] font-medium">Luxury Gift Bag + Bakery Ribbon</span>
            </label>
          </div>

          {/* Custom Instruction / Note */}
          <div>
            <label className="text-xs text-[#a8826e] font-bold block mb-1">
              Special Baker Instructions (Optional):
            </label>
            <input
              type="text"
              placeholder="e.g. Extra napkins, no cutlery, or message on tag"
              value={customNote}
              onChange={(e) => setCustomNote(e.target.value)}
              className="w-full bg-[#170904] text-white text-xs px-3.5 py-2.5 rounded-xl border border-[#3d1e13] focus:outline-none focus:border-[#e07a3f]"
            />
          </div>

        </div>

        {/* Footer with Quantity and Add Button */}
        <div className="bg-[#180b06] p-4 sm:p-5 border-t border-[#3d1e13] flex items-center justify-between gap-4">
          
          {/* Quantity selector */}
          <div className="flex items-center bg-[#28130a] rounded-2xl border border-[#4a2618] p-1">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-8 h-8 rounded-xl bg-[#1d0c06] hover:bg-[#381a0e] text-[#f7a268] font-black text-sm flex items-center justify-center transition-colors"
            >
              -
            </button>
            <span className="w-9 text-center text-sm font-black text-white">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 rounded-xl bg-[#e07a3f] hover:bg-[#eb874d] text-white font-black text-sm flex items-center justify-center transition-colors"
            >
              +
            </button>
          </div>

          {/* Total & Action */}
          <button
            onClick={handleAdd}
            className={`flex-1 max-w-sm py-3.5 px-6 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-between transition-all cursor-pointer ${
              justAdded
                ? 'bg-[#15803d] text-white'
                : 'bg-[#e07a3f] hover:bg-[#eb874d] text-white shadow-xl shadow-[#e07a3f]/25 active:scale-95'
            }`}
          >
            <span>{justAdded ? 'Added to Cart!' : 'Add to Order'}</span>
            <span className="font-extrabold text-white">Rs. {totalPrice.toLocaleString()}</span>
          </button>

        </div>

      </div>
    </div>
  );
};
