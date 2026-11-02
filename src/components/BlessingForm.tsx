import { useState } from 'react';
import { motion } from 'motion/react';
import { useForm } from 'react-hook-form';
import { Heart } from 'lucide-react';
import { toast } from 'sonner';

interface BlessingData {
  name: string;
  message: string;
}

export function BlessingForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<BlessingData>();
  const scriptUrl = import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL as string | undefined;

  const onSubmit = async (data: BlessingData) => {
    setIsSubmitting(true);

    try {
      if (!scriptUrl) {
        throw new Error('Google Apps Script URL is not configured.');
      }

      const payload = new FormData();
      payload.append('sheet', 'WISH');
      payload.append('name', data.name);
      payload.append('message', data.message);

      await fetch(scriptUrl, {
        method: 'POST',
        mode: 'no-cors',
        body: payload,
      });

      toast.success('Your beautiful blessing has been shared!');
      reset();
    } catch (error) {
      console.error('Wishes submit failed:', error);
      toast.error('Could not send your wishes. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-xl mx-auto bg-white/60 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-blue-100"
    >
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-serif text-[#183d72] mb-2 font-semibold">
            Your Name
          </label>
          <input
            {...register('name', { required: 'Name is required' })}
            className="w-full px-4 py-3 rounded-xl border border-blue-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50"
            placeholder="Name"
          />
        </div>
        <div>
          <label className="block text-sm font-serif text-[#183d72] mb-2 font-semibold">
            Your Wishes
          </label>
          <textarea
            {...register('message', { required: 'Please leave a message' })}
            rows={4}
            className="w-full px-4 py-3 rounded-xl border border-blue-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 resize-none"
            placeholder="Share your blessings and advice for the couple..."
          />
        </div>
        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-4 bg-gradient-to-r from-[#25569a] to-[#183d72] text-white rounded-xl font-serif text-lg shadow-lg flex items-center justify-center gap-2"
        >
          {isSubmitting ? 'Sending Love...' : (
            <>
              <Heart className="w-5 h-5 fill-current" />
              <span>Send Blessing</span>
            </>
          )}
        </motion.button>
      </div>
    </motion.form>
  );
}
