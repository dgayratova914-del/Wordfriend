import React from 'react';
import { Globe, ArrowRight, Code } from 'lucide-react';
import { Language } from '../types';

interface NavbarProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onScrollToGenerator: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  onLanguageChange,
  onScrollToGenerator
}) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-800 bg-neutral-950/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <a href="#" className="text-xl font-bold tracking-tight text-white flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Code className="w-4 h-4" />
          </div>
          <span>WP Bridge</span>
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-400">
          <a href="#methods" className="hover:text-white transition-colors">
            {language === 'uz' ? 'Integratsiya usullari' : 'Integration Methods'}
          </a>
          <a href="#generator" className="hover:text-white transition-colors">
            {language === 'uz' ? 'Kod Generatori' : 'Code Generator'}
          </a>
          <a href="#guide" className="hover:text-white transition-colors">
            {language === 'uz' ? 'Gutenberg & Elementor' : 'Gutenberg & Elementor'}
          </a>
          <a href="#wptester" className="hover:text-white transition-colors">
            {language === 'uz' ? 'Jonli API Sinov' : 'Live API Tester'}
          </a>
          <a href="#security" className="hover:text-white transition-colors flex items-center gap-1.5 text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>{language === 'uz' ? 'Xavfsizlik (Security)' : 'Security'}</span>
          </a>
          <a href="#faq" className="hover:text-white transition-colors">
            {language === 'uz' ? 'Savollar' : 'FAQ'}
          </a>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          {/* Language selector */}
          <div className="flex items-center p-0.5 bg-neutral-900 border border-neutral-800 rounded-lg">
            <button
              onClick={() => onLanguageChange('uz')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${
                language === 'uz'
                  ? 'bg-neutral-800 text-white'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              UZ
            </button>
            <button
              onClick={() => onLanguageChange('en')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${
                language === 'en'
                  ? 'bg-neutral-800 text-white'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              EN
            </button>
          </div>

          <button
            onClick={onScrollToGenerator}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-neutral-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors whitespace-nowrap"
          >
            <span>{language === 'uz' ? 'Kodni olish' : 'Get Embed Code'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
