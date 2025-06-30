import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { TRANSLATIONS } from './translations';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

type RouteType = 'home' | 'legal' | 'privacy';
type Language = 'de' | 'en';

@Injectable({
  providedIn: 'root'
})

export class LanguageService {
  private router = inject(Router);
  private currentLanguage = new BehaviorSubject<Language>('de');
  public currentLanguage$ = this.currentLanguage.asObservable();
  private translations = TRANSLATIONS;

  private routeCache = new Map<string, string>();
  private translationCache = new Map<string, string>();

  private scrollToSectionSubject = new Subject<string>();  
  public scrollToSection$ = this.scrollToSectionSubject.asObservable();

  private static readonly ROUTE_CONFIG: Record<RouteType, Record<Language, string>> = {
    legal: { en: '/legal-notice', de: '/impressum' },
    privacy: { en: '/privacy-policy', de: '/datenschutz' },
    home: { en: '/en', de: '/' }
  };

  private static readonly URL_TO_ROUTE_TYPE: Record<string, RouteType> = {
    '/': 'home',
    '/en': 'home', 
    '/legal-notice': 'legal',
    '/impressum': 'legal',
    '/privacy-policy': 'privacy',
    '/datenschutz': 'privacy'
  };

  constructor() {
    this.initializeLanguage();
    this.warmRouteCache();
    this.warmTranslationCache();
    this.subscribeToRouteChanges();
  }

  getCurrentLanguage(): Language {
    return this.currentLanguage.value;
  }

  getLegalNoticeRoute(): string {
  return this.currentLanguage.value === 'en' ? '/legal-notice' : '/impressum';
  }

  getPrivacyRoute(): string {
    return this.currentLanguage.value === 'en' ? '/privacy-policy' : '/datenschutz';
  }

  getHomeRoute(): string {
    return this.currentLanguage.value === 'en' ? '/en' : '/';
  }
 
  switchLanguage(lang: Language) {
    const currentRoute = this.getCurrentPageType();
    this.currentLanguage.next(lang);
    if (typeof window !== 'undefined') localStorage.setItem('selectedLanguage', lang);
    const newRoute = this.getRouteForLanguageAndPage(lang, currentRoute);
    this.router.navigate([newRoute]);
  }

  private getRouteForLanguageAndPage(lang: Language, pageType: RouteType): string {
    const cacheKey = `${lang}-${pageType}`;
    return this.routeCache.get(cacheKey) || '/';
  }

  private getCurrentPageType(): RouteType {
    const url = this.router.url;
    const cleanUrl = url.split('?')[0].split('#')[0];
    return LanguageService.URL_TO_ROUTE_TYPE[cleanUrl] || 'home';
  }

  getTranslation(key: string): string {
    const lang = this.currentLanguage.value;
    const cacheKey = `${lang}-${key}`;
    const cachedTranslation = this.translationCache.get(cacheKey);
    if (cachedTranslation) return cachedTranslation;
    if (typeof window !== 'undefined') console.warn(`Translation missing for key: ${key} in language: ${lang}`);
    return this.handleTranslationMiss(lang, key, cacheKey);
  }

  private handleTranslationMiss(lang: Language, key: string, cacheKey: string): string {
    const translation = this.getAndCacheDirectTranslation(lang, key, cacheKey);
    if (translation) return translation;
    const fallback = this.getAndCacheFallbackTranslation(lang, key, cacheKey);
    if (fallback) return fallback;
    this.translationCache.set(cacheKey, key);
    return key;
  }

  private getAndCacheDirectTranslation(lang: Language, key: string, cacheKey: string): string | null {
    const translation = this.translations[lang]?.[key];
    if (translation) {
      this.translationCache.set(cacheKey, translation);
      return translation;
    }
    return null;
  }

  private getAndCacheFallbackTranslation(lang: Language, key: string, cacheKey: string): string | null {
    const fallbackLang: Language = lang === 'de' ? 'en' : 'de';
    const fallbackCacheKey = `${fallbackLang}-${key}`;
    let fallbackTranslation = this.translationCache.get(fallbackCacheKey);
    if (!fallbackTranslation) {
      fallbackTranslation = this.translations[fallbackLang]?.[key];
      if (fallbackTranslation) this.translationCache.set(fallbackCacheKey, fallbackTranslation);
    }
    if (fallbackTranslation) {
      if (typeof window !== 'undefined') console.info(`Using fallback translation from ${fallbackLang} for key: ${key}`);
      this.translationCache.set(cacheKey, fallbackTranslation);
      return fallbackTranslation;
    }
    return null;
  }

  private warmRouteCache(): void {
    Object.entries(LanguageService.ROUTE_CONFIG).forEach(([routeType, langRoutes]) => {
      Object.entries(langRoutes).forEach(([lang, route]) => {
        const cacheKey = `${lang}-${routeType}`;
        this.routeCache.set(cacheKey, route);
      });
    });
  }

  private warmTranslationCache(): void {
    Object.entries(this.translations).forEach(([lang, translations]) => {
      Object.entries(translations).forEach(([key, value]) => {
        const cacheKey = `${lang}-${key}`;
        this.translationCache.set(cacheKey, value);
      });
    });
  }

  private initializeLanguage() {
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('selectedLanguage') as Language;
      if (savedLang && ['de', 'en'].includes(savedLang)) {
        this.currentLanguage.next(savedLang);
        const currentPageType = this.getCurrentPageType();
        const correctRoute = this.getRouteForLanguageAndPage(savedLang, currentPageType);
        if (this.router.url !== correctRoute) console.info(`Language mismatch detected. Expected: ${correctRoute}, Current: ${this.router.url}`);
      }
    }
  }

  private subscribeToRouteChanges(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.syncLanguageWithUrl(event.url);
      });
  }

  private syncLanguageWithUrl(url: string): void {
    const urlLang = this.extractLanguageFromUrl(url);
    const currentLang = this.currentLanguage.value;
    if (urlLang && urlLang !== currentLang) {
      this.currentLanguage.next(urlLang);
      if (typeof window !== 'undefined') localStorage.setItem('selectedLanguage', urlLang);
    }
  }

  private extractLanguageFromUrl(url: string): Language | null {
    const englishRoutes = ['/legal-notice', '/privacy-policy', '/en'];
    const germanRoutes = ['/impressum', '/datenschutz', '/'];
    const cleanUrl = url.split('?')[0].split('#')[0];
    if (englishRoutes.some(route => cleanUrl === route || cleanUrl.startsWith(route))) return 'en';
    if (germanRoutes.some(route => cleanUrl === route || cleanUrl.startsWith(route))) return 'de';
    return null;
  }

  navigateToHomeSection(sectionId: string) {
    const homeRoute = this.getHomeRoute();
    this.router.navigate([homeRoute]).then(() => {
      setTimeout(() => {
        this.scrollToSectionSubject.next(sectionId); 
      }, 100);
    });
  }

  navigateToHomeWithoutScroll() {
    const homeRoute = this.getHomeRoute();
    this.router.navigate([homeRoute]);
  }
}




