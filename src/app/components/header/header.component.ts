import { Component, inject, OnInit, OnDestroy } from '@angular/core';
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




}
