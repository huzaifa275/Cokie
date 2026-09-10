import React, { useState } from 'react';
import { MapPin, Phone, Clock, Store, Navigation, MessageSquare, Sparkles, Check } from 'lucide-react';
import { BRANCHES } from '../data/bakeryData';
import { Branch } from '../types';

interface LocationsSectionProps {
  onSelectPickupBranch: (branch: Branch) => void;
}

export const LocationsSection: React.FC<LocationsSectionProps> = ({
  onSelectPickupBranch,
}) => {
  const [activeCity, setActiveCity] = useState<'All' | 'Karachi' | 'Lahore' | 'Islamabad'>('All');
  const [selectedBranch, setSelectedBranch] = useState<Branch>(BRANCHES[0]);

  const filteredBranches = activeCity === 'All'
    ? BRANCHES
    : BRANCHES.filter((b) => b.city === activeCity);

  return (
    <section id="locations" className="py-16 sm:py-24 px-4 sm:px-8 bg-[#180b06] border-t border-[#361c13] relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-[#2d140a] border border-[#4d2516] text-[#f7a268] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3 shadow-inner">
            <MapPin className="w-3.5 h-3.5" />
            <span>Artisan Bakery Boutiques in Pakistan</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-white uppercase tracking-tight">
            Visit Our Bakery Boutiques & Cafés
          </h2>

          <p className="mt-3 text-sm sm:text-base text-[#d1b09d]">
            Experience the intoxicating aroma of freshly baked cookies and brewed Arabica coffee in Karachi, Lahore, and Islamabad.
          </p>

          {/* City Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            {(['All', 'Karachi', 'Lahore', 'Islamabad'] as const).map((city) => (
              <button
                key={city}
                onClick={() => setActiveCity(city)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeCity === city
                    ? 'bg-[#e07a3f] text-white shadow-lg'
                    : 'bg-[#25120a] text-[#bda08f] hover:bg-[#341b10] hover:text-white border border-[#422215]'
                }`}
              >
                {city === 'All' ? 'All Pakistan Branches' : city}
              </button>
            ))}
          </div>
        </div>

        {/* Branches & Interactive Map Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Branch Cards List */}
          <div className="lg:col-span-5 space-y-4">
            {filteredBranches.map((branch) => {
              const isSelected = selectedBranch.id === branch.id;
              return (
                <div
                  key={branch.id}
                  onClick={() => setSelectedBranch(branch)}
                  className={`p-5 rounded-3xl border transition-all cursor-pointer text-left ${
                    isSelected
                      ? 'bg-[#2d150c] border-[#e07a3f] shadow-2xl shadow-[#e07a3f]/10 translate-x-1'
                      : 'bg-[#221008] border-[#3e1f13] hover:bg-[#28130a]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="bg-[#422013] text-[#f7a268] text-[10px] uppercase font-black px-2.5 py-0.5 rounded-full">
                          {branch.city}
                        </span>
                        {branch.hasDineIn && (
                          <span className="text-[10px] text-[#4ade80] font-semibold flex items-center gap-1">
                            <Store className="w-3 h-3" />
                            Dine-in & Cafe
                          </span>
                        )}
                      </div>
                      <h3 className="font-display font-bold text-base sm:text-lg text-white mt-1.5">
                        {branch.name}
                      </h3>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectPickupBranch(branch);
                      }}
                      className="bg-[#e07a3f] hover:bg-[#eb874d] text-white text-[11px] font-bold px-3 py-1.5 rounded-xl shadow cursor-pointer whitespace-nowrap"
                    >
                      Pick Up Here
                    </button>
                  </div>

                  <p className="text-xs text-[#cfaea0] mt-2.5 flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#e07a3f] flex-shrink-0 mt-0.5" />
                    <span>{branch.address}</span>
                  </p>

                  <div className="mt-3 pt-3 border-t border-[#3b1d12] flex flex-wrap items-center justify-between text-xs text-[#a67e69] gap-2">
                    <div className="flex items-center gap-1.5 text-[#e2c5b5]">
                      <Clock className="w-3.5 h-3.5 text-[#f7a268]" />
                      <span>{branch.timing}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <a
                        href={`tel:${branch.phone}`}
                        onClick={(e) => e.stopPropagation()}
                        className="text-[#f7a268] hover:text-white flex items-center gap-1 font-semibold"
                      >
                        <Phone className="w-3 h-3" />
                        <span>{branch.phone}</span>
                      </a>

                      <a
                        href={`https://wa.me/${branch.whatsapp}?text=Hello%20${encodeURIComponent(branch.name)},%20I%20want%20to%20place%20an%20order`}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-[#25D366] hover:underline flex items-center gap-1 font-semibold"
                      >
                        <MessageSquare className="w-3 h-3" />
                        <span>WhatsApp</span>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Map Embed & Highlight View */}
          <div className="lg:col-span-7 bg-[#221008] border border-[#3e1f13] rounded-3xl p-5 sm:p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#361a0f]">
              <div>
                <span className="text-xs font-bold uppercase text-[#e07a3f] tracking-wider">
                  Selected Boutique Location
                </span>
                <h3 className="text-lg sm:text-xl font-display font-black text-white">
                  {selectedBranch.name}
                </h3>
              </div>

              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedBranch.address)}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-[#33170d] hover:bg-[#472213] text-[#f7a268] border border-[#6b351e] px-4 py-2 rounded-xl text-xs font-bold transition-colors"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Open Google Maps</span>
              </a>
            </div>

            {/* Embedded Google Map */}
            <div className="w-full h-80 sm:h-96 rounded-2xl overflow-hidden border border-[#442214] relative bg-[#130703]">
              <iframe
                title={selectedBranch.name}
                src={selectedBranch.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'contrast(1.05) saturate(1.1)' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Branch Perks */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="bg-[#1a0c06] p-3 rounded-xl border border-[#34180d] text-center">
                <span className="text-xs font-bold text-white block">Fresh Baking</span>
                <span className="text-[11px] text-[#a67d67]">Every 45 minutes daily</span>
              </div>
              <div className="bg-[#1a0c06] p-3 rounded-xl border border-[#34180d] text-center">
                <span className="text-xs font-bold text-white block">Takeaway Counter</span>
                <span className="text-[11px] text-[#a67d67]">Ready in {selectedBranch.pickupTime}</span>
              </div>
              <div className="bg-[#1a0c06] p-3 rounded-xl border border-[#34180d] text-center">
                <span className="text-xs font-bold text-white block">Specialty Brews</span>
                <span className="text-[11px] text-[#a67d67]">Espresso & Karak Chai</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
