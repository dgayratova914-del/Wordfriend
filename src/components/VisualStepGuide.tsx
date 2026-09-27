import React, { useState } from 'react';
import { CheckCircle2, ArrowRight, Layers, FileCode, Server } from 'lucide-react';
import { STEP_BY_STEP_GUIDES } from '../data/content';
import { Language } from '../types';

interface VisualStepGuideProps {
  language: Language;
}

export const VisualStepGuide: React.FC<VisualStepGuideProps> = ({ language }) => {
  const isUz = language === 'uz';
  const [activePlatform, setActivePlatform] = useState<'gutenberg' | 'elementor' | 'cpanel'>('gutenberg');

  const currentGuide = STEP_BY_STEP_GUIDES[activePlatform];

  return (
    <section id="guide" className="py-20 border-b border-neutral-800 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2">
            {isUz ? 'Qadamma-qadam yo\'riqnoma' : 'Step-by-Step Instructions'}
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white mb-4">
            {isUz
              ? 'WordPress-da kodni qayerga joylash kerak?'
              : 'Where to Paste the Code in WordPress?'}
          </h2>
          <p className="text-base text-neutral-400 leading-relaxed">
            {isUz
              ? 'Siz ishlatayotgan vositani tanlang (Gutenberg, Elementor yoki cPanel) va 6 ta oson qadamda ilovani jonli ishga tushiring.'
              : 'Select your preferred environment (Gutenberg, Elementor, or cPanel) and get your app live in 6 simple steps.'}
          </p>
        </div>

        {/* Platform Selector Buttons */}
        <div className="flex flex-wrap gap-3 mb-10">
          <button
            onClick={() => setActivePlatform('gutenberg')}
            className={`flex items-center gap-2.5 px-5 py-3 rounded-xl border text-xs font-semibold transition-all ${
              activePlatform === 'gutenberg'
                ? 'bg-neutral-900 border-emerald-500 text-emerald-400 shadow-sm'
                : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Gutenberg (Standart WordPress)</span>
          </button>

          <button
            onClick={() => setActivePlatform('elementor')}
            className={`flex items-center gap-2.5 px-5 py-3 rounded-xl border text-xs font-semibold transition-all ${
              activePlatform === 'elementor'
                ? 'bg-neutral-900 border-emerald-500 text-emerald-400 shadow-sm'
                : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
            }`}
          >
            <FileCode className="w-4 h-4" />
            <span>Elementor Page Builder</span>
          </button>

          <button
            onClick={() => setActivePlatform('cpanel')}
            className={`flex items-center gap-2.5 px-5 py-3 rounded-xl border text-xs font-semibold transition-all ${
              activePlatform === 'cpanel'
                ? 'bg-neutral-900 border-emerald-500 text-emerald-400 shadow-sm'
                : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
            }`}
          >
            <Server className="w-4 h-4" />
            <span>cPanel / FTP (Alohida papka)</span>
          </button>
        </div>

        {/* Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(isUz ? currentGuide.stepsUz : currentGuide.stepsEn).map((stepText, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-6 flex flex-col justify-between hover:border-neutral-700 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-neutral-400 mb-4 pb-3 border-b border-neutral-800/80">
                  <span className="font-mono text-emerald-400 font-bold text-sm">
                    0{idx + 1}.
                  </span>
                  <span className="text-[11px] font-medium text-neutral-400 uppercase tracking-wider">
                    {isUz ? `Qadam ${idx + 1}` : `Step ${idx + 1}`}
                  </span>
                </div>
                <p className="text-sm text-neutral-200 leading-relaxed font-normal">
                  {stepText}
                </p>
              </div>

              <div className="mt-4 pt-3 flex items-center text-xs text-neutral-400">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500/80 mr-1.5 shrink-0" />
                <span>{isUz ? 'Tayyor bo\'lgach keyingisiga o\'ting' : 'Proceed to next step'}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Pro Tip Callout */}
        <div className="mt-10 rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-5 flex items-start gap-4 text-xs text-neutral-300">
          <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0 font-bold font-mono">
            !
          </div>
          <div>
            <div className="font-semibold text-emerald-300 mb-1">
              {isUz ? 'Muhim eslatma va tavsiya:' : 'Pro Tip for Clean Integration:'}
            </div>
            <p className="text-neutral-400 leading-relaxed">
              {isUz
                ? 'WordPress sahifangizda ilova to\'liq kenglikda ko\'rinishi uchun sahifa sozlamalarida "Template" (Shablon) qismini "Elementor Full Width" yoki "Blank Canvas" (Yon panellarsiz) qilib belgilang. Bu ilovangizga ko\'proq bo\'sh joy va professional ko\'rinish beradi.'
                : 'To display your application in full edge-to-edge beauty, configure your WordPress page template to "Full Width" or "Blank Canvas" without sidebars.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
