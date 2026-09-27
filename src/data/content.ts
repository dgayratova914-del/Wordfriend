import { MethodInfo } from '../types';

export const METHODS_DATA: MethodInfo[] = [
  {
    id: 'iframe',
    number: '01',
    titleUz: 'Iframe / Maxsus HTML bloki',
    titleEn: 'Iframe / Custom HTML Block',
    subtitleUz: 'Eng tezkor va oson usul (2 daqiqa)',
    subtitleEn: 'Fastest & easiest method (2 minutes)',
    difficultyUz: 'Oson (Kod talab qilmaydi)',
    difficultyEn: 'Easy (No coding required)',
    timeUz: '2 daqiqa',
    timeEn: '2 minutes',
    summaryUz: 'AI Studio-da e\'lon qilingan havolani WordPress Gutenberg yoki Elementor sahifasida "Custom HTML" bloki orqali to\'g\'ridan-to\'g\'ri joylashtirish.',
    summaryEn: 'Embed the deployed AI Studio app URL directly into WordPress Gutenberg or Elementor via a Custom HTML block.',
    prosUz: [
      'WordPress fayllariga yoki PHP kodiga tegish shart emas',
      'AI Studio-da o\'zgarish qilsangiz, WordPress-da avtomatik yangilanadi',
      'Elementor, Divi, Gutenberg, Beaver Builder kabi barcha muharrirlar bilan 100% ishlaydi',
      'Ilova mustaqil Cloud Run serverida xavfsiz va tezkor ishlaydi'
    ],
    prosEn: [
      'Zero modification to WordPress core files or PHP code',
      'Changes in AI Studio reflect on WordPress automatically without redeployment',
      'Compatible with Gutenberg, Elementor, Divi, and all major page builders',
      'Runs securely on isolated high-performance Cloud Run instances'
    ],
    whenUz: 'Interaktiv kalkulyatorlar, AI asboblari, dinamik formalar yoki to\'liq alohida ilovalarni WordPress sahifasining bir qismi sifatida ko\'rsatish uchun eng zo\'r yechim.',
    whenEn: 'Best for interactive tools, calculators, AI assistants, and standalone apps embedded inside WordPress posts or pages.'
  },
  {
    id: 'static',
    number: '02',
    titleUz: 'Statik eksport (cPanel / Subdomen)',
    titleEn: 'Static Export (cPanel / Subdomain)',
    subtitleUz: 'O\'z hostingingizda mustaqil ishlatish',
    subtitleEn: 'Host independently on your own server',
    difficultyUz: 'O\'rtacha (FTP / cPanel)',
    difficultyEn: 'Moderate (FTP / cPanel)',
    timeUz: '10 daqiqa',
    timeEn: '10 minutes',
    summaryUz: 'Loyiha kodini yuklab olib, `npm run build` orqali hosil bo\'lgan `dist/` papkasini WordPress hostingingizdagi alohida papkaga (masalan `sayt.uz/app/`) yoki subdomenga (`app.sayt.uz`) joylash.',
    summaryEn: 'Build production static files via `npm run build` and upload the `dist/` folder to your WordPress host directory (e.g. `site.com/app/`) or a subdomain (`app.site.com`).',
    prosUz: [
      'To\'liq o\'z serveringiz nazoratida bo\'ladi',
      'Tashqi havolaga bog\'liq bo\'lmagan mustaqil hosting',
      'Subdomen (app.saytingiz.uz) orqali professional ko\'rinish',
      'Juda tez yuklanadi va WordPress bazasini og\'irlashtirmaydi'
    ],
    prosEn: [
      '100% self-hosted on your own domain and infrastructure',
      'Zero dependency on external preview links',
      'Clean professional branding on subdomains (e.g. app.domain.com)',
      'Blazing fast performance without database overhead'
    ],
    whenUz: 'Agar sizda o\'z domen va cPanel hostingingiz bo\'lsa va ilovani doimiy o\'zingizda saqlamoqchi bo\'lsangiz.',
    whenEn: 'Ideal when you own cPanel/Plesk hosting and want full self-hosted autonomy under your own brand.'
  },
  {
    id: 'headless',
    number: '03',
    titleUz: 'Headless WordPress (REST API)',
    titleEn: 'Headless WordPress (REST API)',
    subtitleUz: 'WordPress CMS + Zamonaviy React Frontend',
    subtitleEn: 'WordPress CMS + Modern React Frontend',
    difficultyUz: 'Dasturchilar uchun (API ulanish)',
    difficultyEn: 'Developer level (API connection)',
    timeUz: '15 daqiqa',
    timeEn: '15 minutes',
    summaryUz: 'WordPress faqat ma\'lumotlar ombori va admin panel (CMS) bo\'ladi. Bu yerda yaratilgan React sayt esa WordPress REST API orqali maqolalar, yangiliklar va mahsulotlarni real vaqtda tortib oladi.',
    summaryEn: 'WordPress acts as your headless CMS backend, while this React frontend dynamically consumes posts, media, and WooCommerce products via standard WP REST API.',
    prosUz: [
      'Maksimal tezlik va ultra zamonaviy foydalanuvchi interfeysi (UI)',
      'WordPress admin panelidan yangi maqola yoki mahsulot qo\'shilganda React-da avtomatik chiqadi',
      'Xavfsizlik darajasi juda yuqori (WordPress backend yashirin turishi mumkin)',
      'WooCommerce bilan zamonaviy e-tijorat yaratish imkoniyati'
    ],
    prosEn: [
      'Maximum rendering speed and modern reactive UI experience',
      'Content edited in WordPress admin instantly updates the React application',
      'Superior security because the WordPress core backend can be protected',
      'Great foundation for headless WooCommerce and content platforms'
    ],
    whenUz: 'Eski WordPress shablonlaridan voz kechib, tezkor va zamonaviy web ilova yaratishni, lekin kontentni WordPress admin panelidan boshqarishni istasangiz.',
    whenEn: 'Best if you want the power of modern React UI while retaining WordPress content management.'
  },
  {
    id: 'shortcode',
    number: '04',
    titleUz: 'WordPress Shortcode / Plagin',
    titleEn: 'WordPress Shortcode / Plugin',
    subtitleUz: 'Mavzuga integratsiya qilish [aistudio_app]',
    subtitleEn: 'Theme integration with [aistudio_app]',
    difficultyUz: 'Oson-O\'rtacha (functions.php)',
    difficultyEn: 'Easy-Moderate (functions.php)',
    timeUz: '5 daqiqa',
    timeEn: '5 minutes',
    summaryUz: 'WordPress mavzusining `functions.php` fayliga yoki "Code Snippets" plaginiga kichik PHP funksiya qo\'shib, saytning xohlagan joyida `[aistudio_app]` qisqa kodini ishlatish.',
    summaryEn: 'Add a compact PHP snippet to your theme functions or Code Snippets plugin, then drop `[aistudio_app]` into any post, widget, or page.',
    prosUz: [
      'Sayt muharrirlari har safar uzun HTML kod yozishi shart emas',
      'Bitta joydan barcha sahifalardagi ilova sozlamalarini boshqarish mumkin',
      'Balandlik va parametrlarni shortcode orqali o\'zgartirish: [aistudio_app height="800px"]',
      'WordPress vidjetlari va yon panel (sidebar)da ham qulay ishlaydi'
    ],
    prosEn: [
      'Content editors simply type [aistudio_app] without touching raw HTML',
      'Centrally managed configuration across all pages',
      'Customizable attributes like [aistudio_app height="850px"]',
      'Works in page content, headers, footers, and sidebar widgets'
    ],
    whenUz: 'Bir nechta sahifada yoki blog postlarida ilovani tez-tez ishlatish kerak bo\'lganda.',
    whenEn: 'Best when non-technical team members need to reuse the app across multiple pages.'
  }
];

export const STEP_BY_STEP_GUIDES = {
  gutenberg: {
    titleUz: 'Gutenberg (WordPress standart blok muharriri)',
    titleEn: 'Gutenberg Block Editor',
    stepsUz: [
      'WordPress admin paneliga kiring (odatda: sizning-sayt.uz/wp-admin)',
      'Chap menyudan "Sahifalar" (Pages) -> "Yangi qo\'shish" (Add New) ni bosing',
      'Blok qo\'shish tugmasi "+" ni bosing va qidiruvga "Maxsus HTML" (Custom HTML) deb yozing',
      'Quyidagi Kod Generatordan olingan HTML kodni blok ichiga joylashtiring',
      '"Ko\'rib chiqish" (Preview) tugmasini bosing va ilovangiz sahifada qanday ishlashini tekshiring',
      'Hammasi tayyor bo\'lgach, "E\'lon qilish" (Publish) tugmasini bosing!'
    ],
    stepsEn: [
      'Log into your WordPress Dashboard (usually: yourdomain.com/wp-admin)',
      'Navigate to Pages -> Add New Page in the sidebar',
      'Click the "+" block inserter and search for "Custom HTML"',
      'Paste the generated embed code from the generator below into the block',
      'Click "Preview" to verify responsive loading inside your theme',
      'Click "Publish" or "Update" to make it live for visitors!'
    ]
  },
  elementor: {
    titleUz: 'Elementor sahifa konstruktori',
    titleEn: 'Elementor Page Builder',
    stepsUz: [
      'O\'zgartirmoqchi bo\'lgan sahifangizni oching va "Edit with Elementor" tugmasini bosing',
      'Chap paneldagi vidjetlar qidiruviga "HTML" deb yozing',
      '"HTML" vidjetini sichqoncha bilan sahifaning kerakli bo\'limiga sudrab tashlang',
      'Chap paneldagi "HTML Code" maydoniga quyidagi generatordan olingan kodni kiriting',
      'Sahifa kengligini moslashtirish uchun bo\'lim (Section) sozlamalarida "Full Width" yoki "Boxed" tanlang',
      'Pastdagi yashil "Update" (Yangilash) tugmasini bosing'
    ],
    stepsEn: [
      'Open your target page and click "Edit with Elementor"',
      'Search for "HTML" in the left-hand widgets panel',
      'Drag and drop the HTML widget into your desired section or column',
      'Paste the generated code from the generator into the HTML Code input',
      'Optionally set section width to "Full Width" or "Boxed" for preferred margins',
      'Click "Update" at the bottom to publish changes'
    ]
  },
  cpanel: {
    titleUz: 'cPanel / FileZilla orqali statik yuklash',
    titleEn: 'cPanel / FileZilla Static Upload',
    stepsUz: [
      'AI Studio loyihangizni yuklab oling va terminalda `npm run build` buyrug\'ini bajaring',
      'Natijada loyiha ichida `dist` nomli tayyor papka paydo bo\'ladi',
      'cPanel File Manager yoki FileZilla orqali hostingingizga kiring',
      '`public_html` ichida yangi papka oching (masalan, `app` yoki `portal`)',
      '`dist` papkasi ichidagi barcha fayllarni (index.html, assets/ va boshqalar) shu yangi papkaga yuklang',
      'Brauzerda `saytingiz.uz/app/` manzilini oching — ilova sizning domeningizda mustaqil ishga tushadi!'
    ],
    stepsEn: [
      'Download your repository and run `npm run build` in your terminal',
      'A production-ready `dist` folder will be generated with bundled assets',
      'Access your hosting server using cPanel File Manager or FTP (FileZilla)',
      'Under `public_html`, create a folder (e.g. `app` or `calculator`)',
      'Upload all files inside `dist/` directly into this created folder',
      'Visit `yourdomain.com/app/` in your browser — your app is live on your domain!'
    ]
  }
};

export const FAQ_DATA = [
  {
    qUz: 'Mobil telefonlarda ilova qanday ko\'rinadi?',
    qEn: 'How does it display on mobile devices?',
    aUz: 'Bizning generator beradigan iframe kodi `width: 100%` va zamonaviy responsive CSS bilan ta\'minlangan. Shu sababli ilova smartfon, planshet va kompyuter ekranlariga avtomatik ravishda to\'liq moslashadi.',
    aEn: 'The generated embed code uses 100% flexible responsive styling with viewport-adaptive scaling, ensuring seamless usability on mobile, tablet, and desktop.'
  },
  {
    qUz: 'WordPress.com (bepul tarif) da iframe ishlaydimi?',
    qEn: 'Does this work on free WordPress.com plans?',
    aUz: 'WordPress.com ning bepul tarifida xavfsizlik cheklovlari tufayli iframe taqiqlangan. Lekin shaxsiy hostingdagi WordPress (WordPress.org - eng ommabopi) yoki WordPress.com Business tarifida hech qanday cheklovlarsiz 100% ishlaydi.',
    aEn: 'Self-hosted WordPress (WordPress.org, used by 95%+ of sites) and WordPress.com Business plans support it with zero restrictions. Free WordPress.com personal tiers restrict custom iframes.'
  },
  {
    qUz: 'Google qidiruv tizimi (SEO) ga ta\'siri qanday?',
    qEn: 'How does this affect Google SEO rankings?',
    aUz: 'Agar siz ilovani sahifangizga qo\'shsangiz, foydalanuvchilar ilovadan foydalanib sahifangizda ko\'proq vaqt o\'tkazadi (Time on Site ko\'payadi), bu esa SEO reytingingizni oshiradi. Agar sizga to\'g\'ridan-to\'g\'ri sahifa matnini indekslash kerak bo\'lsa, Headless REST API usuli tavsiya etiladi.',
    aEn: 'Embedded interactive tools significantly boost user dwell time, signaling high content quality to Google algorithms. For direct HTML indexation of text, the Headless REST API approach is recommended.'
  },
  {
    qUz: 'WordPress ma\'lumotlar bazasiga ma\'lumot yozish yoki o\'qish mumkinmi?',
    qEn: 'Can the app read and write to the WordPress database?',
    aUz: 'Ha! WordPress o\'zining standart REST API (`/wp-json/wp/v2/`) interfeysiga ega. React ilovasi orqali WordPress maqolalari, izohlar, formalar yoki WooCommerce buyurtmalari bilan ikki tomonlama ma\'lumot almashish mumkin.',
    aEn: 'Yes! WordPress provides a comprehensive REST API endpoint structure. Your React app can read posts, submit forms, or query WooCommerce store data dynamically.'
  }
];
