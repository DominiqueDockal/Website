import { Component, inject, OnInit, OnDestroy,  HostListener  } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../services/language.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

export class HeaderComponent implements OnInit, OnDestroy {
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
  





}
