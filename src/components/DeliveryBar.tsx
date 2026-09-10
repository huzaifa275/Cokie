import React from 'react';
import { Bike, Store, Clock, MapPin, Sparkles, Check, Info } from 'lucide-react';
import { CITY_AREAS, BRANCHES } from '../data/bakeryData';
import { Branch } from '../types';

interface DeliveryBarProps {
  orderType: 'delivery' | 'takeaway';
  setOrderType: (type: 'delivery' | 'takeaway') => void;
  selectedCity: 'Karachi' | 'Lahore' | 'Islamabad';
  setSelectedCity: (city: 'Karachi' | 'Lahore' | 'Islamabad') => void;
  selectedArea: string;
  setSelectedArea: (area: string) => void;
  selectedBranch: Branch;
  setSelectedBranch: (branch: Branch) => void;
}

export const DeliveryBar: React.FC<DeliveryBarProps> = ({
  orderType,
  setOrderType,
  selectedCity,
  setSelectedCity,
  selectedArea,
  setSelectedArea,
  selectedBranch,
  setSelectedBranch,
}) => {
  const currentCityAreas = CITY_AREAS[selectedCity] || CITY_AREAS.Karachi;
  const currentCityBranches = BRANCHES.filter((b) => b.city === selectedCity);
  const currentAreaInfo = currentCityAreas.find((a) => a.name === selectedArea) || currentCityAreas[0];

  return (
    <div id="delivery-bar-section" className="bg-[#1a0c07] border-y border-[#3d1e13] py-4 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-4">
        
        {/* Toggle Mode: Delivery vs Store Pickup */}
        <div className="flex items-center gap-2 w-full lg:w-auto">
          <div className="bg-[#26130b] p-1 rounded-2xl border border-[#4a2618] flex w-full sm:w-auto">
            <button
              onClick={() => setOrderType('delivery')}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer ${
                orderType === 'delivery'
                  ? 'bg-[#e07a3f] text-white shadow-lg'
                  : 'text-[#d3b29f] hover:text-white hover:bg-[#341b11]'
              }`}
            >
              <Bike className="w-4 h-4" />
              <span>Doorstep Delivery</span>
            </button>
            
            <button
              onClick={() => setOrderType('takeaway')}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer ${
                orderType === 'takeaway'
                  ? 'bg-[#e07a3f] text-white shadow-lg'
                  : 'text-[#d3b29f] hover:text-white hover:bg-[#341b11]'
              }`}
            >
              <Store className="w-4 h-4" />
              <span>Store Takeaway</span>
            </button>
          </div>
        </div>

        {/* Dynamic Location/Branch selector details */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 w-full lg:w-auto justify-start lg:justify-end text-xs sm:text-sm">
          
          {/* City Selection Buttons */}
          <div className="flex items-center gap-1.5 bg-[#23120b] p-1 rounded-xl border border-[#3e1f14]">
            {(['Karachi', 'Lahore', 'Islamabad'] as const).map((city) => (
              <button
                key={city}
                onClick={() => {
                  setSelectedCity(city);
                  const firstArea = CITY_AREAS[city][0]?.name;
                  if (firstArea) setSelectedArea(firstArea);
                  const firstBranch = BRANCHES.find((b) => b.city === city);
                  if (firstBranch) setSelectedBranch(firstBranch);
                }}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  selectedCity === city
                    ? 'bg-[#4a2818] text-[#f7a268] shadow-sm'
                    : 'text-[#bda08f] hover:text-white'
                }`}
              >
                {city}
              </button>
            ))}
          </div>

          {/* Area or Branch Dropdown */}
          {orderType === 'delivery' ? (
            <div className="flex items-center gap-2 bg-[#25130b] px-3.5 py-2 rounded-xl border border-[#452316] text-[#ead4c7]">
              <MapPin className="w-4 h-4 text-[#e07a3f] flex-shrink-0" />
              <div className="flex flex-col text-left">
                <span className="text-[10px] uppercase font-bold text-[#9e7966]">Deliver To Sector / Area</span>
                <select
                  value={selectedArea}
                  onChange={(e) => setSelectedArea(e.target.value)}
                  className="bg-transparent text-white font-semibold text-xs focus:outline-none cursor-pointer pr-4"
                >
                  {currentCityAreas.map((area) => (
                    <option key={area.name} value={area.name} className="bg-[#23120b] text-white">
                      {area.name} (Rs. {area.deliveryFee})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 bg-[#25130b] px-3.5 py-2 rounded-xl border border-[#452316] text-[#ead4c7]">
              <Store className="w-4 h-4 text-[#e07a3f] flex-shrink-0" />
              <div className="flex flex-col text-left">
                <span className="text-[10px] uppercase font-bold text-[#9e7966]">Pickup Branch</span>
                <select
                  value={selectedBranch.id}
                  onChange={(e) => {
                    const b = BRANCHES.find((item) => item.id === e.target.value);
                    if (b) setSelectedBranch(b);
                  }}
                  className="bg-transparent text-white font-semibold text-xs focus:outline-none cursor-pointer pr-4"
                >
                  {currentCityBranches.map((branch) => (
                    <option key={branch.id} value={branch.id} className="bg-[#23120b] text-white">
                      {branch.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Timing & Fee Pill */}
          <div className="flex items-center gap-2 bg-[#2e170f] px-3 py-2 rounded-xl border border-[#4a2818] text-[#f7a268]">
            <Clock className="w-4 h-4" />
            <div className="text-left text-xs">
              <span className="font-bold text-white">
                {orderType === 'delivery' ? currentAreaInfo.estTime : selectedBranch.pickupTime}
              </span>
              <span className="text-[11px] text-[#cca995] block">
                {orderType === 'delivery' ? `Fee: Rs. ${currentAreaInfo.deliveryFee}` : 'Pickup Ready'}
              </span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
