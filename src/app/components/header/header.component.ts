import { Component, inject, OnInit, OnDestroy,  HostListener } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { LanguageService } from '../../services/language.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})

export class HeaderComponent implements OnInit, OnDestroy {
  private router = inject(Router);
  private languageService = inject(LanguageService);
  private subscription?: Subscription;
  currentLanguage: string = 'de';
  isSidebarOpen = false;

  ngOnInit() {
    this.currentLanguage = this.languageService.getCurrentLanguage();
    this.subscription = this.languageService.currentLanguage$.subscribe(
      language => this.currentLanguage = language
    );
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  translate(key: string): string {
    return this.languageService.getTranslation(key);
  }

  toggleLanguage(): void {
    this.currentLanguage = this.currentLanguage === 'de' ? 'en' : 'de';
    if (this.currentLanguage === 'de') {
        this.switchToGerman();
    } else {
        this.switchToEnglish();
    }
  }

  switchToGerman() {
    this.languageService.switchLanguage('de');
  }

  switchToEnglish() {
    this.languageService.switchLanguage('en');
  }

  getHomeRoute(): string {
    return this.languageService.getHomeRoute();
  }

  toggleBurgerMenu() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSidebar() {
    this.isSidebarOpen = false;
  }

  onSidebarClick(event: Event) {
    event.stopPropagation(); 
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    const sidebar = document.querySelector('.sidebar');
    const burgerMenu = document.querySelector('.burger-menu');
    if (this.isSidebarOpen && sidebar && !sidebar.contains(target) && burgerMenu && !burgerMenu.contains(target)) this.closeSidebar();
  }

  navigateToSection(sectionId: string) {
    const currentUrl = this.router.url.split('?')[0].split('#')[0];
    const homeRoute = this.languageService.getHomeRoute();
    this.closeSidebar();
    if (currentUrl === homeRoute) {
      this.scrollToSection(sectionId);
    } else {
      this.languageService.navigateToHomeSection(sectionId);
    }
}

  private scrollToSection(sectionId: string) {
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }, 100);
  }

}
