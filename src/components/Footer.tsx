import React from 'react';
import { Code, ArrowUp } from 'lucide-react';
import { Language } from '../types';

interface FooterProps {
  language: Language;
}

export const Footer: React.FC<FooterProps> = ({ language }) => {
  const isUz = language === 'uz';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 bg-neutral-950 border-t border-neutral-800 text-xs text-neutral-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Brand & Note */}
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-md bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Code className="w-3.5 h-3.5" />
          </div>
          <span className="font-semibold text-white">WP Bridge</span>
          <span aria-hidden="true" className="text-neutral-700">·</span>
          <span>
            {isUz
              ? 'React & WordPress integratsiya platformasi'
              : 'React & WordPress Integration Platform'}
          </span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-6">
          <a href="#methods" className="hover:text-white transition-colors">
            {isUz ? 'Usullar' : 'Methods'}
          </a>
          <a href="#generator" className="hover:text-white transition-colors">
            {isUz ? 'Generator' : 'Generator'}
          </a>
          <a href="#wptester" className="hover:text-white transition-colors">
            {isUz ? 'API Sinov' : 'API Tester'}
          </a>
          <a href="#security" className="hover:text-white transition-colors">
            {isUz ? 'Xavfsizlik' : 'Security'}
          </a>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition-colors ml-2"
          >
            <span>{isUz ? 'Yuqoriga' : 'Top'}</span>
            <ArrowUp className="w-3 h-3" />
          </button>
        </div>
      </div>
    </footer>
  );
};
