import React from 'react';
import { Check, Minus } from 'lucide-react';
import { Language } from '../types';

interface ComparisonMatrixProps {
  language: Language;
}

export const ComparisonMatrix: React.FC<ComparisonMatrixProps> = ({ language }) => {
  const isUz = language === 'uz';

  const rows = [
    {
      featureUz: 'O\'rnatish vaqti',
      featureEn: 'Setup Time',
      iframe: '2 daqiqa',
      static: '10 daqiqa',
      headless: '20-30 daqiqa',
      shortcode: '5 daqiqa'
    },
    {
      featureUz: 'Kod yozish talabi',
      featureEn: 'Coding Requirement',
      iframe: 'Talab qilinmaydi (0%)',
      static: 'Boshlang\'ich (FTP / cPanel)',
      headless: 'Dasturchi (React + API)',
      shortcode: '1 ta PHP nusxa olish'
    },
    {
      featureUz: 'Avtomatik yangilanish',
      featureEn: 'Auto-updating',
      iframe: 'Ha (Har safar avtomatik)',
      static: 'Qayta build qilish kerak',
      headless: 'Ha (Real vaqt rejimida)',
      shortcode: 'Ha (Har safar avtomatik)'
    },
    {
      featureUz: 'Mobil moslashuvchanlik',
      featureEn: 'Mobile Responsiveness',
      iframe: '100% Responsive',
      static: '100% Responsive',
      headless: '100% Native SPA',
      shortcode: '100% Responsive'
    },
    {
      featureUz: 'SEO matn indeksatsiyasi',
      featureEn: 'SEO Text Indexation',
      iframe: 'Tashqi iframe sifatida',
      static: 'To\'liq HTML indeksatsiya',
      headless: 'Ultra yuqori (SSR/SPA)',
      shortcode: 'Tashqi iframe sifatida'
    },
    {
      featureUz: 'Qaysi holat uchun eng yaxshi?',
      featureEn: 'Best Use Case',
      iframe: 'Kalkulyator, AI asbob, interaktiv widget',
      static: 'Subdomen (app.sayt.uz) yoki alohida landing',
      headless: 'Zamonaviy portal, do\'kon, web ilova',
      shortcode: 'Mavzuga ichki bog\'langan qismlar'
    }
  ];

  return (
    <section className="py-20 border-b border-neutral-800 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2">
            {isUz ? 'Taqqoslash va Tanlov' : 'Comparative Analysis'}
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white mb-4">
            {isUz
              ? 'Qaysi usul sizning vazifangizga mos keladi?'
              : 'Which Method Fits Your Project Best?'}
          </h2>
          <p className="text-base text-neutral-400 leading-relaxed">
            {isUz
              ? 'Agar oddiy va tezkor qo\'shish kerak bo\'lsa — Iframe / Custom HTML eng yaxshi yechim. Agar mustaqil boshqaruv kerak bo\'lsa — Statik eksport yoki Headless rejimini tanlang.'
              : 'For fast, zero-code deployment, Iframe / Custom HTML is unbeatable. For complete control, choose Static Export or Headless API.'}
          </p>
        </div>

        {/* Responsive Table */}
        <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-neutral-800 bg-neutral-900/80 text-neutral-300 font-semibold">
                <th className="py-4 px-6 text-white font-bold w-1/4">
                  {isUz ? 'Xususiyat' : 'Feature'}
                </th>
                <th className="py-4 px-5 text-emerald-400 font-bold">
                  01. Iframe / HTML
                </th>
                <th className="py-4 px-5 text-neutral-200">
                  02. Statik cPanel
                </th>
                <th className="py-4 px-5 text-neutral-200">
                  03. Headless REST API
                </th>
                <th className="py-4 px-5 text-neutral-200">
                  04. WP Shortcode
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/80">
              {rows.map((row, idx) => (
                <tr key={idx} className="hover:bg-neutral-900/60 transition-colors">
                  <td className="py-4 px-6 font-medium text-neutral-200">
                    {isUz ? row.featureUz : row.featureEn}
                  </td>
                  <td className="py-4 px-5 text-emerald-300/90 font-medium">
                    {row.iframe}
                  </td>
                  <td className="py-4 px-5 text-neutral-300">
                    {row.static}
                  </td>
                  <td className="py-4 px-5 text-neutral-300">
                    {row.headless}
                  </td>
                  <td className="py-4 px-5 text-neutral-300">
                    {row.shortcode}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
