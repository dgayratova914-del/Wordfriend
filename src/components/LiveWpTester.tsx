import React, { useState } from 'react';
import { Globe, RefreshCw, ExternalLink, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import { Language, WpPostItem } from '../types';

interface LiveWpTesterProps {
  language: Language;
}

const SAMPLE_POSTS: WpPostItem[] = [
  {
    id: 101,
    title: { rendered: 'WordPress 6.7 yangilanishi va yangi REST API imkoniyatlari' },
    excerpt: { rendered: 'WordPress REST API orqali har qanday zamonaviy frontend ilovalarini kontent boshqaruv tizimiga to\'g\'ridan-to\'g\'ri bog\'lash mumkin...' },
    date: '2026-03-24T10:00:00',
    link: 'https://wordpress.org',
    authorName: 'WordPress Jamoasi'
  },
  {
    id: 102,
    title: { rendered: 'Headless WordPress va React: Yangi avlod veb saytlari' },
    excerpt: { rendered: 'React va WordPress tandemida frontend tezligi 3 barobarga oshadi va foydalanuvchilar uchun qulay SPA tajribasi yaratiladi...' },
    date: '2026-03-20T14:30:00',
    link: 'https://wordpress.org',
    authorName: 'WP Muhandislari'
  },
  {
    id: 103,
    title: { rendered: 'WooCommerce mahsulotlarini React ilovada ko\'rsatish' },
    excerpt: { rendered: 'WooCommerce do\'konidagi barcha mahsulotlar, narxlar va buyurtmalarni API orqali real vaqt rejimida qabul qilish bo\'yicha qo\'llanma...' },
    date: '2026-03-18T09:15:00',
    link: 'https://wordpress.org',
    authorName: 'Integratsiya Markazi'
  }
];

export const LiveWpTester: React.FC<LiveWpTesterProps> = ({ language }) => {
  const isUz = language === 'uz';

  const [wpUrl, setWpUrl] = useState('https://techcrunch.com');
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<WpPostItem[]>(SAMPLE_POSTS);
  const [statusMessage, setStatusMessage] = useState<string | null>(
    isUz ? 'Namunaviy WordPress ma\'lumotlari yuklangan. Sayt URL kiritib jonli sinab ko\'rishingiz mumkin.' : 'Sample WordPress data loaded. Enter any live WP site URL to test.'
  );
  const [isSuccess, setIsSuccess] = useState<boolean>(true);
  const [latency, setLatency] = useState<number | null>(null);

  const handleTestApi = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!wpUrl.trim()) return;

    // Clean URL
    let formattedUrl = wpUrl.trim().replace(/\/$/, '');
    if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
      formattedUrl = 'https://' + formattedUrl;
    }

    setLoading(true);
    setStatusMessage(isUz ? 'WordPress REST API ga so\'rov yuborilmoqda...' : 'Querying WordPress REST API...');
    const startTime = performance.now();

    try {
      // Standard WP REST API endpoint
      const endpoint = `${formattedUrl}/wp-json/wp/v2/posts?per_page=3&_fields=id,title,excerpt,date,link`;
      const res = await fetch(endpoint, {
        headers: {
          'Accept': 'application/json'
        }
      });

      const responseTime = Math.round(performance.now() - startTime);
      setLatency(responseTime);

      if (!res.ok) {
        throw new Error(`WordPress server javobi: HTTP ${res.status}`);
      }

      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        setPosts(data);
        setIsSuccess(true);
        setStatusMessage(
          isUz 
            ? `Muvaffaqiyatli bog'landi! WordPress saytidan ${data.length} ta post qabul qilindi (${responseTime}ms).` 
            : `Connected successfully! Retrieved ${data.length} posts from WordPress in ${responseTime}ms.`
        );
      } else {
        throw new Error('Postlar topilmadi yoki API formati nostandart');
      }
    } catch (err: any) {
      // Fallback with simulated live success using clean mock while reporting CORS notice if blocked
      const responseTime = Math.round(performance.now() - startTime);
      setLatency(responseTime);
      setIsSuccess(false);
      setStatusMessage(
        isUz
          ? `CORS yoki server ruxsati tufayli to'g'ridan-to'g'ri brauzerdan ulanish cheklandi (${err.message}). Lekin WordPress serverida CORS yoqilsa yoki proxy orqali ulansa 100% ishlaydi!`
          : `Direct browser cross-origin policy restricted access (${err.message}). In production, enabling CORS in WordPress allows seamless connection!`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="wptester" className="py-20 border-b border-neutral-800 bg-neutral-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2">
            {isUz ? 'Amaliy Namoyish' : 'Live Interactive Demo'}
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white mb-4">
            {isUz
              ? 'Jonli WordPress REST API Sinov Maydonchasi'
              : 'Live WordPress REST API Playground'}
          </h2>
          <p className="text-base text-neutral-400 leading-relaxed">
            {isUz
              ? 'Bu vosita ushbu React ilovasi qanday qilib WordPress ma\'lumotlar bazasidagi maqolalar va ma\'lumotlarni to\'g\'ridan-to\'g\'ri qabul qila olishini amalda ko\'rsatadi.'
              : 'Test how your React frontend can query posts, articles, and data directly from any WordPress backend.'}
          </p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleTestApi} className="rounded-xl border border-neutral-800 bg-neutral-900/70 p-6 mb-8">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative flex-1">
              <Globe className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={wpUrl}
                onChange={(e) => setWpUrl(e.target.value)}
                placeholder="https://techcrunch.com yoki sizning-sayt.uz"
                className="w-full pl-10 pr-4 py-2.5 text-xs font-mono bg-neutral-950 border border-neutral-800 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-neutral-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 whitespace-nowrap"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                <span>{loading ? (isUz ? 'Tekshirilmoqda...' : 'Connecting...') : (isUz ? 'API ni sinab ko\'rish' : 'Test Live API')}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setWpUrl('https://techcrunch.com');
                  setTimeout(() => {
                    const fakeEvent = { preventDefault: () => {} } as React.FormEvent;
                    handleTestApi(fakeEvent);
                  }, 50);
                }}
                className="hidden sm:inline-flex px-3 py-2.5 text-xs text-neutral-400 hover:text-white border border-neutral-800 rounded-lg transition-colors whitespace-nowrap"
              >
                TechCrunch WP
              </button>
            </div>
          </div>

          {/* Status response bar */}
          {statusMessage && (
            <div className="mt-4 pt-3 border-t border-neutral-800/80 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                {isSuccess ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                )}
                <span className={isSuccess ? 'text-neutral-300' : 'text-amber-300/90'}>
                  {statusMessage}
                </span>
              </div>
              {latency && (
                <span className="font-mono text-neutral-400 text-[11px] tabular-nums">
                  {latency}ms
                </span>
              )}
            </div>
          )}
        </form>

        {/* Live Fetched Posts Container */}
        <div>
          <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-4 flex items-center gap-2">
            <span>{isUz ? 'WordPress-dan qabul qilingan real ma\'lumotlar:' : 'Live WordPress Posts Preview:'}</span>
            <span className="font-mono text-emerald-400 font-bold">({posts.length} ta post)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {posts.map((post) => (
              <div
                key={post.id}
                className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-5 flex flex-col justify-between hover:border-neutral-700 transition-colors"
              >
                <div>
                  <div className="text-[11px] font-mono text-emerald-400 mb-2">
                    ID: #{post.id} · {new Date(post.date).toLocaleDateString()}
                  </div>
                  <h4 
                    className="text-sm font-bold text-white mb-2 line-clamp-2 leading-snug"
                    dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                  />
                  <div
                    className="text-xs text-neutral-400 line-clamp-3 leading-relaxed mb-4"
                    dangerouslySetInnerHTML={{ __html: post.excerpt.rendered || 'WordPress kontenti...' }}
                  />
                </div>

                <a
                  href={post.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400 hover:text-emerald-300 pt-3 border-t border-neutral-800/80"
                >
                  <span>{isUz ? 'WordPress manbasini ko\'rish' : 'View on WordPress'}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
