import React from 'react';
import { Star, CheckCircle2, MessageSquareQuote, Sparkles } from 'lucide-react';
import { REVIEWS } from '../data/bakeryData';

export const ReviewsSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-8 bg-[#1a0c06] border-t border-[#361a0e] relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-[#2d140a] border border-[#4d2516] text-[#f7a268] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3 shadow-inner">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>Community Love</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-white uppercase tracking-tight">
            Loved by Dessert Enthusiasts Across Pakistan
          </h2>

          <p className="mt-3 text-sm sm:text-base text-[#cfaea0]">
            Over 25,000+ happy bakery boxes delivered with an average 4.9 ★ rating.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-[#241108] border border-[#422013] rounded-3xl p-5 flex flex-col justify-between hover:border-[#6e3720] transition-all duration-300 shadow-xl"
            >
              <div>
                {/* Star rating & verified badge */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1 text-[#f59e0b]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>

                  {rev.verified && (
                    <span className="text-[10px] text-[#4ade80] font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Verified
                    </span>
                  )}
                </div>

                <p className="text-xs text-[#d8b8a5] leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-[#3b1d12]">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-white">{rev.author}</h4>
                    <span className="text-[10px] text-[#9c7560] block">{rev.location}</span>
                  </div>
                  <span className="text-[10px] bg-[#33170c] text-[#f7a268] px-2 py-0.5 rounded font-medium">
                    {rev.date}
                  </span>
                </div>
                <span className="text-[10px] text-[#e07a3f] block mt-1 font-medium truncate">
                  Ordered: {rev.itemOrdered}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
