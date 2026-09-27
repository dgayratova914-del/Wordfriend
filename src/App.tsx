/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { MethodsOverview } from './components/MethodsOverview';
import { CodeGenerator } from './components/CodeGenerator';
import { VisualStepGuide } from './components/VisualStepGuide';
import { LiveWpTester } from './components/LiveWpTester';
import { ComparisonMatrix } from './components/ComparisonMatrix';
import { SecurityChecklist } from './components/SecurityChecklist';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { Language } from './types';

export default function App() {
  const [language, setLanguage] = useState<Language>('uz');
  const [selectedMethod, setSelectedMethod] = useState<string>('iframe');

  const scrollToGenerator = () => {
    const el = document.getElementById('generator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToMethods = () => {
    const el = document.getElementById('methods');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectMethod = (methodId: string) => {
    setSelectedMethod(methodId);
    scrollToGenerator();
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-neutral-950">
      {/* 3-Zone Navigation */}
      <Navbar
        language={language}
        onLanguageChange={setLanguage}
        onScrollToGenerator={scrollToGenerator}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section with Immediate Clear Answer */}
        <HeroSection
          language={language}
          onExploreClick={scrollToMethods}
          onOpenGenerator={scrollToGenerator}
        />

        {/* 4 Architectural Integration Methods */}
        <MethodsOverview
          language={language}
          onSelectMethod={handleSelectMethod}
        />

        {/* Interactive Embed & Integration Code Generator */}
        <CodeGenerator
          language={language}
          selectedMethod={selectedMethod}
          onMethodChange={setSelectedMethod}
        />

        {/* Step-by-step Visual Guide for Gutenberg & Elementor */}
        <VisualStepGuide language={language} />

        {/* Live WordPress REST API Playground */}
        <LiveWpTester language={language} />

        {/* Comparative Analysis Matrix */}
        <ComparisonMatrix language={language} />

        {/* Dynamic Security Checklist based on chosen method */}
        <SecurityChecklist
          language={language}
          selectedMethod={selectedMethod}
          onMethodChange={setSelectedMethod}
        />

        {/* FAQ & Best Practices */}
        <FaqSection language={language} />
      </main>

      {/* Clean quiet footer */}
      <Footer language={language} />
    </div>
  );
}
