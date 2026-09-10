import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  Cookie, 
  Flame, 
  Cake, 
  Award, 
  UtensilsCrossed, 
  Coffee, 
  Star, 
  Plus, 
  Check, 
  Info, 
  SlidersHorizontal,
  Flame as HotIcon,
  Heart
} from 'lucide-react';
import { CATEGORIES, BAKERY_ITEMS } from '../data/bakeryData';
import { BakeryItem, CategoryId } from '../types';

interface MenuSectionProps {
  onSelectItem: (item: BakeryItem) => void;
  onQuickAddToCart: (item: BakeryItem) => void;
  onOpenBoxBuilder: () => void;
  selectedCity: string;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  onSelectItem,
  onQuickAddToCart,
  onOpenBoxBuilder,
  selectedCity,
}) => {
  const [activeCategory, setActiveCategory] = useState<CategoryId>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [egglessOnly, setEgglessOnly] = useState(false);
  const [bestSellersOnly, setBestSellersOnly] = useState(false);
  const [addedItemAnimation, setAddedItemAnimation] = useState<string | null>(null);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cookie': return <Cookie className="w-4 h-4" />;
      case 'Flame': return <Flame className="w-4 h-4" />;
      case 'Cake': return <Cake className="w-4 h-4" />;
      case 'Award': return <Award className="w-4 h-4" />;
      case 'UtensilsCrossed': return <UtensilsCrossed className="w-4 h-4" />;
      case 'Coffee': return <Coffee className="w-4 h-4" />;
      default: return <Sparkles className="w-4 h-4" />;
    }
  };

  const filteredItems = useMemo(() => {
    return BAKERY_ITEMS.filter((item) => {
      // Category match
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }
      // Dietary / preference filter
      if (egglessOnly && !item.isEggless) {
        return false;
      }
      if (bestSellersOnly && item.badge !== 'Best Seller') {
        return false;
      }
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = item.name.toLowerCase().includes(q);
        const matchDesc = item.description.toLowerCase().includes(q);
        const matchUrdu = item.urduName?.toLowerCase().includes(q);
        if (!matchName && !matchDesc && !matchUrdu) return false;
      }
      return true;
    });
  }, [activeCategory, egglessOnly, bestSellersOnly, searchQuery]);

  const handleAdd = (item: BakeryItem, e: React.MouseEvent) => {
    e.stopPropagation();
    onQuickAddToCart(item);
    setAddedItemAnimation(item.id);
    setTimeout(() => {
      setAddedItemAnimation(null);
    }, 1000);
  };

  return (
    <section id="menu" className="py-16 sm:py-24 px-4 sm:px-8 bg-[#1f100a] relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-[#33180d] border border-[#522917] text-[#f7a268] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3 shadow-inner">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Online Bakery Menu • {selectedCity}</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-white uppercase tracking-tight">
            Handcrafted with Belgian Chocolate & Pure Butter
          </h2>
          
          <p className="mt-3 text-sm sm:text-base text-[#d8b8a5] leading-relaxed">
            Baked in small batches throughout the day. Order for instant warm doorstep delivery or pick up at your nearest boutique.
          </p>

          {/* Banner for Custom Baker's Box */}
          <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-3 bg-gradient-to-r from-[#3e1d10] via-[#592714] to-[#3e1d10] p-1.5 sm:p-2 pr-4 rounded-2xl border border-[#7a391d] shadow-lg">
            <span className="bg-[#e07a3f] text-white text-xs font-black uppercase px-3 py-1 rounded-xl shadow">
              PROMO BUNDLE
            </span>
            <span className="text-xs sm:text-sm text-[#f8e4d8] font-medium">
              Want to mix & match 4, 6 or 12 treats with a custom gift box?
            </span>
            <button
              onClick={onOpenBoxBuilder}
              className="text-xs font-bold text-white bg-[#23120b] hover:bg-black px-3 py-1 rounded-xl border border-[#7a391d] transition-colors cursor-pointer"
            >
              Build Box →
            </button>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-4 scrollbar-none no-scrollbar mb-8 justify-start lg:justify-center">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all duration-200 cursor-pointer flex-shrink-0 ${
                  isActive
                    ? 'bg-[#e07a3f] text-white shadow-lg shadow-[#e07a3f]/25 scale-105'
                    : 'bg-[#29140c] text-[#d6b7a5] hover:bg-[#381c11] hover:text-white border border-[#452316]'
                }`}
              >
                {getCategoryIcon(cat.icon)}
                <span>{cat.name}</span>
                <span className="text-[10px] opacity-75 font-normal ml-0.5">({cat.urdu})</span>
              </button>
            );
          })}
        </div>

        {/* Search & Dietary Filters Bar */}
        <div className="bg-[#26130b] border border-[#422115] rounded-2xl p-3 sm:p-4 mb-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Search Bar */}
          <div className="w-full sm:w-80 relative">
            <input
              type="text"
              placeholder="Search cookies, brownies, cakes, chai..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1b0c06] text-white text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-[#472417] focus:outline-none focus:border-[#e07a3f] placeholder:text-[#8f6d5a]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#b08b76] hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Dietary Checkboxes */}
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto text-xs font-semibold text-[#ddc2b2]">
            <button
              onClick={() => setEgglessOnly(!egglessOnly)}
              className={`px-3 py-1.5 rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 ${
                egglessOnly
                  ? 'bg-[#4a2818] border-[#e07a3f] text-[#f7a268]'
                  : 'bg-[#1e0e08] border-[#3d1e13] text-[#c9a794] hover:text-white'
              }`}
            >
              <div className={`w-3 h-3 rounded-full border ${egglessOnly ? 'bg-[#22c55e] border-[#22c55e]' : 'border-gray-500'}`} />
              <span>Eggless Only (سبزی خور)</span>
            </button>

            <button
              onClick={() => setBestSellersOnly(!bestSellersOnly)}
              className={`px-3 py-1.5 rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 ${
                bestSellersOnly
                  ? 'bg-[#4a2818] border-[#e07a3f] text-[#f7a268]'
                  : 'bg-[#1e0e08] border-[#3d1e13] text-[#c9a794] hover:text-white'
              }`}
            >
              <Star className={`w-3.5 h-3.5 ${bestSellersOnly ? 'text-[#f59e0b] fill-current' : 'text-gray-400'}`} />
              <span>Best Sellers</span>
            </button>
          </div>

        </div>

        {/* Menu Grid Items */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-[#26130b] rounded-3xl border border-[#3e1f13] p-8">
            <Cookie className="w-12 h-12 text-[#996f59] mx-auto mb-3 animate-pulse" />
            <h3 className="text-lg font-bold text-white">No baked treats found</h3>
            <p className="text-xs text-[#b89582] mt-1">Try resetting filters or searching another keyword like "Belgian" or "Cookie".</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
                setEgglessOnly(false);
                setBestSellersOnly(false);
              }}
              className="mt-4 bg-[#e07a3f] text-white px-5 py-2 rounded-xl text-xs font-bold hover:bg-[#eb874d]"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => {
              const isAdded = addedItemAnimation === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => onSelectItem(item)}
                  className="group bg-[#28140c] hover:bg-[#32190f] border border-[#442315] hover:border-[#6b351e] rounded-3xl overflow-hidden flex flex-col justify-between transition-all duration-300 transform hover:-translate-y-1.5 shadow-xl cursor-pointer"
                >
                  {/* Top Image & Badges */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#180b06]">
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Badge Pill */}
                    {item.badge && (
                      <span className="absolute top-3 left-3 bg-[#e07a3f] text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md border border-white/20">
                        {item.badge}
                      </span>
                    )}

                    {/* Eggless / Vegetarian Tag */}
                    {item.isEggless && (
                      <span className="absolute top-3 right-3 bg-[#15803d]/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 backdrop-blur-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-white inline-block" />
                        Eggless
                      </span>
                    )}

                    {/* Quick Rating overlay */}
                    <div className="absolute bottom-2.5 left-3 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-lg flex items-center gap-1 text-[#f59e0b] text-[11px] font-bold">
                      <Star className="w-3 h-3 fill-current" />
                      <span>{item.rating}</span>
                      <span className="text-white/70 font-normal">({item.reviewsCount})</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {item.urduName && (
                        <span className="text-[11px] font-medium text-[#c49a83] block text-right font-serif">
                          {item.urduName}
                        </span>
                      )}
                      
                      <h3 className="font-display font-bold text-base text-white group-hover:text-[#f7a268] transition-colors line-clamp-1">
                        {item.name}
                      </h3>

                      <p className="mt-1.5 text-xs text-[#d1b19e] line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Price & Add to Cart Button */}
                    <div className="mt-4 pt-3 border-t border-[#3d1e13] flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-[#9c7662] uppercase block font-semibold">Price</span>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-base sm:text-lg font-black text-[#f7a268]">
                            Rs. {item.price.toLocaleString()}
                          </span>
                          {item.originalPrice && (
                            <span className="text-xs text-[#8f6d5a] line-through">
                              Rs. {item.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>

                      <button
                        id={`add-cart-${item.id}`}
                        onClick={(e) => handleAdd(item, e)}
                        className={`p-2.5 sm:px-4 sm:py-2.5 rounded-2xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                          isAdded
                            ? 'bg-[#15803d] text-white scale-105'
                            : 'bg-[#e07a3f] hover:bg-[#ea874d] text-white shadow-md active:scale-95'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span className="hidden sm:inline">Added!</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-4 h-4" />
                            <span className="hidden sm:inline">Add</span>
                          </>
                        )}
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
