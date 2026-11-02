import React, { useState } from 'react';
import { Link2, Copy, MessageCircle, Heart } from 'lucide-react';
import { Toaster, toast } from 'sonner';
import {
  BRIDE_NAME,
  GROOM_NAME,
  PREFIXES,
  PrefixKey,
  buildDisplayName,
  buildInviteLink,
  buildInviteMessage,
} from '../lib/invite';

export const AdminPage: React.FC = () => {
  const [prefix, setPrefix] = useState<PrefixKey>('mr');
  const [guestName, setGuestName] = useState('');
  const [generated, setGenerated] = useState<{ displayName: string; link: string; message: string } | null>(null);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    const displayName = buildDisplayName(prefix, guestName);
    if (!displayName) {
      toast.error('Please enter a guest name.');
      return;
    }
    const link = buildInviteLink(window.location.origin, prefix, guestName);
    setGenerated({ displayName, link, message: buildInviteMessage(displayName, link) });
  };

  const copy = async (text: string, successMessage: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(successMessage);
    } catch {
      toast.error('Could not copy. Please copy it manually.');
    }
  };

  const fieldClass =
    'w-full bg-white px-5 py-3.5 rounded-xl border border-brand-gold/30 focus:ring-2 focus:ring-brand-gold/30 focus:border-brand-gold outline-none transition-all duration-300 font-sans text-base text-brand-mocha placeholder:text-brand-sand/50';

  const buttonBase =
    'flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full font-sans text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed';

  return (
    <div className="min-h-screen bg-brand-champagne font-sans text-brand-mocha py-12 px-4">
      <Toaster position="top-center" />

      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <Heart className="w-6 h-6 mx-auto mb-4 text-brand-gold fill-brand-gold/20" />
          <span className="uppercase tracking-[0.4em] text-[10px] font-bold text-brand-sand">Admin</span>
          <h1 className="text-3xl sm:text-4xl font-display mt-2">Invitation Link Generator</h1>
          <p className="font-serif italic text-brand-sand mt-2">
            {GROOM_NAME} & {BRIDE_NAME} — Homecoming
          </p>
        </div>

        <form
          onSubmit={handleGenerate}
          className="bg-white rounded-3xl border border-brand-gold/20 shadow-[0_20px_50px_rgba(20,17,17,0.06)] p-6 sm:p-10 space-y-6"
        >
          <div className="grid sm:grid-cols-[180px_1fr] gap-4">
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-brand-sand mb-2">Prefix</label>
              <select
                className={`${fieldClass} cursor-pointer`}
                value={prefix}
                onChange={(e) => setPrefix(e.target.value as PrefixKey)}
              >
                {PREFIXES.map((p) => (
                  <option key={p.key} value={p.key}>{p.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-brand-sand mb-2">Guest Name</label>
              <input
                type="text"
                placeholder="e.g. Sanjaya"
                className={fieldClass}
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button type="submit" className={`${buttonBase} bg-brand-black text-white hover:bg-brand-gold`}>
              <Link2 className="w-4 h-4" />
              Generate Link
            </button>
            <button
              type="button"
              disabled={!generated}
              onClick={() => generated && copy(generated.link, 'Link copied!')}
              className={`${buttonBase} border border-brand-black text-brand-mocha hover:bg-brand-black hover:text-white`}
            >
              <Copy className="w-4 h-4" />
              Copy Link Only
            </button>
            <button
              type="button"
              disabled={!generated}
              onClick={() => generated && copy(generated.message, 'Message copied!')}
              className={`${buttonBase} bg-brand-gold text-white hover:bg-brand-crimson`}
            >
              <MessageCircle className="w-4 h-4" />
              Copy Full Message
            </button>
          </div>
        </form>

        {generated && (
          <div className="mt-8 space-y-6">
            <div className="bg-white rounded-3xl border border-brand-gold/20 p-6 sm:p-8">
              <span className="block text-[10px] uppercase tracking-[0.2em] font-bold text-brand-sand mb-2">Generated Link</span>
              <a
                href={generated.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block break-all text-brand-gold font-medium hover:underline"
              >
                {generated.link}
              </a>
              <p className="mt-4 font-serif italic text-brand-sand">
                On the invitation: “We cordially invite <span className="text-brand-mocha not-italic font-semibold">{generated.displayName}</span> to celebrate our special day with us.”
              </p>
            </div>

            <div className="bg-white rounded-3xl border border-brand-gold/20 p-6 sm:p-8">
              <span className="block text-[10px] uppercase tracking-[0.2em] font-bold text-brand-sand mb-3">Message Preview</span>
              <pre className="whitespace-pre-wrap break-words font-sans text-sm leading-relaxed text-brand-mocha">{generated.message}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
