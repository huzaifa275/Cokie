import React, { useState, useEffect, useRef } from 'react';
import { X, Search, Star, ArrowRight, Sparkles } from 'lucide-react';
import { BAKERY_ITEMS } from '../data/bakeryData';
import { BakeryItem } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectItem: (item: BakeryItem) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectItem,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const results = BAKERY_ITEMS.filter((item) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      item.name.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.urduName?.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#23120b] border border-[#522917] rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        
        {/* Search Input Bar */}
        <div className="p-4 bg-[#1a0c06] border-b border-[#3b1c10] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#e07a3f] flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type cookie, brownie, nan khatai, or cake..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-white text-sm sm:text-base focus:outline-none placeholder:text-[#8a6855]"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-[#a67d67] hover:text-white px-2 py-1"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#b38e7b] hover:text-white hover:bg-[#341a0f]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Suggestion Pills */}
        <div className="px-4 py-2 bg-[#1f0e08] border-b border-[#361a0f] flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-[#8a6855] text-[11px] font-bold uppercase whitespace-nowrap">Popular:</span>
          {['Belgian Chocolate', 'Nan Khatai', 'Nutella Lava', 'Brownie', 'Karak Chai'].map((term) => (
            <button
              key={term}
              onClick={() => setQuery(term)}
              className="bg-[#2a140c] hover:bg-[#3d1d12] text-[#d6b7a5] px-2.5 py-1 rounded-lg border border-[#442114] whitespace-nowrap transition-colors"
            >
              {term}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {results.length === 0 ? (
            <div className="text-center py-10 text-[#a8826e] text-xs">
              No baked delicacies match "{query}". Try another keyword.
            </div>
          ) : (
            results.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  onSelectItem(item);
                  onClose();
                }}
                className="bg-[#29130b] hover:bg-[#34190f] border border-[#3e1f13] hover:border-[#63331f] rounded-2xl p-3 flex items-center gap-3.5 transition-all cursor-pointer group"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  referrerPolicy="no-referrer"
                  className="w-14 h-14 rounded-xl object-cover flex-shrink-0 bg-black"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-[#f7a268] transition-colors truncate">
                      {item.name}
                    </h4>
                    <span className="text-xs font-black text-[#f7a268] ml-2 flex-shrink-0">
                      Rs. {item.price.toLocaleString()}
                    </span>
                  </div>
                  
                  <p className="text-[11px] text-[#c7a694] line-clamp-1 mt-0.5">
                    {item.description}
                  </p>

                  <div className="flex items-center gap-3 mt-1 text-[10px] text-[#9c7560]">
                    <span className="flex items-center gap-1 text-[#f59e0b]">
                      <Star className="w-3 h-3 fill-current" />
                      <span>{item.rating}</span>
                    </span>
                    <span>• {item.category.toUpperCase()}</span>
                    {item.isEggless && <span className="text-[#4ade80]">Eggless</span>}
                  </div>
                </div>

                <ArrowRight className="w-4 h-4 text-[#8a6855] group-hover:text-white group-hover:translate-x-0.5 transition-all flex-shrink-0" />
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
