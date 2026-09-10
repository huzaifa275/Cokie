import React, { useState } from 'react';
import { Sparkles, Phone, Mail, MapPin, Heart, ShieldCheck, Instagram, Facebook, ArrowRight } from 'lucide-react';

interface FooterProps {
  onOpenCustomCake: () => void;
  onOpenBoxBuilder: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenCustomCake,
  onOpenBoxBuilder,
}) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setSubscribed(true);
  };

  return (
    <footer className="bg-[#140804] text-[#d6b7a5] border-t border-[#31170d] pt-16 pb-12 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Top Newsletter & Promo Banner */}
        <div className="bg-gradient-to-r from-[#29130a] via-[#3b1c10] to-[#29130a] rounded-3xl p-6 sm:p-8 border border-[#522917] flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-[11px] font-black uppercase tracking-widest text-[#f7a268]">
              Weekend Fresh Batch Club
            </span>
            <h3 className="text-xl sm:text-2xl font-display font-black text-white">
              Get Rs. 200 Off Your First Order
            </h3>
            <p className="text-xs text-[#cfaea0]">
              Subscribe for secret weekly cookie drop announcements in Karachi, Lahore & Islamabad.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full md:w-auto flex-1 max-w-md">
            {subscribed ? (
              <div className="bg-[#15803d]/30 border border-[#22c55e] text-[#4ade80] px-4 py-3 rounded-2xl text-xs font-bold text-center">
                🎉 Welcome to the Club! Use coupon code <span className="underline">SWEETPAKISTAN</span> for 15% off!
              </div>
            ) : (
              <div className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full bg-[#170904] text-white text-xs px-4 py-3 rounded-2xl border border-[#442214] focus:outline-none focus:border-[#e07a3f]"
                />
                <button
                  type="submit"
                  className="bg-[#e07a3f] hover:bg-[#eb874d] text-white text-xs font-black px-5 py-3 rounded-2xl whitespace-nowrap shadow-lg flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <span>Join</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </form>
        </div>

        {/* 4 Column Links & Information */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-script text-4xl text-white tracking-wider">Cokie</span>
              <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#d69f80] border-l border-[#4a2818] pl-2 leading-tight">
                Artisan Bakery<br />Pakistan
              </span>
            </div>
            
            <p className="text-xs text-[#b89380] leading-relaxed">
              Pakistan’s premier artisanal bakery dedicated to honest baking with 100% grass-fed butter, Belgian chocolate, and heritage recipes.
            </p>

            <div className="flex items-center gap-2 text-xs text-[#22c55e] font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Halal Certified Bakery</span>
            </div>
          </div>

          {/* Boutique Outlets in Pakistan */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#e07a3f]">
              Our Outlets in Pakistan
            </h4>
            <ul className="space-y-2 text-xs text-[#c9a997]">
              <li>
                <b className="text-white">Karachi (Flagship):</b> Shahbaz Commercial, Lane 4, DHA Phase 5
              </li>
              <li>
                <b className="text-white">Karachi (Clifton):</b> Ocean Mall Enclave, Block 4, Clifton
              </li>
              <li>
                <b className="text-white">Lahore (Gulberg):</b> Mini Market / MM Alam Road, Gulberg III
              </li>
              <li>
                <b className="text-white">Lahore (DHA):</b> Commercial 42-CCA, Phase 6
              </li>
              <li>
                <b className="text-white">Islamabad:</b> College Road, F-7 Markaz (Jinnah Super)
              </li>
            </ul>
          </div>

          {/* Quick Bakery Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#e07a3f]">
              Quick Treats & Services
            </h4>
            <ul className="space-y-2 text-xs text-[#c9a997]">
              <li>
                <button onClick={onOpenBoxBuilder} className="hover:text-white transition-colors cursor-pointer text-left">
                  Build Custom 4/6/12 Baker Box
                </button>
              </li>
              <li>
                <button onClick={onOpenCustomCake} className="hover:text-white transition-colors cursor-pointer text-left">
                  Custom Birthday & Wedding Cakes
                </button>
              </li>
              <li>
                <a href="#menu" className="hover:text-white transition-colors">
                  NYC Belgian Chocolate Cookies
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-white transition-colors">
                  Desi Ghee Nan Khatai & Almond Rusks
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-white transition-colors">
                  Corporate Gift Hampers & PR Boxes
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#e07a3f]">
              Bakery Hotline & Support
            </h4>
            <ul className="space-y-2.5 text-xs text-[#c9a997]">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#e07a3f]" />
                <span>+92 300 1234567 (WhatsApp Direct)</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#e07a3f]" />
                <span>+92 21 3584 9901 (Karachi Central)</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#e07a3f]" />
                <span>hello@cokiebakery.pk</span>
              </li>
              <li className="text-[11px] text-[#9c7560] pt-1">
                ⏰ Oven Baking Hours: 8:00 AM – 2:00 AM Daily
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#26120a] flex flex-col sm:flex-row items-center justify-between text-xs text-[#8a6855] gap-4">
          <p>© 2026 Cokie Artisanal Bakery Pakistan. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="text-[#a67d67]">Crafted with pure butter & passion</span>
            <span>•</span>
            <span>Karachi • Lahore • Islamabad</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
