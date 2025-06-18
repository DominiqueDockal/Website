import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TRANSLATIONS } from '../translations/translations';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private router = inject(Router);
  private currentLanguage = new BehaviorSubject<'de' | 'en'>('de');
  public currentLanguage$ = this.currentLanguage.asObservable();

  private translations = TRANSLATIONS;


  switchLanguage(lang: 'de' | 'en') {
    const currentRoute = this.getCurrentPageType();
    this.currentLanguage.next(lang);
    const newRoute = this.getRouteForLanguageAndPage(lang, currentRoute);
    this.router.navigate([newRoute]);
  }

  getTranslation(key: string): string {
    const lang = this.currentLanguage.value;
    return this.translations[lang][key] || key;
  }

  getCurrentLanguage(): 'de' | 'en' {
    return this.currentLanguage.value;
  }

  getLegalNoticeRoute(): string {
    return this.currentLanguage.value === 'en' ? 'legal-notice' : 'impressum';
  }

  getHomeRoute(): string {
    return '/'; 
  }

  private getCurrentPageType(): 'home' | 'legal' {
    const url = this.router.url;
    if (url.includes('legal-notice') || url.includes('impressum')) {
      return 'legal';
    }
    return 'home';
  }

  private getRouteForLanguageAndPage(lang: 'de' | 'en', pageType: 'home' | 'legal'): string {
    if (pageType === 'legal') {
      return lang === 'en' ? '/legal-notice' : '/impressum';
    }
    return '/'; 
  }

}



