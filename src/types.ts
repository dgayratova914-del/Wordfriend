export type Language = 'uz' | 'en';

export interface MethodInfo {
  id: string;
  number: string;
  titleUz: string;
  titleEn: string;
  subtitleUz: string;
  subtitleEn: string;
  difficultyUz: string;
  difficultyEn: string;
  timeUz: string;
  timeEn: string;
  summaryUz: string;
  summaryEn: string;
  prosUz: string[];
  prosEn: string[];
  whenUz: string;
  whenEn: string;
}

export interface WpPostItem {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  link: string;
  authorName?: string;
  featuredMediaUrl?: string;
}
