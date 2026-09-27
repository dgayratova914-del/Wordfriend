import React from 'react';
import { ArrowDown, CheckCircle2, Copy, Sparkles, ExternalLink } from 'lucide-react';
import { Language } from '../types';

interface HeroSectionProps {
  language: Language;
  onExploreClick: () => void;
  onOpenGenerator: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  language,
  onExploreClick,
  onOpenGenerator
}) => {
  return (
    <section className="relative overflow-hidden pt-16 pb-20 sm:pt-24 sm:pb-28 border-b border-neutral-800 bg-radial-[at_top_center] from-neutral-900 via-neutral-950 to-neutral-950">
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Editorial response badge */}
        <div className="inline-flex items-center gap-2 mb-6 text-xs text-emerald-400 font-medium tracking-wide">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{language === 'uz' ? 'Savolingizga rasmiy va to\'liq javob' : 'Direct Answer to Your Question'}</span>
          <span aria-hidden="true" className="text-neutral-600">·</span>
          <span className="text-neutral-400">{language === 'uz' ? '100% Mos keladi' : '100% Compatible'}</span>
        </div>

        {/* Primary Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight max-w-4xl mx-auto text-balance">
          {language === 'uz' ? (
            <>
              Ha, bu yerda yaratilgan saytni{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                WordPress-ga to&apos;liq
              </span>{' '}
              qo&apos;shish mumkin!
            </>
          ) : (
            <>
              Yes, any site built here can be{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                seamlessly integrated
              </span>{' '}
              into WordPress!
            </>
          )}
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-neutral-300 max-w-3xl mx-auto mb-10 leading-relaxed font-normal">
          {language === 'uz' ? (
            <>
              Google AI Studio orqali yaratilgan ilova zamonaviy <strong>React, Vite va TypeScript</strong> asosida qurilgan. 
              Uni WordPress sahifalariga <strong>Iframe / Maxsus HTML bloki</strong> orqali 2 daqiqada joylashtirish, 
              <strong> WordPress REST API</strong> orqali ma&apos;lumot almashish yoki <strong>cPanel hostingingizga</strong> statik sahifa sifatida o&apos;rnatish mumkin.
            </>
          ) : (
            <>
              Applications built in Google AI Studio are standard <strong>React + Vite + TypeScript</strong> apps. 
              You can embed them into any WordPress page within 2 minutes via <strong>Custom HTML</strong>, 
              connect via the <strong>WordPress REST API</strong> (Headless mode), or deploy directly to your <strong>cPanel hosting</strong>.
            </>
          )}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <button
            onClick={onOpenGenerator}
            className="w-full sm:w-auto px-6 py-3.5 text-sm font-semibold text-neutral-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-all shadow-lg shadow-emerald-500/10 flex items-center justify-center gap-2"
          >
            <Copy className="w-4 h-4" />
            <span>{language === 'uz' ? 'WordPress uchun tayyor kodni olish' : 'Generate WordPress Embed Code'}</span>
          </button>
          
          <button
            onClick={onExploreClick}
            className="w-full sm:w-auto px-6 py-3.5 text-sm font-semibold text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <span>{language === 'uz' ? '4 xil ulash usulini ko\'rish' : 'View 4 Integration Methods'}</span>
            <ArrowDown className="w-4 h-4" />
          </button>
        </div>

        {/* Micro-metrics bar (clean unboxed metadata) */}
        <div className="pt-8 border-t border-neutral-800/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
          <div>
            <div className="text-xl sm:text-2xl font-bold text-white font-mono tabular-nums">2 min</div>
            <div className="text-xs text-neutral-400 mt-1">
              {language === 'uz' ? 'Iframe orqali ulash vaqti' : 'Average embed setup time'}
            </div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold text-white font-mono tabular-nums">100%</div>
            <div className="text-xs text-neutral-400 mt-1">
              {language === 'uz' ? 'Elementor & Gutenberg mosligi' : 'Builder compatibility'}
            </div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold text-white font-mono tabular-nums">0 ta</div>
            <div className="text-xs text-neutral-400 mt-1">
              {language === 'uz' ? 'Plagin o\'rnatish majburiyati' : 'Mandatory plugins required'}
            </div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold text-white font-mono tabular-nums">REST API</div>
            <div className="text-xs text-neutral-400 mt-1">
              {language === 'uz' ? 'Ikki tomonlama ma\'lumot uzatish' : 'Two-way data synchronization'}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
