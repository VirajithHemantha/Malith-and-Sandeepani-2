import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, Loader2, Heart, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { submitRsvp } from '../lib/googleSheets';

const ATTENDING = 'Joyfully Accepts';
const DECLINING = 'Regretfully Declines';

const emptyForm = {
  fullName: '',
  phone: '',
  attendance: ATTENDING,
  guests: '1',
  notes: '',
};

export const RSVPForm: React.FC = () => {
  const [formData, setFormData] = useState(emptyForm);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [lastAttendance, setLastAttendance] = useState(ATTENDING);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      await submitRsvp({
        name: formData.fullName,
        phone: formData.phone,
        attendance: formData.attendance,
        guests: formData.attendance === ATTENDING ? formData.guests : '0',
        notes: formData.notes,
      });

      setLastAttendance(formData.attendance);
      setStatus('success');
      setFormData(emptyForm);
    } catch (error) {
      console.error('Error sending RSVP: ', error);
      toast.error(error instanceof Error ? error.message : 'Could not send your RSVP. Please try again.');
      setStatus('error');
    }
  };

  const fieldClass = "w-full bg-white/80 px-6 py-4 rounded-full border border-brand-gold/30 focus:ring-2 focus:ring-brand-gold/30 focus:border-brand-mocha/40 outline-none transition-all duration-300 font-serif italic text-lg shadow-inner placeholder:text-brand-sand/40 text-brand-mocha";

  return (
    <div className="max-w-5xl mx-auto px-6 relative py-4">
      {/* Premium ambient backdrop & glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(closest-side,rgba(179,18,29,0.07),rgba(179,18,29,0))] rounded-full pointer-events-none -z-10" />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="glass p-8 sm:p-10 lg:p-12 rounded-[3rem] border border-brand-gold/30 shadow-[0_30px_60px_rgba(193,18,31,0.1)] relative overflow-hidden bg-white/60 lg:flex items-center gap-16"
      >
        {/* Soft top border line */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-brand-black via-brand-gold to-brand-black" />
        
        {/* Left Side: Elegant Text */}
        <div className="lg:w-1/2 lg:pr-10 mb-12 lg:mb-0 relative text-center lg:text-left">
          <Sparkles className="absolute -top-6 -left-6 w-12 h-12 text-brand-gold/30 animate-pulse" />
          
          <div className="inline-flex items-center justify-center lg:justify-start gap-4 mb-6">
            <span className="text-brand-mocha uppercase tracking-[0.5em] text-[10px] sm:text-[11px] font-bold">
              Kindly Respond
            </span>
            <div className="hidden lg:block w-16 h-[1px] bg-gradient-to-r from-brand-mocha/60 to-transparent" />
          </div>

          <h2 className="text-5xl sm:text-6xl font-display text-brand-mocha tracking-tight leading-[1.1] mb-6">
            Reserve <span className="italic font-light text-brand-gold">Your</span> Seat
          </h2>
          
          <p className="text-brand-sand/90 font-serif text-lg leading-relaxed mb-6">
            Your presence means the world to us. Please kindly let us know if you will be able to join our celebration.
          </p>

          <div className="w-12 h-[1px] bg-brand-gold/50 mx-auto lg:mx-0" />
        </div>

        {/* Right Side: Flowing Form */}
        <div className="lg:w-1/2 relative z-10">
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center py-16 px-8 bg-white/70 rounded-[2rem] border border-brand-gold/20 shadow-xl"
              >
                <div className="w-24 h-24 bg-brand-gold/15 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner border border-brand-gold/40">
                  <CheckCircle className="w-12 h-12 text-brand-gold-light" />
                </div>
                <h3 className="text-4xl font-display text-brand-mocha mb-4 tracking-tight">With Gratitude</h3>
                <p className="text-brand-sand/90 leading-relaxed font-serif text-lg mb-8">
                  {lastAttendance === ATTENDING
                    ? 'Your response has been warmly received. We cannot wait to celebrate with you!'
                    : 'Thank you for letting us know. You will be dearly missed, and we are grateful for your blessings.'}
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="px-6 py-2 rounded-full border border-brand-gold/30 text-brand-mocha font-sans text-[10px] tracking-[0.2em] uppercase hover:bg-brand-gold/10 transition-all duration-300 shadow-sm"
                >
                  Update Response
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-6 bg-white/40 p-8 sm:p-10 rounded-[2.5rem] border border-brand-gold/20 shadow-[0_15px_30px_rgba(0,0,0,0.05)]"
              >
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-brand-sand mb-3 ml-2">Full Name</label>
                  <input
                    required
                    type="text"
                    placeholder="E.g., Kamal & Nimali Perera"
                    className={fieldClass}
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-brand-sand mb-3 ml-2">Phone Number</label>
                  <input
                    required
                    type="tel"
                    placeholder="E.g., 077 123 4567"
                    className={fieldClass}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-brand-sand mb-3 ml-2">Will You Attend?</label>
                  <div className="grid grid-cols-2 gap-3">
                    {[ATTENDING, DECLINING].map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setFormData({ ...formData, attendance: option })}
                        className={`px-4 py-3 rounded-full border font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.15em] font-bold transition-all duration-300 ${
                          formData.attendance === option
                            ? 'bg-brand-gold border-brand-gold text-white shadow-[0_8px_20px_rgba(179,18,29,0.25)]'
                            : 'bg-white/80 border-brand-gold/30 text-brand-mocha hover:border-brand-gold'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                {formData.attendance === ATTENDING && (
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-brand-sand mb-3 ml-2">Number of Guests</label>
                    <div className="relative group">
                      <select
                        className={`${fieldClass} appearance-none cursor-pointer`}
                        value={formData.guests}
                        onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                      >
                        <option value="1">Just Me (1 Guest)</option>
                        <option value="2">We are coming! (2 Guests)</option>
                        <option value="3">3 Guests</option>
                        <option value="4">4 Guests</option>
                        <option value="5">5 Guests</option>
                      </select>
                      <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-brand-gold transition-transform duration-300 group-hover:scale-110">
                        <Heart className="w-5 h-5 fill-brand-gold/30" />
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-brand-sand mb-3 ml-2">Notes (Optional)</label>
                  <textarea
                    placeholder="Any message or dietary requirements..."
                    className={`${fieldClass.replace('rounded-full', 'rounded-[2rem]')} h-28 resize-none`}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  />
                </div>

                <div className="pt-4">
                  <button
                    disabled={status === 'loading'}
                    type="submit"
                    className="w-full bg-brand-black text-white border border-brand-black py-5 rounded-full font-sans tracking-[0.3em] font-bold text-[11px] uppercase hover:bg-brand-gold hover:border-brand-gold transition-all duration-300 shadow-[0_10px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_15px_30px_rgba(0,0,0,0.25)] active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-70"
                  >
                    {status === 'loading' ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      'Send RSVP'
                    )}
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};
