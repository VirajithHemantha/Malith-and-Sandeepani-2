import React from 'react';

/** Small red & black floral ornament drawn inline (no image request). */
export const Ornament: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
    <g fill="none" stroke="#141111" strokeWidth="0.9" strokeLinecap="round">
      <path d="M24 6c-3 5-3 9 0 13 3-4 3-8 0-13z" />
      <path d="M24 42c-3-5-3-9 0-13 3 4 3 8 0 13z" />
      <path d="M6 24c5-3 9-3 13 0-4 3-8 3-13 0z" />
      <path d="M42 24c-5-3-9-3-13 0 4 3 8 3 13 0z" />
    </g>
    <g fill="#b3121d">
      <path d="M24 17.5c-1.6 2.2-1.6 4.3 0 6.5 1.6-2.2 1.6-4.3 0-6.5z" opacity="0.9" />
      <path d="M24 30.5c-1.6-2.2-1.6-4.3 0-6.5 1.6 2.2 1.6 4.3 0 6.5z" opacity="0.9" />
      <path d="M17.5 24c2.2-1.6 4.3-1.6 6.5 0-2.2 1.6-4.3 1.6-6.5 0z" opacity="0.9" />
      <path d="M30.5 24c-2.2-1.6-4.3-1.6-6.5 0 2.2 1.6 4.3 1.6 6.5 0z" opacity="0.9" />
      <circle cx="24" cy="24" r="1.6" />
      <circle cx="12" cy="12" r="1" />
      <circle cx="36" cy="12" r="1" />
      <circle cx="12" cy="36" r="1" />
      <circle cx="36" cy="36" r="1" />
    </g>
  </svg>
);

export const DecorativeDivider: React.FC = () => {
  return (
    <div className="w-full flex justify-center items-center py-4 z-20 relative pointer-events-none">
      <div className="w-24 sm:w-48 h-[1px] bg-gradient-to-r from-transparent to-brand-gold/50" />
      <Ornament className="w-9 h-9 mx-4" />
      <div className="w-24 sm:w-48 h-[1px] bg-gradient-to-l from-transparent to-brand-gold/50" />
    </div>
  );
};
