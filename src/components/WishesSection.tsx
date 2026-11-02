import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Loader2, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { fetchWishes, submitWish } from '../lib/googleSheets';

interface Wish {
  id: string;
  name: string;
  message: string;
  createdAt: Date;
}

const getRelativeTime = (date: Date) => {
  const diff = Date.now() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
};

export const WishesSection: React.FC = () => {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [formData, setFormData] = useState({ name: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load previously shared wishes from the Google Sheet
  useEffect(() => {
    fetchWishes()
      .then((rows) =>
        setWishes(
          rows.map((row, i) => ({
            id: `sheet-${i}`,
            name: row.name,
            message: row.message,
            createdAt: row.createdAt ? new Date(row.createdAt) : new Date(),
          }))
        )
      )
      .catch((error) => console.error('Error loading wishes: ', error));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.message) return;
    setIsSubmitting(true);

    try {
      await submitWish({ name: formData.name, message: formData.message });

      const newWish: Wish = {
        id: Date.now().toString(),
        name: formData.name,
        message: formData.message,
        createdAt: new Date(),
      };
      
      // Prepend the new wish to the list
      setWishes(prev => [newWish, ...prev]);
      setFormData({ name: '', message: '' });
    } catch (error) {
      console.error('Error submitting wish: ', error);
      toast.error(error instanceof Error ? error.message : 'Could not share your blessing. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 relative py-12">
      {/* Background ambient glow */}
      <div className="absolute top-0 right-1/4 w-3/4 h-3/4 bg-[radial-gradient(closest-side,rgba(179,18,29,0.07),rgba(179,18,29,0))] rounded-full pointer-events-none -z-10" />

      <div className="text-center mb-16 relative">
        <Sparkles className="absolute -top-8 left-1/2 -translate-x-1/2 w-8 h-8 text-brand-gold/40 animate-pulse" />
        <span className="text-brand-mocha uppercase tracking-[0.5em] text-[10px] font-bold mb-4 block">
          Guestbook
        </span>
        <h2 className="text-5xl sm:text-7xl font-display text-brand-mocha tracking-tight">
          Blessings & <span className="italic font-light text-brand-gold">Wishes</span>
        </h2>
        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-brand-gold/60 to-transparent mx-auto mt-8" />
      </div>

      <div className="flex flex-col items-center">
        
        {/* Beautiful Centered Form Box */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="w-full glass p-8 sm:p-14 rounded-[3rem] border border-brand-gold/30 shadow-[0_30px_60px_rgba(193,18,31,0.1)] relative overflow-hidden bg-white/70 mb-16"
        >
          {/* Subtle top reflection line */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-gold to-transparent opacity-50" />

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="text-center mb-10">
              <p className="text-brand-sand font-serif italic text-lg leading-relaxed max-w-lg mx-auto">
                Leave a little note or a piece of advice for our journey ahead.
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-brand-sand mb-3 ml-2 text-left">Your Name</label>
                <input
                  required
                  type="text"
                  placeholder="E.g., Uncle John"
                  className="w-full bg-white/80 px-6 py-4 rounded-full border border-brand-gold/30 focus:ring-2 focus:ring-brand-gold/30 focus:border-brand-mocha/40 outline-none transition-all duration-300 font-serif italic text-lg shadow-inner placeholder:text-brand-sand/40 text-brand-mocha"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-brand-sand mb-3 ml-2 text-left">Your Message</label>
                <textarea
                  required
                  placeholder="Wishing you a lifetime of happiness..."
                  className="w-full bg-white/80 px-6 py-5 rounded-[2rem] border border-brand-gold/30 focus:ring-2 focus:ring-brand-gold/30 focus:border-brand-mocha/40 outline-none transition-all duration-300 h-36 resize-none font-serif italic text-lg shadow-inner placeholder:text-brand-sand/40 text-brand-mocha"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>
            </div>

            <div className="pt-4 max-w-sm mx-auto">
              <button
                disabled={isSubmitting}
                type="submit"
                className="w-full bg-brand-black text-white border border-brand-black py-5 rounded-full font-sans tracking-[0.3em] font-bold text-[11px] uppercase hover:bg-brand-gold hover:border-brand-gold transition-all duration-300 shadow-[0_10px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_15px_30px_rgba(0,0,0,0.25)] active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-70"
              >
                {isSubmitting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4 text-brand-gold" />
                    Share Blessing
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>

        {/* Wishes List - Stacked Centrally Below */}
        <div className="w-full space-y-6 max-h-[800px] overflow-y-auto pr-4 scrollbar-thin">
          <AnimatePresence initial={false}>
            {wishes.map((wish) => (
              <motion.div
                key={wish.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="glass p-8 sm:p-10 rounded-3xl border border-brand-gold/20 shadow-sm relative overflow-hidden group bg-white/50"
              >
                <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-brand-mocha/20 to-brand-gold/40 group-hover:from-brand-mocha group-hover:to-brand-gold transition-all duration-500" />
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-4 mb-4">
                  <h4 className="font-display text-2xl text-brand-mocha tracking-tight pl-2">{wish.name}</h4>
                  <span className="text-[9px] uppercase tracking-[0.2em] text-brand-sand font-bold bg-white/60 px-3 py-1 rounded-full border border-brand-gold/30">
                    {wish.createdAt ? getRelativeTime(wish.createdAt) : 'just now'}
                  </span>
                </div>
                <p className="text-brand-sand font-serif italic text-lg sm:text-lg leading-relaxed pl-2">
                  "{wish.message}"
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
