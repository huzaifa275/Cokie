import React, { useState } from 'react';
import { ChevronDown, ArrowRight, Star, Sparkles, Heart } from 'lucide-react';
import { heroCookieImg, chocTrayImg, butterTrayImg, BAKERY_ITEMS } from '../data/bakeryData';
import { BakeryItem } from '../types';

interface HeroSectionProps {
  onExploreMenu: () => void;
  onOrderNow: () => void;
  onSelectItem: (item: BakeryItem) => void;
  onOpenBoxBuilder: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreMenu,
  onOrderNow,
  onSelectItem,
  onOpenBoxBuilder,
}) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
    setMousePos({ x, y });
  };

  const chocolateCookie = BAKERY_ITEMS.find((i) => i.id === 'double-choc-fudge-cookie') || BAKERY_ITEMS[1];
  const butterCookie = BAKERY_ITEMS.find((i) => i.id === 'pistachio-butter-cookie') || BAKERY_ITEMS[2];

  return (
    <section
      id="hero"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePos({ x: 0, y: 0 });
      }}
      className="relative min-h-[92vh] bg-[#23120b] overflow-hidden flex flex-col justify-between pt-8 pb-10 px-4 sm:px-8 border-b border-[#3d1e13]"
      style={{
        backgroundImage: `
          radial-gradient(circle at 50% 45%, #462215 0%, #2a140d 50%, #1a0b06 100%)
        `,
      }}
    >
      {/* Decorative Floating Chocolate Crumbs Background Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        {/* Crumb 1 */}
        <div
          className="absolute top-[18%] left-[12%] w-6 h-5 rounded-full bg-[#180b06] opacity-60 blur-[0.5px] animate-float-crumb shadow-lg"
          style={{ transform: `translate(${mousePos.x * -0.5}px, ${mousePos.y * -0.5}px)` }}
        />
        {/* Crumb 2 */}
        <div
          className="absolute top-[28%] right-[14%] w-8 h-7 rounded-full bg-[#130703] opacity-70 blur-[0.3px] animate-float-crumb-delayed"
          style={{ transform: `translate(${mousePos.x * 0.8}px, ${mousePos.y * 0.8}px)` }}
        />
        {/* Crumb 3 - Chocolate chunk */}
        <div
          className="absolute bottom-[34%] left-[18%] w-5 h-5 bg-[#3a1b10] rounded-sm rotate-45 opacity-65 animate-float-crumb"
          style={{ transform: `translate(${mousePos.x * 0.4}px, ${mousePos.y * 0.4}px)` }}
        />
        {/* Crumb 4 */}
        <div
          className="absolute bottom-[40%] right-[20%] w-7 h-6 rounded-full bg-[#160804] opacity-50 animate-float-crumb-delayed"
          style={{ transform: `translate(${mousePos.x * -0.6}px, ${mousePos.y * -0.6}px)` }}
        />
        {/* Soft Warm Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#e07a3f]/10 blur-[130px] rounded-full pointer-events-none" />
      </div>

      {/* Center Main Stage (COOKIE + Floating Centerpiece) */}
      <div className="relative z-10 max-w-7xl mx-auto w-full my-auto flex flex-col items-center text-center pt-4 sm:pt-8">
        
        {/* Giant Typographic Display with Cookie as a Perfect Round 'O' */}
        <div className="relative w-full flex items-center justify-center select-none px-2">
          <h1
            className="font-display font-black tracking-tight text-white uppercase text-[15vw] sm:text-[16vw] md:text-[14vw] lg:text-[170px] xl:text-[200px] leading-none flex items-center justify-center drop-shadow-[0_15px_30px_rgba(0,0,0,0.7)]"
            style={{
              letterSpacing: '-0.02em',
            }}
          >
            <span>C</span>
            
            {/* The Pure Round Cookie representing 'O' with no extra badges or border overlays */}
            <span className="relative inline-flex items-center justify-center mx-1 sm:mx-2 lg:mx-3 self-center">
              <div
                className="relative flex items-center justify-center transition-transform duration-300 ease-out cursor-pointer group"
                style={{
                  transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px) scale(${isHovered ? 1.04 : 1})`,
                }}
                onClick={() => onSelectItem(BAKERY_ITEMS[0])}
                title="NYC Style Belgian Chocolate Cookie - Click to View"
              >
                {/* Clean round cookie matching letter proportions */}
                <div className="relative w-[13.5vw] h-[13.5vw] sm:w-[14.5vw] sm:h-[14.5vw] md:w-[13vw] md:h-[13vw] lg:w-[155px] lg:h-[155px] xl:w-[185px] xl:h-[185px] rounded-full flex-shrink-0 flex items-center justify-center overflow-hidden">
                  {/* Pure Cookie Image */}
                  <img
                    id="hero-cookie-centerpiece"
                    src={heroCookieImg}
                    alt="Artisanal Belgian Chocolate Chunk Cookie"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover rounded-full shadow-[0_10px_25px_rgba(0,0,0,0.8)] transform transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>
            </span>

            <span>OKIE</span>
          </h1>
        </div>

        {/* Tagline cleanly separated below the COOKIE headline without any overlap */}
        <div className="mt-5 sm:mt-8 md:mt-10 px-4 max-w-3xl">
          <p className="font-display font-extrabold uppercase text-white/95 text-xs sm:text-base md:text-xl lg:text-2xl tracking-[0.16em] sm:tracking-[0.22em] drop-shadow-md text-center">
            FRESHLY BAKED GOODNESS IN EVERY BITE
          </p>
        </div>

        {/* Action Buttons & Quick CTAs */}
        <div className="mt-7 sm:mt-9 flex flex-wrap items-center justify-center gap-4 sm:gap-6 z-20">
          <button
            id="hero-menu-cta-btn"
            onClick={onExploreMenu}
            className="min-w-[140px] sm:min-w-[170px] bg-white hover:bg-[#fcefe8] text-[#23120b] font-display font-extrabold text-sm sm:text-base px-8 py-3.5 rounded-full shadow-2xl transition-all duration-200 transform hover:-translate-y-0.5 active:scale-95 cursor-pointer"
          >
            Menu
          </button>
          
          <button
            id="hero-order-cta-btn"
            onClick={onOrderNow}
            className="min-w-[140px] sm:min-w-[170px] bg-transparent hover:bg-white/10 text-white font-display font-bold text-sm sm:text-base px-8 py-3.5 rounded-full border-2 border-white/70 hover:border-white transition-all duration-200 transform hover:-translate-y-0.5 active:scale-95 cursor-pointer shadow-lg"
          >
            Order Now
          </button>
        </div>

        {/* Social Proof Avatars on the right */}
        <div className="mt-6 sm:mt-7 flex flex-col sm:flex-row items-center gap-3 bg-[#2d160d]/80 border border-[#4a2617] backdrop-blur-sm px-4 py-2 rounded-2xl shadow-xl">
          <div className="flex -space-x-2 overflow-hidden">
            <img
              className="inline-block h-7 w-7 rounded-full ring-2 ring-[#23120b] object-cover"
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces"
              alt="Customer 1"
              referrerPolicy="no-referrer"
            />
            <img
              className="inline-block h-7 w-7 rounded-full ring-2 ring-[#23120b] object-cover"
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces"
              alt="Customer 2"
              referrerPolicy="no-referrer"
            />
            <img
              className="inline-block h-7 w-7 rounded-full ring-2 ring-[#23120b] object-cover"
              src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=faces"
              alt="Customer 3"
              referrerPolicy="no-referrer"
            />
            <img
              className="inline-block h-7 w-7 rounded-full ring-2 ring-[#23120b] object-cover"
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces"
              alt="Customer 4"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="text-left">
            <div className="flex items-center gap-1 text-[#f59e0b]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-current" />
              ))}
              <span className="text-xs font-bold text-white ml-1">4.9 / 5</span>
            </div>
            <p className="text-[11px] text-[#dec2b2] font-medium leading-tight">
              Loved by 25,000+ sweet tooths in Karachi, Lahore & Islamabad
            </p>
          </div>
        </div>

      </div>

      {/* Bottom Row Highlights (Matching exact bottom cards from the design) */}
      <div className="relative z-10 max-w-7xl mx-auto w-full mt-10 grid grid-cols-1 md:grid-cols-3 items-center gap-4 pt-4 border-t border-[#3d1e13]/60">
        
        {/* Left Card: Chocolate Cookie Preview */}
        <div
          onClick={() => onSelectItem(chocolateCookie)}
          className="bg-[#2a150e]/90 hover:bg-[#341b12] border border-[#4a2618] rounded-2xl p-3.5 flex items-center gap-3.5 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group shadow-xl"
        >
          <div className="w-20 h-20 rounded-xl overflow-hidden bg-[#180b06] flex-shrink-0 border border-[#4f2a1a]">
            <img
              src={chocTrayImg}
              alt="Chocolate Cookie"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-white group-hover:text-[#f7a268] transition-colors truncate">
                Chocolate Cookie
              </h4>
              <span className="text-xs font-extrabold text-[#f7a268]">Rs. 480</span>
            </div>
            <p className="text-xs text-[#e2c7b7] font-medium mt-0.5 line-clamp-1">
              Indulge in rich, fudgy perfection
            </p>
            <p className="text-[11px] text-[#a8826e] mt-1 line-clamp-1">
              Rich, Soft, And Packed With Real Chocolate Chunks.
            </p>
          </div>
        </div>

        {/* Center Indicator: Scroll indicator */}
        <div
          onClick={onExploreMenu}
          className="hidden md:flex flex-col items-center justify-center text-center py-2 text-[#d1b09d] hover:text-white transition-colors cursor-pointer group"
        >
          <div className="w-6 h-10 border-2 border-[#633a25] rounded-full flex justify-center pt-1 group-hover:border-[#f7a268] transition-colors">
            <div className="w-1.5 h-2.5 bg-[#e07a3f] rounded-full animate-bounce" />
          </div>
          <span className="text-xs font-semibold mt-2 text-[#c29e8b] group-hover:text-white transition-colors tracking-wide">
            Please Scroll Down For More Information
          </span>
          <ChevronDown className="w-4 h-4 text-[#e07a3f] mt-0.5 group-hover:translate-y-1 transition-transform" />
        </div>

        {/* Right Card: Butter Cookie Preview */}
        <div
          onClick={() => onSelectItem(butterCookie)}
          className="bg-[#2a150e]/90 hover:bg-[#341b12] border border-[#4a2618] rounded-2xl p-3.5 flex items-center gap-3.5 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group shadow-xl"
        >
          <div className="w-20 h-20 rounded-xl overflow-hidden bg-[#180b06] flex-shrink-0 border border-[#4f2a1a]">
            <img
              src={butterTrayImg}
              alt="Butter Cookie"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-white group-hover:text-[#f7a268] transition-colors truncate">
                Butter Cookie
              </h4>
              <span className="text-xs font-extrabold text-[#f7a268]">Rs. 420</span>
            </div>
            <p className="text-xs text-[#e2c7b7] font-medium mt-0.5 line-clamp-1">
              Indulge in melt-in-mouth luxury
            </p>
            <p className="text-[11px] text-[#a8826e] mt-1 line-clamp-1">
              Light, Crisp, And Melt-In-Your-Mouth Buttery Goodness.
            </p>
          </div>
        </div>

      </div>

    </section>
  );
};
