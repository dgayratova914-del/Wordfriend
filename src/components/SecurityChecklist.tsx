import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  AlertTriangle, 
  Key, 
  Lock, 
  Terminal, 
  FileCheck, 
  RefreshCw,
  Info,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { Language } from '../types';

interface SecurityChecklistProps {
  language: Language;
  selectedMethod: string;
  onMethodChange: (method: string) => void;
}

interface ChecklistItem {
  id: string;
  severity: 'critical' | 'warning' | 'info';
  titleUz: string;
  titleEn: string;
  descUz: string;
  descEn: string;
  codeSnippet?: string;
  actionHintUz?: string;
  actionHintEn?: string;
}

export const SecurityChecklist: React.FC<SecurityChecklistProps> = ({
  language,
  selectedMethod,
  onMethodChange
}) => {
  const isUz = language === 'uz';
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const toggleCheck = (id: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const getMethodName = (m: string) => {
    switch (m) {
      case 'iframe':
        return isUz ? '01. Iframe & Gutenberg / Elementor' : '01. Iframe & Page Builders';
      case 'shortcode':
        return isUz ? '02. WordPress Shortcode (PHP)' : '02. WP Shortcode (PHP)';
      case 'headless':
        return isUz ? '03. Headless REST API (React + WP)' : '03. Headless REST API';
      case 'static':
        return isUz ? '04. Statik hosting (cPanel / Subdomen)' : '04. Static Hosting (cPanel)';
      default:
        return m;
    }
  };

  // Method-specific dynamic security rules
  const checklistData: Record<string, ChecklistItem[]> = {
    iframe: [
      {
        id: 'iframe_sandbox',
        severity: 'critical',
        titleUz: 'Iframe Sandbox ruxsatlarini minimal darajada saqlash',
        titleEn: 'Strict Iframe Sandboxing & Feature Policy',
        descUz: 'Agar ilovangizga kamera yoki mikrofondan foydalanish kerak bo\'lmasa, ularga ortiqcha ruxsat bermang. Faqat kerakli parametrlar (masalan, `clipboard-write`) bilan cheklang.',
        descEn: 'Avoid over-permissive feature policies. If the embedded app does not require webcam or geolocation, restrict permissions to only what is necessary.',
        codeSnippet: `<!-- Xavfsiz atributlar to'plami -->
<iframe 
  src="..." 
  sandbox="allow-scripts allow-same-origin allow-forms allow-popups" 
  allow="clipboard-write"
  loading="lazy"
></iframe>`
      },
      {
        id: 'iframe_csp',
        severity: 'warning',
        titleUz: 'Content Security Policy (CSP) & X-Frame-Options',
        titleEn: 'CSP frame-ancestors & X-Frame-Options Verification',
        descUz: 'Ilova serveringiz (Cloud Run) sarlavhalarida sizning WordPress domeningizga iframedan yuklanishga ruxsat berilganligini tekshiring. Clickjacking hujumlaridan himoyalanish uchun ruxsat etilgan domenlarni ko\'rsating.',
        descEn: 'Ensure your app host permits your WordPress domain in CSP headers. Use frame-ancestors directives to prevent clickjacking from unauthorized third-party sites.',
        codeSnippet: `Content-Security-Policy: frame-ancestors 'self' https://sizning-sayt.uz https://*.sizning-sayt.uz;`
      },
      {
        id: 'iframe_ssl',
        severity: 'critical',
        titleUz: 'HTTPS / Aralash kontent (Mixed Content) xatosi',
        titleEn: 'HTTPS Uniformity (Mixed Content Prevention)',
        descUz: 'Agar sizning WordPress saytingiz HTTPS (SSL sertifikati) orqali ishlasa, kiritilayotgan ilova havolasi ham majburiy `https://` bo\'lishi shart. Aks holda brauzerlar xavfsizlik sababli ilovani bloklaydi.',
        descEn: 'If WordPress runs on HTTPS, your embedded URL MUST use https://. Browsers automatically block insecure HTTP embeds within secure HTTPS origins.'
      },
      {
        id: 'iframe_postmessage',
        severity: 'info',
        titleUz: 'postMessage xavfsizligi (Parent-Iframe aloqasi)',
        titleEn: 'postMessage Origin Verification',
        descUz: 'Agar WordPress va ilova o\'rtasida `window.postMessage` orqali ma\'lumot uzatilsa, doimo `event.origin` orqali manzilning ishonchli ekanligini tasdiqlang.',
        descEn: 'When communicating across frame boundaries via postMessage, always explicitly validate event.origin against your known WordPress hostname.'
      }
    ],
    headless: [
      {
        id: 'headless_apikey',
        severity: 'critical',
        titleUz: 'API kalitlari va maxfiy ma\'lumotlarni brauzerda fosh qilmaslik',
        titleEn: 'Never Expose Private WordPress Keys in Frontend JS',
        descUz: 'WordPress Application Passwords yoki maxfiy tokenlarni hech qachon client-side (React kodi) ichiga qattiq yozib qo\'ymang. Maxfiy amallar server orqali (/api/proxy) bajarilishi lozim.',
        descEn: 'Never bake administrative credentials or Application Passwords into client-side JS. Use a backend server proxy or read-only public endpoints.',
        codeSnippet: `// ❌ XATO: React frontend ichida admin parolini saqlash
const auth = "Basic " + btoa("admin:parol123"); 

// ✅ TO'G'RI: Faqat ochiq o'qish (Read-only GET) yoki server orqali so'rov yuborish
const res = await fetch("/wp-json/wp/v2/posts?per_page=5");`
      },
      {
        id: 'headless_cors',
        severity: 'warning',
        titleUz: 'CORS (Cross-Origin Resource Sharing) xavfsiz konfiguratsiyasi',
        titleEn: 'Strict CORS Origin Whitelisting in WordPress',
        descUz: 'WordPress serverida CORS uchun `Access-Control-Allow-Origin: *` o\'rniga faqat sizning React ilovangiz joylashgan domenni ko\'rsating. Bu begona saytlarning sizning nomingizdan API so\'rov jo\'natishini to\'xtatadi.',
        descEn: 'Avoid wildcard CORS origins (`*`) for authenticated endpoints. Restrict Access-Control-Allow-Origin to your exact production React domain.',
        codeSnippet: `// WordPress functions.php uchun xavfsiz CORS filtri:
add_action( 'rest_api_init', function() {
    remove_filter( 'rest_pre_serve_request', 'rest_send_cors_headers' );
    add_filter( 'rest_pre_serve_request', function( $value ) {
        header( 'Access-Control-Allow-Origin: https://app.sizning-sayt.uz' );
        header( 'Access-Control-Allow-Methods: GET, POST, OPTIONS' );
        header( 'Access-Control-Allow-Credentials: true' );
        return $value;
    });
});`
      },
      {
        id: 'headless_ratelimit',
        severity: 'warning',
        titleUz: 'WordPress REST API Rate Limiting (DDoS himoyasi)',
        titleEn: 'REST API Rate Limiting & Abuse Prevention',
        descUz: 'WordPress API nuqtalarini spam va botlar haddan tashqari ko\'p so\'rov bilan og\'irlashtirmasligi uchun Cloudflare yoki Wordfence orqali so\'rovlar tezligini cheklang (Rate limiting).',
        descEn: 'Protect your WordPress origin server from API exhaustion attacks using Cloudflare Rate Limiting or security plugins like Wordfence / Defender.'
      },
      {
        id: 'headless_sanitize',
        severity: 'info',
        titleUz: 'XSS himoyasi va ma\'lumotlarni tozalash (Sanitization)',
        titleEn: 'DOMPurify / Safe HTML Rendering in React',
        descUz: 'WordPress maqolalarining `content.rendered` matnini React-da `dangerouslySetInnerHTML` bilan chiqarishdan oldin doimo `DOMPurify` yordamida zararli skriptlardan tozalang.',
        descEn: 'Always sanitize WordPress rendered HTML output with DOMPurify prior to passing to dangerouslySetInnerHTML to prevent cross-site scripting (XSS).'
      }
    ],
    shortcode: [
      {
        id: 'shortcode_escaping',
        severity: 'critical',
        titleUz: 'PHP Parametrlarini majburiy himoyalash (esc_attr & esc_url)',
        titleEn: 'Strict Attribute Escaping in PHP (esc_url / esc_attr)',
        descUz: 'Shortcode atributlariga kiritiladigan qiymatlar to\'g\'ridan-to\'g\'ri HTML-ga yozilmasligi kerak. XSS buzilishining oldini olish uchun `esc_url()` va `esc_attr()` funksiyalaridan foydalaning.',
        descEn: 'All user-supplied shortcode attributes must be sanitized using esc_url() for URLs and esc_attr() for dimension inputs to prevent injection attacks.',
        codeSnippet: `// ✅ Xavfsiz parametr ishlov berish:
$url    = esc_url( $atts['url'] );
$height = esc_attr( $atts['height'] );
$title  = esc_attr( $atts['title'] );`
      },
      {
        id: 'shortcode_capability',
        severity: 'warning',
        titleUz: 'Rol va huquqlar tekshiruvi (Role & Capabilities)',
        titleEn: 'Editor Privileges & Script Access',
        descUz: 'Agar shortcode orqali saytga kod qo\'shilayotgan bo\'lsa, WordPress-da faqat Administrator va Muharrir (Editor) darajasidagi foydalanuvchilarga shortcode qo\'shishga ruxsat bering.',
        descEn: 'Ensure non-privileged contributor or subscriber roles cannot inject arbitrary external iframe sources through public comment or submission forms.'
      },
      {
        id: 'shortcode_plugin',
        severity: 'info',
        titleUz: 'functions.php o\'rniga alohida plagin yoki Code Snippets ishlatish',
        titleEn: 'Maintain Code in Snippets or Must-Use Plugins',
        descUz: 'Mavzuni yangilaganingizda (Theme Update) PHP kodingiz o\'chib ketmasligi uchun uni "Code Snippets" plagini orqali yoki shaxsiy child-theme ichida saqlang.',
        descEn: 'To prevent snippet erasure when updating parent WordPress themes, deploy shortcode definitions inside a Child Theme or Code Snippets manager.'
      }
    ],
    static: [
      {
        id: 'static_env',
        severity: 'critical',
        titleUz: 'Eksport qilingan kodda .env va API sirlarini qoldirmaslik',
        titleEn: 'No Unencrypted Secrets in Static Bundles',
        descUz: '`npm run build` orqali yaratilgan statik JavaScript fayllarini har kim ko\'ra oladi (Inspect Elements). Shaxsiy API maxfiy kalitlari (Secret Keys) hech qachon bundle ichida bo\'lmasligi shart.',
        descEn: 'Static bundles are completely visible to client browsers. Never package private tokens, database credentials, or secret keys in Vite client builds.'
      },
      {
        id: 'static_htaccess',
        severity: 'warning',
        titleUz: 'cPanel .htaccess xavfsizlik sarlavhalari (Headers)',
        titleEn: 'cPanel Security Headers & Direct Access Restrictions',
        descUz: 'Statik fayllar joylashgan papka ichidagi `.htaccess` faylida noxush fayl turlarini yashirish va X-Content-Type-Options himoyasini faollashtiring.',
        descEn: 'Apply security headers in the static subfolder .htaccess to prevent MIME-sniffing, clickjacking, and enforce directory index protection.',
        codeSnippet: `<IfModule mod_headers.c>
  Header always set X-Content-Type-Options "nosniff"
  Header always set X-Frame-Options "SAMEORIGIN"
  Header always set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>
Options -Indexes`
      },
      {
        id: 'static_isolation',
        severity: 'info',
        titleUz: 'WordPress bazasi va fayllaridan alohida saqlash',
        titleEn: 'Folder Isolation from WordPress Core',
        descUz: 'Ilovani `wp-admin`, `wp-content` yoki `wp-includes` kabi WordPress tizim papkalari ichiga aralashtirmang. Alohida `public_html/app/` papkasida yoki `app.sayt.uz` subdomenda saqlang.',
        descEn: 'Keep the static app in an isolated directory (e.g. public_html/app/) or dedicated subdomain to avoid collisions with WordPress rewrite rules and plugins.'
      }
    ]
  };

  const currentItems = checklistData[selectedMethod] || checklistData.iframe;
  const totalCount = currentItems.length;
  const completedCount = currentItems.filter(item => checkedItems[item.id]).length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  const getSeverityBadge = (severity: ChecklistItem['severity']) => {
    switch (severity) {
      case 'critical':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 rounded">
            <ShieldAlert className="w-3 h-3" />
            <span>{isUz ? 'Jiddiy xavfsizlik qoidasi' : 'Critical Requirement'}</span>
          </span>
        );
      case 'warning':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded">
            <AlertTriangle className="w-3 h-3" />
            <span>{isUz ? 'Tavsiya etilgan himoya' : 'Recommended Protection'}</span>
          </span>
        );
      case 'info':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded">
            <Info className="w-3 h-3" />
            <span>{isUz ? 'Eng yaxshi amaliyot' : 'Best Practice'}</span>
          </span>
        );
    }
  };

  return (
    <section id="security" className="py-20 border-b border-neutral-800 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{isUz ? 'Dinamik Xavfsizlik Tekshiruvi' : 'Dynamic Security Checklist'}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white mb-4">
              {isUz
                ? 'Integratsiyani xavfsiz va ishonchli amalga oshirish'
                : 'Secure WordPress Integration Checklist'}
            </h2>
            <p className="text-base text-neutral-400 leading-relaxed">
              {isUz
                ? 'Tanlangan integratsiya usuliga qarab maxsus xavfsizlik ogohlantirishlari (API kalitlari xavfsizligi, iframe sandboxing, CORS va SSL qoidalari) avtomatik moslashadi.'
                : 'Dynamic audit checkpoints that update automatically based on your chosen integration method (API key hygiene, iframe sandboxing, CORS whitelisting, and SSL policies).'}
            </p>
          </div>

          {/* Progress Indicator Card */}
          <div className="shrink-0 p-4 rounded-xl border border-neutral-800 bg-neutral-900/60 min-w-[240px]">
            <div className="flex items-center justify-between text-xs text-neutral-400 mb-2">
              <span>{isUz ? 'Tekshiruv holati' : 'Checklist Audit'}</span>
              <span className="font-mono text-emerald-400 font-bold">
                {completedCount} / {totalCount} ({progressPercent}%)
              </span>
            </div>
            <div className="w-full bg-neutral-950 h-2 rounded-full overflow-hidden border border-neutral-800">
              <div 
                className="bg-emerald-400 h-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="text-[11px] text-neutral-400 mt-2 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>
                {completedCount === totalCount
                  ? (isUz ? 'Barcha talablar tekshirildi!' : 'All security items verified!')
                  : (isUz ? 'Barcha bandlarni tasdiqlab chiqing' : 'Review and verify all checkpoints')}
              </span>
            </div>
          </div>
        </div>

        {/* Method switcher strip */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-neutral-900/80 border border-neutral-800 rounded-xl mb-8">
          <span className="text-xs text-neutral-400 px-3 font-medium">
            {isUz ? 'Usul bo\'yicha tekshirish:' : 'Filter by Method:'}
          </span>
          {[
            { id: 'iframe', labelUz: '01. Iframe / Gutenberg', labelEn: '01. Iframe / Builders' },
            { id: 'shortcode', labelUz: '02. Shortcode (PHP)', labelEn: '02. Shortcode (PHP)' },
            { id: 'headless', labelUz: '03. Headless REST API', labelEn: '03. Headless REST API' },
            { id: 'static', labelUz: '04. Statik hosting', labelEn: '04. Static Hosting' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => onMethodChange(tab.id)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                selectedMethod === tab.id
                  ? 'bg-neutral-800 text-emerald-400 border border-emerald-500/40'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {isUz ? tab.labelUz : tab.labelEn}
            </button>
          ))}
        </div>

        {/* Checklist Cards Container */}
        <div className="space-y-5">
          {currentItems.map((item, index) => {
            const isChecked = !!checkedItems[item.id];
            return (
              <div
                key={item.id}
                className={`rounded-xl border transition-all p-6 ${
                  isChecked 
                    ? 'border-emerald-500/30 bg-emerald-950/10' 
                    : 'border-neutral-800 bg-neutral-900/40 hover:border-neutral-700'
                }`}
              >
                <div className="flex flex-col sm:flex-row items-start justify-between gap-4 mb-3">
                  <div className="flex items-start gap-3.5">
                    {/* Custom Checkbox */}
                    <button
                      type="button"
                      onClick={() => toggleCheck(item.id)}
                      className={`mt-1 w-5 h-5 rounded flex items-center justify-center transition-colors shrink-0 ${
                        isChecked
                          ? 'bg-emerald-500 text-neutral-950 font-bold'
                          : 'border border-neutral-700 hover:border-neutral-500 bg-neutral-950'
                      }`}
                      aria-label="Toggle security checkpoint"
                    >
                      {isChecked && <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />}
                    </button>

                    <div>
                      <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
                        <span className="text-xs font-mono font-bold text-neutral-400">
                          #{index + 1}
                        </span>
                        <h3 className={`text-base font-bold ${isChecked ? 'text-neutral-300 line-through' : 'text-white'}`}>
                          {isUz ? item.titleUz : item.titleEn}
                        </h3>
                        {getSeverityBadge(item.severity)}
                      </div>
                      
                      <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal">
                        {isUz ? item.descUz : item.descEn}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleCheck(item.id)}
                    className="self-end sm:self-start shrink-0 text-xs font-medium text-neutral-400 hover:text-white transition-colors"
                  >
                    {isChecked ? (isUz ? 'Qaytarish' : 'Unmark') : (isUz ? 'Bajarildi deb belgilash' : 'Mark as Verified')}
                  </button>
                </div>

                {/* Optional code snippet reference */}
                {item.codeSnippet && (
                  <div className="mt-4 pt-3 border-t border-neutral-800/80">
                    <div className="text-[11px] font-mono text-neutral-400 mb-1.5 flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{isUz ? 'Tavsiya etiladigan xavfsiz kod namunasi:' : 'Recommended secure pattern:'}</span>
                    </div>
                    <pre className="p-3 bg-neutral-950 rounded-lg border border-neutral-800/90 text-xs font-mono text-neutral-300 overflow-x-auto">
                      <code>{item.codeSnippet}</code>
                    </pre>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Global Security Summary Callout */}
        <div className="mt-10 rounded-xl border border-neutral-800 bg-neutral-900/60 p-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white mb-0.5">
                {isUz 
                  ? 'WordPress & React xavfsizlik standarti' 
                  : 'Enterprise WordPress Security Standard'}
              </h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                {isUz 
                  ? 'Ushbu tekshiruv ro\'yxatiga rioya qilish saytingizni XSS, Clickjacking va ruxsatsiz API suiiste\'mollaridan 100% himoya qiladi.' 
                  : 'Adhering to these security checks guarantees safety against XSS, clickjacking, and unauthorized data breaches.'}
              </p>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-3 w-full md:w-auto justify-end">
            <button
              onClick={() => {
                const all: Record<string, boolean> = {};
                currentItems.forEach(i => { all[i.id] = true; });
                setCheckedItems(prev => ({ ...prev, ...all }));
              }}
              className="px-4 py-2 text-xs font-medium text-neutral-300 hover:text-white bg-neutral-800 rounded-lg transition-colors whitespace-nowrap"
            >
              {isUz ? 'Hammasini tasdiqlash' : 'Verify All'}
            </button>
            <button
              onClick={() => setCheckedItems({})}
              className="px-4 py-2 text-xs font-medium text-neutral-400 hover:text-neutral-200 transition-colors whitespace-nowrap"
            >
              {isUz ? 'Tozalash' : 'Reset'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
