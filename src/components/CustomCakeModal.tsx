import React, { useState } from 'react';
import { X, Cake, Calendar, Sparkles, MessageSquare, Check, Phone } from 'lucide-react';

interface CustomCakeModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCity: string;
}

export const CustomCakeModal: React.FC<CustomCakeModalProps> = ({
  isOpen,
  onClose,
  selectedCity,
}) => {
  const [occasion, setOccasion] = useState('Birthday Celebration');
  const [flavor, setFlavor] = useState('Belgian Dark Chocolate Silk');
  const [size, setSize] = useState('3 lbs (Serves 10-12)');
  const [customMsg, setCustomMsg] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const message = `*Custom Cake Booking Inquiry - Cokie Bakery Pakistan*%0A%0A*Name:* ${clientName}%0A*Phone:* ${clientPhone}%0A*City:* ${selectedCity}%0A*Occasion:* ${occasion}%0A*Flavor:* ${flavor}%0A*Size/Weight:* ${size}%0A*Required Date:* ${deliveryDate}%0A*Message/Theme:* ${customMsg || 'Standard luxury gold piping'}`;

    setTimeout(() => {
      window.open(`https://wa.me/923001234567?text=${message}`, '_blank');
      onClose();
      setSubmitted(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#23120b] border border-[#522917] rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-[#1a0c06] px-6 py-4 border-b border-[#3b1c10] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#e07a3f] text-white flex items-center justify-center font-bold">
              <Cake className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-display font-black text-white">
                Bespoke Artisanal Cake & Event Booking
              </h2>
              <p className="text-xs text-[#b89582]">Customized by Master Pastry Chefs in {selectedCity}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-[#b38e7b] hover:text-white hover:bg-[#341a0f] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 text-xs">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[#c29f8c] block mb-1 font-semibold">Your Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Fatima Ali"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full bg-[#180b06] text-white text-xs px-3.5 py-2.5 rounded-xl border border-[#422013] focus:outline-none focus:border-[#e07a3f]"
              />
            </div>

            <div>
              <label className="text-[#c29f8c] block mb-1 font-semibold">Pakistani Mobile / WhatsApp *</label>
              <input
                type="tel"
                required
                placeholder="0300 1234567"
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                className="w-full bg-[#180b06] text-white text-xs px-3.5 py-2.5 rounded-xl border border-[#422013] focus:outline-none focus:border-[#e07a3f]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[#c29f8c] block mb-1 font-semibold">Occasion</label>
              <select
                value={occasion}
                onChange={(e) => setOccasion(e.target.value)}
                className="w-full bg-[#180b06] text-white text-xs px-3.5 py-2.5 rounded-xl border border-[#422013] focus:outline-none focus:border-[#e07a3f]"
              >
                <option value="Birthday Celebration">Birthday Celebration</option>
                <option value="Wedding / Nikah Ceremony">Wedding / Nikah Ceremony</option>
                <option value="Anniversary">Anniversary</option>
                <option value="Corporate / PR Event">Corporate / PR Event</option>
                <option value="Baby Shower / Gender Reveal">Baby Shower / Gender Reveal</option>
              </select>
            </div>

            <div>
              <label className="text-[#c29f8c] block mb-1 font-semibold">Required Event Date</label>
              <input
                type="date"
                required
                value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
                className="w-full bg-[#180b06] text-white text-xs px-3.5 py-2.5 rounded-xl border border-[#422013] focus:outline-none focus:border-[#e07a3f]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[#c29f8c] block mb-1 font-semibold">Signature Flavor</label>
              <select
                value={flavor}
                onChange={(e) => setFlavor(e.target.value)}
                className="w-full bg-[#180b06] text-white text-xs px-3.5 py-2.5 rounded-xl border border-[#422013] focus:outline-none focus:border-[#e07a3f]"
              >
                <option value="Belgian Dark Chocolate Silk">Belgian Dark Chocolate Silk</option>
                <option value="Saffron & Cardamom Milk Cake">Saffron & Cardamom Milk Cake</option>
                <option value="Lotus Biscoff Crunch">Lotus Biscoff Crunch</option>
                <option value="Salted Caramel Ganache">Salted Caramel Ganache</option>
                <option value="Red Velvet Cream Cheese">Red Velvet Cream Cheese</option>
                <option value="Pistachio Rose Velvet">Pistachio Rose Velvet</option>
              </select>
            </div>

            <div>
              <label className="text-[#c29f8c] block mb-1 font-semibold">Cake Weight / Tier</label>
              <select
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="w-full bg-[#180b06] text-white text-xs px-3.5 py-2.5 rounded-xl border border-[#422013] focus:outline-none focus:border-[#e07a3f]"
              >
                <option value="2 lbs (Serves 6-8)">2 lbs (Serves 6-8) ~ Rs. 3,500</option>
                <option value="3 lbs (Serves 10-12)">3 lbs (Serves 10-12) ~ Rs. 4,800</option>
                <option value="4 lbs (Serves 14-16)">4 lbs (Serves 14-16) ~ Rs. 6,200</option>
                <option value="2-Tier Luxury Cake (6 lbs+)">2-Tier Luxury Cake (6 lbs+) ~ Rs. 9,500+</option>
                <option value="3-Tier Grand Wedding Cake">3-Tier Grand Wedding Cake ~ Rs. 18,000+</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-[#c29f8c] block mb-1 font-semibold">
              Inscription on Cake & Design Details (Color theme, gold leaf, fresh flowers):
            </label>
            <textarea
              rows={3}
              placeholder="e.g. 'Happy 25th Birthday Ayla!' with gold leaf accents and floral buttercream piping."
              value={customMsg}
              onChange={(e) => setCustomMsg(e.target.value)}
              className="w-full bg-[#180b06] text-white text-xs px-3.5 py-2.5 rounded-xl border border-[#422013] focus:outline-none focus:border-[#e07a3f]"
            />
          </div>

          {/* Footer note */}
          <div className="bg-[#1c0c06] p-3 rounded-xl border border-[#3b1c10] text-[#a8826e] text-[11px] leading-relaxed">
            ✨ Our pastry chef team will review your requirements and send a customized sketch preview and exact quote on WhatsApp within 15 minutes.
          </div>

          {/* Buttons */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 rounded-2xl text-xs font-bold text-[#c49f8b] hover:text-white bg-[#25120a] border border-[#3e1f13]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitted}
              className="px-7 py-3 rounded-2xl text-xs font-bold text-white bg-[#e07a3f] hover:bg-[#eb874d] shadow-lg flex items-center gap-2 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{submitted ? 'Connecting on WhatsApp...' : 'Submit Inquiry via WhatsApp'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
