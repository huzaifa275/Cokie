import React from 'react';
import { Sparkles, Heart, Award, ShieldCheck, Flame, Utensils } from 'lucide-react';
import { bakeryTreatsImg, chocTrayImg } from '../data/bakeryData';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-16 sm:py-24 px-4 sm:px-8 bg-[#211009] border-t border-[#3b1d12] relative overflow-hidden">
      
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#e07a3f]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Imagery Grid */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="rounded-3xl overflow-hidden border border-[#4a2416] shadow-xl aspect-[3/4] bg-[#140703]">
                <img
                  src={bakeryTreatsImg}
                  alt="Artisanal Bakery Selection"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="bg-[#2d150c] p-4 rounded-2xl border border-[#442114] text-center">
                <span className="text-2xl sm:text-3xl font-black text-[#f7a268] block">100%</span>
                <span className="text-xs text-[#d1b09e] font-semibold">Pure Grass-Fed Butter & Desi Ghee</span>
              </div>
            </div>

            <div className="space-y-4 pt-8">
              <div className="bg-[#2d150c] p-4 rounded-2xl border border-[#442114] text-center">
                <span className="text-2xl sm:text-3xl font-black text-[#e07a3f] block">54% - 70%</span>
                <span className="text-xs text-[#d1b09e] font-semibold">Real Belgian Couverture Chocolate</span>
              </div>
              <div className="rounded-3xl overflow-hidden border border-[#4a2416] shadow-xl aspect-[3/4] bg-[#140703]">
                <img
                  src={chocTrayImg}
                  alt="Freshly Baked Cookies"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>

          {/* Right: Narrative Content */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 bg-[#33170c] border border-[#522716] text-[#f7a268] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full">
              <Sparkles className="w-3.5 h-3.5" />
              <span>The Cokie Craft & Story</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-white leading-tight uppercase">
              Born from a Passion for Honest, Pure Baking
            </h2>

            <p className="text-sm sm:text-base text-[#dec2b2] leading-relaxed">
              Founded in Pakistan with a singular obsession: to eliminate artificial compound chocolates, vegetable fats, and artificial flavorings from bakery counters.
            </p>

            <p className="text-sm sm:text-base text-[#c49f8b] leading-relaxed">
              Every single cookie, brownie, and heritage Nan Khatai is made from scratch with genuine New Zealand grass-fed butter, real Madagascar vanilla beans, authentic Belgian couverture, and organic farm desi ghee. We bake in small batches so when your box arrives, you smell the intoxicating warmth of an artisan kitchen.
            </p>

            {/* Core Values / Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3 bg-[#1c0c06] p-3.5 rounded-2xl border border-[#3b1c10]">
                <div className="w-9 h-9 rounded-xl bg-[#e07a3f]/20 text-[#e07a3f] flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">No Preservatives</h4>
                  <p className="text-[11px] text-[#9c7560] mt-0.5">Short shelf life because it is 100% natural</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-[#1c0c06] p-3.5 rounded-2xl border border-[#3b1c10]">
                <div className="w-9 h-9 rounded-xl bg-[#e07a3f]/20 text-[#e07a3f] flex items-center justify-center flex-shrink-0">
                  <Flame className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Warm Doorstep Delivery</h4>
                  <p className="text-[11px] text-[#9c7560] mt-0.5">Insulated thermal bakery packaging</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
