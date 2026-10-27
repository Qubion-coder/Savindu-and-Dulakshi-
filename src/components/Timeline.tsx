import React from 'react';
import { motion } from 'motion/react';
import { Heart, Camera, Utensils, Sparkles } from 'lucide-react';

const events = [
  { time: '08:30 AM', title: 'Guest Arrival', icon: Heart, desc: 'Welcoming our loved ones to Earls Regency, Kandy' },
  { time: '11:30 AM', title: 'Photographs & Celebrations', icon: Camera, desc: 'Sweet moments with family and friends' },
  { time: '12:30 PM', title: 'Wedding Lunch', icon: Utensils, desc: 'A grand celebratory feast' },
  { time: '03:30 PM', title: 'Farewell', icon: Sparkles, desc: 'Bidding farewell with gratitude and love' },
];

export const Timeline: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-6">
      <div className="text-center mb-10">
        <span className="text-brand-mocha uppercase tracking-[0.4em] text-[10px] font-medium mb-4 block">
          The Day's Flow
        </span>
        <h2 className="text-5xl font-display text-brand-mocha tracking-tight">Wedding Timeline</h2>
        <div className="w-12 h-px bg-brand-gold/30 mx-auto mt-6" />
      </div>

      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-brand-gold/20 to-transparent" />

        <div className="space-y-12">
          {events.map((event, index) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={`flex flex-col md:flex-row items-center gap-8 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Time */}
              <div className={`flex-1 text-center ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                <span className="inline-block px-6 py-2 bg-brand-champagne/80 rounded-full border border-brand-gold/20 text-2xl font-serif text-brand-mocha italic shadow-sm">{event.time}</span>
              </div>

              {/* Icon Node */}
              <div className="relative z-10 w-16 h-16 rounded-full bg-white border-2 border-brand-gold/40 flex items-center justify-center shadow-[0_0_30px_rgba(197,160,89,0.3)] group-hover:scale-110 transition-transform duration-500">
                <div className="absolute inset-1 border border-brand-gold/20 rounded-full" />
                <event.icon className="w-6 h-6 text-brand-mocha" />
              </div>

              {/* Content */}
              <div className={`flex-1 text-center ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                <div className="bg-white/60 backdrop-blur-md p-6 rounded-2xl border border-brand-gold/10 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <h4 className="text-xl font-display text-brand-mocha mb-2">{event.title}</h4>
                  <p className="text-brand-sand text-sm leading-relaxed font-serif italic">{event.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
