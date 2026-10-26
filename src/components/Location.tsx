import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Navigation, Compass } from 'lucide-react';
import { WEDDING } from '../config';

export const Location: React.FC = () => {
  const liveLocationUrl = WEDDING.mapUrl;

  return (
    <div className="max-w-[85rem] mx-auto px-6 relative py-12">
      {/* Decorative Glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-radial from-brand-gold/20 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="flex justify-center mt-10">
        
        {/* Left Interactive Card */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="w-full max-w-2xl z-20"
        >
          <div className="bg-white/90 backdrop-blur-2xl p-10 sm:p-14 lg:p-16 rounded-[2.5rem] shadow-[0_30px_60px_rgba(197,160,89,0.15)] border border-brand-gold/30 relative overflow-hidden group">
            
            {/* Elegant top border gradient */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-champagne via-brand-gold to-brand-mocha" />
            
            <div className="mb-10 relative z-10 text-center flex flex-col items-center">
              <div className="inline-flex items-center justify-center gap-4 mb-6">
                <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-brand-mocha/60" />
                <span className="text-brand-mocha uppercase tracking-[0.5em] text-[10px] sm:text-[11px] font-bold drop-shadow-sm">
                  The Venue
                </span>
                <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-brand-mocha/60" />
              </div>

              <h2 className="text-5xl sm:text-6xl font-display text-brand-mocha mb-6 leading-tight drop-shadow-sm">
                Where We <br />
                <span className="italic font-light text-brand-mocha">Celebrate</span>
              </h2>

              <div className="flex flex-col items-center gap-5 mt-10">
                <div className="w-16 h-16 bg-stone-50 rounded-full border border-brand-gold/40 shadow-inner flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-500 mb-2">
                  <MapPin className="text-brand-mocha w-6 h-6" />
                </div>
                <div>
                  <p className="text-3xl font-serif text-brand-mocha mb-2">{WEDDING.venue}</p>
                  <p className="text-xs uppercase tracking-[0.2em] font-medium text-brand-sand leading-relaxed mb-6">{WEDDING.city}</p>
                  
                  <p className="text-brand-sand/90 italic font-serif text-lg leading-relaxed max-w-sm mx-auto mb-10">
                    "A serene and elegant setting where we will begin our new chapter together."
                  </p>

                  <a
                    href={liveLocationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 bg-brand-mocha text-brand-champagne px-8 py-4 rounded-full font-sans tracking-[0.2em] text-xs uppercase hover:bg-brand-mocha hover:shadow-[0_10px_20px_rgba(0,0,0,0.2)] transition-all duration-300 active:scale-95 group/btn"
                  >
                    <Navigation className="w-4 h-4 text-brand-gold group-hover/btn:rotate-45 transition-transform duration-300" />
                    Open Live Location
                  </a>
                </div>
              </div>
            </div>

            {/* Faint background compass icon */}
            <Compass className="absolute -bottom-16 -right-16 w-64 h-64 text-brand-gold/5 rotate-12 group-hover:rotate-45 transition-transform duration-[3s]" />
          </div>
        </motion.div>
      </div>
    </div>
  );
};
