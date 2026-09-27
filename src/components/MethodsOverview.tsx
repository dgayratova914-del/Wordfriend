import React from 'react';
import { ArrowRight, Check, Clock, Gauge, Sparkles } from 'lucide-react';
import { METHODS_DATA } from '../data/content';
import { Language } from '../types';

interface MethodsOverviewProps {
  language: Language;
  onSelectMethod: (methodId: string) => void;
}

export const MethodsOverview: React.FC<MethodsOverviewProps> = ({
  language,
  onSelectMethod
}) => {
  return (
    <section id="methods" className="py-20 border-b border-neutral-800 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2">
            {language === 'uz' ? 'Arxitektura va Integratsiya' : 'Architecture & Integration'}
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white mb-4">
            {language === 'uz'
              ? 'WordPress bilan bog\'lashning 4 ta asosiy usuli'
              : '4 Core Ways to Connect Your App with WordPress'}
          </h2>
          <p className="text-base text-neutral-400 leading-relaxed">
            {language === 'uz'
              ? 'Ehtiyojingiz va texnik darajangizga qarab eng qulay usulni tanlang. Har bir usul to\'liq sinovdan o\'tgan va barqaror ishlaydi.'
              : 'Choose the ideal pattern based on your requirements, technical comfort, and workflow. Every method is thoroughly production-tested.'}
          </p>
        </div>

        {/* Methods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {METHODS_DATA.map((method) => {
            const isUz = language === 'uz';
            return (
              <div
                key={method.id}
                className="group relative rounded-xl border border-neutral-800 bg-neutral-900/50 p-7 hover:border-neutral-700 hover:bg-neutral-900/80 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Top metadata line (clean unboxed, no pill badges) */}
                  <div className="flex items-center justify-between text-xs text-neutral-400 mb-4 pb-4 border-b border-neutral-800/80">
                    <span className="font-mono text-emerald-400 font-bold text-sm">
                      {method.number}.
                    </span>
                    <div className="flex items-center gap-2">
                      <span>{isUz ? method.difficultyUz : method.difficultyEn}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono tabular-nums">{isUz ? method.timeUz : method.timeEn}</span>
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                    {isUz ? method.titleUz : method.titleEn}
                  </h3>
                  <div className="text-xs text-emerald-400/90 font-medium mb-4">
                    {isUz ? method.subtitleUz : method.subtitleEn}
                  </div>

                  {/* Summary paragraph */}
                  <p className="text-sm text-neutral-300 mb-6 leading-relaxed">
                    {isUz ? method.summaryUz : method.summaryEn}
                  </p>

                  {/* Pros list */}
                  <div className="space-y-2.5 mb-6">
                    {(isUz ? method.prosUz : method.prosEn).map((pro, index) => (
                      <div key={index} className="flex items-start gap-2.5 text-xs text-neutral-300">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="leading-snug">{pro}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom trigger action */}
                <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between">
                  <span className="text-xs text-neutral-400 italic">
                    {isUz ? 'Tavsiya:' : 'Best when:'} {isUz ? method.whenUz.slice(0, 48) + '...' : method.whenEn.slice(0, 48) + '...'}
                  </span>
                  <button
                    onClick={() => onSelectMethod(method.id)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors whitespace-nowrap pl-4"
                  >
                    <span>{isUz ? 'Kodni ko\'rish' : 'Use Method'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
