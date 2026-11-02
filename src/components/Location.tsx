import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Navigation, Compass, Map } from 'lucide-react';

export const Location: React.FC = () => {
  const venueAddress = "Devon Hotel, Ampitiya Road";
  const mapUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15822.464624388344!2d80.0328!3d7.2289!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNyAxMyczMy4wIk4gODDCsDAxJzU4LjEiRQ!5e0!3m2!1sen!2slk!4v1711000000000!5m2!1sen!2slk`;
  const liveLocationUrl = "https://maps.app.goo.gl/5k8w3bRbheoc6nfL6";

  return (
    <div className="max-w-[85rem] mx-auto px-6 relative py-12">
      {/* Decorative Glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(closest-side,rgba(179,18,29,0.07),rgba(179,18,29,0))] pointer-events-none -z-10" />

      <div className="flex justify-center mt-10">
        
        {/* Left Interactive Card */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="w-full max-w-2xl z-20"
        >
          <div className="bg-white/90 p-10 sm:p-14 lg:p-16 rounded-[2.5rem] shadow-[0_30px_60px_rgba(193,18,31,0.15)] border border-brand-gold/30 relative overflow-hidden group">
            
            {/* Elegant top border gradient */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-black via-brand-gold to-brand-black" />
            
            <div className="mb-10 relative z-10 text-center flex flex-col items-center">
              <div className="inline-flex items-center justify-center gap-4 mb-6">
                <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-brand-mocha/60" />
                <span className="text-brand-mocha uppercase tracking-[0.5em] text-[10px] sm:text-[11px] font-bold">
                  The Venue
                </span>
                <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-brand-mocha/60" />
              </div>

              <h2 className="text-5xl sm:text-6xl font-display text-brand-mocha mb-6 leading-tight">
                Where We <br />
                <span className="italic font-light text-brand-gold">Celebrate</span>
              </h2>

              <div className="flex flex-col items-center gap-5 mt-10">
                <div className="w-16 h-16 bg-white rounded-full border border-brand-gold/40 shadow-inner flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-500 mb-2">
                  <MapPin className="text-brand-mocha w-6 h-6" />
                </div>
                <div>
                  <p className="text-3xl font-serif text-brand-mocha mb-2">Devon Hotel</p>
                  <p className="text-xs uppercase tracking-[0.2em] font-medium text-brand-sand leading-relaxed mb-6">Ampitiya Road</p>
                  
                  <p className="text-brand-sand/90 italic font-serif text-lg leading-relaxed max-w-sm mx-auto mb-10">
                    "Where our families come together to welcome us home and celebrate a new chapter."
                  </p>

                  <a
                    href={liveLocationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 bg-brand-black text-white border border-brand-black px-8 py-4 rounded-full font-sans tracking-[0.2em] text-xs uppercase hover:bg-brand-gold hover:border-brand-gold hover:shadow-[0_10px_20px_rgba(0,0,0,0.2)] transition-all duration-300 active:scale-95 group/btn"
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
