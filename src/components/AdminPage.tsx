import React, { useState } from 'react';
import { Link2, Copy, MessageSquareHeart, Heart } from 'lucide-react';
import { Toaster, toast } from 'sonner';
import { WEDDING } from '../config';

const PREFIXES = ['Mr.', 'Mrs.', 'Miss', 'Mr. & Mrs.', 'Family', 'Dear'] as const;
type Prefix = (typeof PREFIXES)[number];

// "Dear" is a greeting style, not a title: the message already starts with "Dear"
export function buildDisplayName(prefix: Prefix, name: string): string {
  const clean = name.trim().replace(/\s+/g, ' ');
  if (!clean) return '';
  if (prefix === 'Family') return `${clean} and Family`;
  if (prefix === 'Dear') return clean;
  return `${prefix} ${clean}`;
}

function buildMessage(displayName: string, link: string): string {
  return `Dear ${displayName} ❤️

With joyful hearts, we warmly invite you to celebrate one of the most special days of our lives as we begin our journey together.

Please view our wedding invitation and all the event details through the link below 🌐:

${link}

Your presence would truly mean the world to us, and we would be honored to celebrate this beautiful moment together.

With love,
❤️ ${WEDDING.groom.name} & ${WEDDING.bride.name}`;
}

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    // Fallback for non-secure contexts
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
  }
}

export const AdminPage: React.FC = () => {
  const [prefix, setPrefix] = useState<Prefix>('Mr.');
  const [guestName, setGuestName] = useState('');
  const [result, setResult] = useState<{ displayName: string; link: string; message: string } | null>(null);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    const displayName = buildDisplayName(prefix, guestName);
    if (!displayName) {
      toast.error('Please enter a guest name');
      return;
    }
    const link = `${window.location.origin}/${encodeURIComponent(displayName)}`;
    setResult({ displayName, link, message: buildMessage(displayName, link) });
  };

  const inputClass =
    'w-full bg-white px-5 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-brand-gold/30 focus:border-brand-mocha/40 outline-none transition-all font-sans text-base text-brand-mocha';
  const buttonClass =
    'flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-sans text-xs uppercase tracking-[0.15em] font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed';

  return (
    <div className="min-h-screen bg-brand-champagne font-sans text-brand-mocha px-4 py-10 sm:py-16">
      <Toaster position="top-center" />
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-8">
          <Heart className="w-6 h-6 mx-auto mb-3 text-brand-gold fill-brand-gold/20" />
          <h1 className="font-display text-4xl sm:text-5xl">Invitation Links</h1>
          <p className="text-brand-sand font-serif italic mt-2">
            {WEDDING.groom.name} & {WEDDING.bride.name} · {WEDDING.dateLong}
          </p>
        </div>

        <form onSubmit={handleGenerate} className="bg-white/80 rounded-2xl border border-brand-gold/30 shadow-sm p-6 sm:p-8 space-y-5">
          <div>
            <label className="block text-[11px] uppercase tracking-[0.2em] font-bold text-brand-sand mb-2">Select Prefix</label>
            <select className={inputClass} value={prefix} onChange={(e) => setPrefix(e.target.value as Prefix)}>
              {PREFIXES.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-[0.2em] font-bold text-brand-sand mb-2">Guest Name</label>
            <input
              type="text"
              placeholder="e.g. Sanjaya"
              className={inputClass}
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button type="submit" className={`${buttonClass} bg-brand-mocha text-brand-champagne hover:bg-brand-mocha/90`}>
              <Link2 className="w-4 h-4" /> Generate Link
            </button>
            <button
              type="button"
              disabled={!result}
              onClick={() => result && copyText(result.link).then(() => toast.success('Link copied!'))}
              className={`${buttonClass} border border-brand-mocha/30 hover:bg-brand-gold/10`}
            >
              <Copy className="w-4 h-4" /> Copy Link Only
            </button>
            <button
              type="button"
              disabled={!result}
              onClick={() => result && copyText(result.message).then(() => toast.success('Message copied!'))}
              className={`${buttonClass} border border-brand-mocha/30 hover:bg-brand-gold/10`}
            >
              <MessageSquareHeart className="w-4 h-4" /> Copy Full Message
            </button>
          </div>
        </form>

        {result && (
          <div className="mt-6 space-y-4">
            <div className="bg-white/80 rounded-2xl border border-brand-gold/30 p-5">
              <span className="block text-[11px] uppercase tracking-[0.2em] font-bold text-brand-sand mb-2">Generated Link</span>
              <a href={result.link} target="_blank" rel="noopener noreferrer" className="break-all text-brand-mocha underline decoration-brand-gold/50 underline-offset-4">
                {result.link}
              </a>
            </div>
            <div className="bg-white/80 rounded-2xl border border-brand-gold/30 p-5">
              <span className="block text-[11px] uppercase tracking-[0.2em] font-bold text-brand-sand mb-2">Message Preview</span>
              <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-brand-mocha">{result.message}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
