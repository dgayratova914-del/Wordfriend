import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQ_DATA } from '../data/content';
import { Language } from '../types';

interface FaqSectionProps {
  language: Language;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ language }) => {
  const isUz = language === 'uz';
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 border-b border-neutral-800 bg-neutral-900/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2">
            {isUz ? 'Ko\'p so\'raladigan savollar' : 'Frequently Asked Questions'}
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white mb-4">
            {isUz
              ? 'Integratsiya bo\'yicha muhim savollarga javoblar'
              : 'Common Questions & Practical Answers'}
          </h2>
          <p className="text-base text-neutral-400 leading-relaxed">
            {isUz
              ? 'Xavfsizlik, SEO, mobil moslashuv va WordPress cheklovlari bo\'yicha aniq ma\'lumotlar.'
              : 'Everything you need to know about security, SEO, mobile responsiveness, and hosting.'}
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {FAQ_DATA.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-xl border border-neutral-800 bg-neutral-900/50 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 hover:bg-neutral-900/80 transition-colors"
                >
                  <span className="text-sm sm:text-base font-semibold text-white">
                    {isUz ? item.qUz : item.qEn}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-neutral-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-emerald-400' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-neutral-300 leading-relaxed border-t border-neutral-800/60 bg-neutral-950/40">
                    {isUz ? item.aUz : item.aEn}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
