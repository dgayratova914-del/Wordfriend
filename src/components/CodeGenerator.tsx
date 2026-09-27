import React, { useState } from 'react';
import { Copy, Check, Sliders, ExternalLink, Eye, Code2, Monitor, Smartphone } from 'lucide-react';
import { Language } from '../types';

interface CodeGeneratorProps {
  language: Language;
  selectedMethod: string;
  onMethodChange: (method: string) => void;
}

export const CodeGenerator: React.FC<CodeGeneratorProps> = ({
  language,
  selectedMethod,
  onMethodChange
}) => {
  const isUz = language === 'uz';

  // Customizable state
  const defaultAppUrl = typeof window !== 'undefined' ? window.location.origin : 'https://ais-pre-5bpfh3mfteludnfwsddzw6-271829337107.asia-southeast1.run.app';
  const [appUrl, setAppUrl] = useState(defaultAppUrl);
  const [appTitle, setAppTitle] = useState('Mening AI Studio Ilovam');
  const [height, setHeight] = useState('750');
  const [borderRadius, setBorderRadius] = useState('12');
  const [hasShadow, setHasShadow] = useState(true);
  const [allowFullscreen, setAllowFullscreen] = useState(true);
  const [activeTab, setActiveTab] = useState<'code' | 'preview'>('code');
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [copied, setCopied] = useState(false);

  // Generate code based on selectedMethod
  const generateSnippet = () => {
    const shadowStyle = hasShadow ? 'box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);' : '';
    const allowAttrs = allowFullscreen 
      ? 'allow="clipboard-write; fullscreen; camera; microphone; geolocation"'
      : 'allow="clipboard-write"';

    if (selectedMethod === 'iframe') {
      return `<!-- WordPress Custom HTML Block / Elementor HTML Widget -->
<div class="aistudio-wp-embed-container" style="position: relative; width: 100%; min-height: ${height}px; overflow: hidden; border-radius: ${borderRadius}px; ${shadowStyle}">
  <iframe 
    src="${appUrl}" 
    title="${appTitle}"
    width="100%" 
    height="${height}"
    style="border: 0; width: 100%; height: ${height}px; display: block; background-color: #0a0a0a;" 
    loading="lazy"
    ${allowAttrs}
  ></iframe>
</div>

<!-- Qo'shimcha responsive stil (Mobil qurilmalarga moslashuv) -->
<style>
@media (max-width: 640px) {
  .aistudio-wp-embed-container iframe {
    height: 600px !important;
  }
}
</style>`;
    }

    if (selectedMethod === 'shortcode') {
      return `<?php
/**
 * AI Studio Ilovasini WordPress-ga Shortcode orqali kiritish
 * Joylashuv: Sizning WordPress mavzuingizning functions.php fayliga 
 * yoki "Code Snippets" plagini orqali qo'shing.
 *
 * Ishlatish: Sahifa yoki post ichiga [aistudio_app] deb yozing.
 * Parametrlar bilan: [aistudio_app height="800px" title="Ilova"]
 */
function register_aistudio_embed_shortcode( $atts ) {
    $args = shortcode_atts( array(
        'url'    => '${appUrl}',
        'height' => '${height}px',
        'title'  => '${appTitle}',
        'radius' => '${borderRadius}px',
    ), $atts );

    $output = sprintf(
        '<div class="aistudio-embed-wrapper" style="width:100%%; min-height:%1$s; border-radius:%2$s; overflow:hidden; ${shadowStyle}">' .
        '<iframe src="%3$s" title="%4$s" style="width:100%%; height:%1$s; border:none; display:block;" loading="lazy" ${allowAttrs}></iframe>' .
        '</div>',
        esc_attr( $args['height'] ),
        esc_attr( $args['radius'] ),
        esc_url( $args['url'] ),
        esc_attr( $args['title'] )
    );

    return $output;
}
add_shortcode( 'aistudio_app', 'register_aistudio_embed_shortcode' );
`;
    }

    if (selectedMethod === 'headless') {
      return `/**
 * Headless WordPress REST API orqali ma'lumot olish kodi (React + TypeScript)
 * WordPress CMS bo'lib xizmat qiladi, React esa ultra-tezkor interfeys bo'ladi.
 */
import { useEffect, useState } from 'react';

export interface WordPressPost {
  id: number;
  date: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  link: string;
}

export function useWordPressData(wpSiteUrl = 'https://sizning-sayt.uz') {
  const [posts, setPosts] = useState<WordPressPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true);
        // WordPress standart ochiq REST API nuqtasi:
        const response = await fetch(\`\${wpSiteUrl}/wp-json/wp/v2/posts?per_page=6&_embed\`);
        if (!response.ok) throw new Error('WordPress API javob bermadi');
        const data = await response.json();
        setPosts(data);
      } catch (err: any) {
        setError(err.message || 'Xatolik yuz berdi');
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, [wpSiteUrl]);

  return { posts, loading, error };
}`;
    }

    // Static .htaccess configuration for cPanel
    return `# WordPress hostingidagi alohida papka uchun .htaccess (masalan: public_html/app/)
# Bu konfiguratsiya React Router va Vite statik fayllarini to'g'ri yo'naltiradi.

<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /app/
  
  # Agar fayl yoki papka mavjud bo'lsa, to'g'ridan-to'g'ri ochish
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  
  # Qolgan barcha yo'nalishlarni index.html ga yo'naltirish
  RewriteRule ^(.*)$ /app/index.html [L,QSA]
</IfModule>

# Xavfsizlik va keshlash (Cache-Control)
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/html "access plus 0 seconds"
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
</IfModule>`;
  };

  const handleCopy = () => {
    const text = generateSnippet();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="generator" className="py-20 border-b border-neutral-800 bg-neutral-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2">
            {isUz ? 'Interaktiv Konfigurator' : 'Interactive Configurator'}
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white mb-4">
            {isUz
              ? 'WordPress Integratsiya Kod Generatori'
              : 'WordPress Integration Code Generator'}
          </h2>
          <p className="text-base text-neutral-400 leading-relaxed">
            {isUz
              ? 'Parametrlarni o\'zingizga moslang va WordPress uchun tayyor kodni bir tugma bilan nusxalab oling.'
              : 'Tailor your embed dimensions and copy verified, production-ready WordPress code in one click.'}
          </p>
        </div>

        {/* Method selector tabs */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-neutral-900 border border-neutral-800 rounded-xl mb-8">
          {[
            { id: 'iframe', labelUz: '01. Gutenberg / Elementor HTML', labelEn: '01. Gutenberg / Elementor HTML' },
            { id: 'shortcode', labelUz: '02. WordPress Shortcode (PHP)', labelEn: '02. WP Shortcode (PHP)' },
            { id: 'headless', labelUz: '03. Headless REST API (React)', labelEn: '03. Headless REST API (React)' },
            { id: 'static', labelUz: '04. cPanel / .htaccess Fayli', labelEn: '04. cPanel / .htaccess Config' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => onMethodChange(tab.id)}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                selectedMethod === tab.id
                  ? 'bg-emerald-400 text-neutral-950 shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {isUz ? tab.labelUz : tab.labelEn}
            </button>
          ))}
        </div>

        {/* Configuration & Output Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Panel (4 columns) */}
          <div className="lg:col-span-4 rounded-xl border border-neutral-800 bg-neutral-900/60 p-6 space-y-5">
            <div className="flex items-center gap-2 text-sm font-semibold text-white pb-3 border-b border-neutral-800">
              <Sliders className="w-4 h-4 text-emerald-400" />
              <span>{isUz ? 'Moslashtirish parametrlari' : 'Embed Parameters'}</span>
            </div>

            {/* App URL input */}
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                {isUz ? 'Ilova havolasi (AI Studio yoki Web URL)' : 'Application URL'}
              </label>
              <input
                type="text"
                value={appUrl}
                onChange={(e) => setAppUrl(e.target.value)}
                placeholder="https://ais-pre-...run.app"
                className="w-full px-3 py-2 text-xs font-mono bg-neutral-950 border border-neutral-800 rounded-lg text-white placeholder-neutral-600 focus:outline-none focus:border-emerald-500"
              />
              <span className="block text-[11px] text-neutral-400 mt-1">
                {isUz ? 'Joriy ilovangiz havolasi avtomatik kiritilgan' : 'Defaulted to current application instance'}
              </span>
            </div>

            {/* App Title input */}
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                {isUz ? 'Ilova sarlavhasi (Title)' : 'Embed Title'}
              </label>
              <input
                type="text"
                value={appTitle}
                onChange={(e) => setAppTitle(e.target.value)}
                placeholder="Mening ilovam"
                className="w-full px-3 py-2 text-xs bg-neutral-950 border border-neutral-800 rounded-lg text-white placeholder-neutral-600 focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Height input */}
            <div>
              <div className="flex items-center justify-between text-xs font-medium text-neutral-300 mb-1.5">
                <span>{isUz ? 'Balandlik (Height)' : 'Frame Height'}</span>
                <span className="font-mono text-emerald-400 font-bold">{height}px</span>
              </div>
              <input
                type="range"
                min="450"
                max="1200"
                step="25"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full accent-emerald-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-neutral-400 font-mono mt-1">
                <span>450px</span>
                <span>750px (tavsiya)</span>
                <span>1200px</span>
              </div>
            </div>

            {/* Border Radius */}
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                {isUz ? 'Burchak yumaloqligi (Radius)' : 'Border Radius'}
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { label: '0px', val: '0' },
                  { label: '8px', val: '8' },
                  { label: '12px', val: '12' },
                  { label: '16px', val: '16' }
                ].map((item) => (
                  <button
                    key={item.val}
                    type="button"
                    onClick={() => setBorderRadius(item.val)}
                    className={`py-1.5 text-xs font-mono rounded border transition-colors ${
                      borderRadius === item.val
                        ? 'bg-neutral-800 border-emerald-500 text-emerald-400 font-bold'
                        : 'border-neutral-800 text-neutral-400 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Checkboxes */}
            <div className="pt-2 space-y-3 border-t border-neutral-800/80">
              <label className="flex items-center gap-2.5 text-xs text-neutral-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasShadow}
                  onChange={(e) => setHasShadow(e.target.checked)}
                  className="rounded border-neutral-700 bg-neutral-950 text-emerald-500 focus:ring-emerald-400"
                />
                <span>{isUz ? 'Yumshoq soya (Soft Shadow) effekti' : 'Include subtle container shadow'}</span>
              </label>

              <label className="flex items-center gap-2.5 text-xs text-neutral-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={allowFullscreen}
                  onChange={(e) => setAllowFullscreen(e.target.checked)}
                  className="rounded border-neutral-700 bg-neutral-950 text-emerald-500 focus:ring-emerald-400"
                />
                <span>{isUz ? 'To\'liq ekran ruxsati (Fullscreen)' : 'Grant Fullscreen & permissions'}</span>
              </label>
            </div>
          </div>

          {/* Code Output & Live Preview Panel (8 columns) */}
          <div className="lg:col-span-8 rounded-xl border border-neutral-800 bg-neutral-950 overflow-hidden">
            {/* Header with Code vs Preview Toggle */}
            <div className="px-5 py-3 border-b border-neutral-800 bg-neutral-900/60 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('code')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                    activeTab === 'code'
                      ? 'bg-neutral-800 text-emerald-400'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>{isUz ? 'Kod ko\'rinishi' : 'Code View'}</span>
                </button>

                {selectedMethod === 'iframe' && (
                  <button
                    onClick={() => setActiveTab('preview')}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                      activeTab === 'preview'
                        ? 'bg-neutral-800 text-emerald-400'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>{isUz ? 'WordPress-dagi jonli simulyatsiya' : 'Live Preview'}</span>
                  </button>
                )}
              </div>

              {/* Copy Code button */}
              <div className="flex items-center gap-2">
                {activeTab === 'preview' && (
                  <div className="flex items-center bg-neutral-950 border border-neutral-800 rounded-md p-0.5 mr-2">
                    <button
                      onClick={() => setPreviewDevice('desktop')}
                      className={`p-1 rounded ${previewDevice === 'desktop' ? 'bg-neutral-800 text-white' : 'text-neutral-400'}`}
                      title="Desktop view"
                    >
                      <Monitor className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setPreviewDevice('mobile')}
                      className={`p-1 rounded ${previewDevice === 'mobile' ? 'bg-neutral-800 text-white' : 'text-neutral-400'}`}
                      title="Mobile view"
                    >
                      <Smartphone className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                <button
                  onClick={handleCopy}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                    copied
                      ? 'bg-emerald-500 text-neutral-950 font-bold'
                      : 'bg-emerald-400 text-neutral-950 hover:bg-emerald-300'
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>{isUz ? 'Nusxalandi!' : 'Copied!'}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{isUz ? 'Kodni nusxalash' : 'Copy Code'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Tab content */}
            {activeTab === 'code' ? (
              <div className="p-5 font-mono text-xs overflow-x-auto bg-neutral-950 max-h-[500px] leading-relaxed">
                <pre className="text-neutral-300">
                  <code>{generateSnippet()}</code>
                </pre>
              </div>
            ) : (
              <div className="p-6 bg-neutral-900/40 flex justify-center items-center min-h-[500px]">
                <div
                  className={`transition-all duration-300 bg-white dark:bg-neutral-900 rounded-xl overflow-hidden shadow-2xl border border-neutral-800 ${
                    previewDevice === 'mobile' ? 'w-[375px]' : 'w-full'
                  }`}
                >
                  {/* WordPress simulated post header */}
                  <div className="p-4 border-b border-neutral-800 bg-neutral-950 text-xs flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                      <span className="text-neutral-400 ml-2 font-sans">sizning-sayt.uz/ilova-sahifasi</span>
                    </div>
                    <span className="text-neutral-400 font-sans">{isUz ? 'WordPress mavzusi' : 'WP Theme'}</span>
                  </div>

                  {/* Rendered simulated iframe container */}
                  <div className="p-4 bg-neutral-950/90">
                    <div
                      style={{
                        borderRadius: `${borderRadius}px`,
                        height: previewDevice === 'mobile' ? '450px' : `${Math.min(parseInt(height, 10), 550)}px`,
                        boxShadow: hasShadow ? '0 10px 25px -5px rgba(0, 0, 0, 0.4)' : 'none'
                      }}
                      className="w-full overflow-hidden border border-neutral-800 relative bg-neutral-950"
                    >
                      <iframe
                        src={appUrl}
                        title={appTitle}
                        className="w-full h-full border-0"
                        allow="clipboard-write"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Quick guide bottom strip */}
            <div className="px-5 py-3 border-t border-neutral-800/80 bg-neutral-900/40 flex items-center justify-between text-xs text-neutral-400">
              <span>
                {selectedMethod === 'iframe' && (isUz ? 'Gutenberg: "Maxsus HTML" blokiga joylang' : 'Paste inside Gutenberg "Custom HTML" block')}
                {selectedMethod === 'shortcode' && (isUz ? 'functions.php yoki Code Snippets plaginiga qo\'shing' : 'Place in functions.php or Code Snippets')}
                {selectedMethod === 'headless' && (isUz ? 'React loyihangizda WP REST API bilan integratsiya qiling' : 'Integrate with WP REST API in React')}
                {selectedMethod === 'static' && (isUz ? 'cPanel-dagi /app papkasi ichiga .htaccess sifatida saqlang' : 'Save as .htaccess inside cPanel /app folder')}
              </span>
              <a
                href={appUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-medium"
              >
                <span>{isUz ? 'Ilovani yangi oynada ochish' : 'Open direct link'}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
