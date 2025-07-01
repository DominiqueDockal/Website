import { Component, HostListener, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LanguageService } from './services/language.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FooterComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  isLandscape = false;
  private languageService = inject(LanguageService);

  ngOnInit() {
    this.checkOrientation(); 
  }

  @HostListener('window:orientationchange')
  @HostListener('window:resize')
  checkOrientation() {
    this.isLandscape = window.matchMedia('(orientation: landscape) and (max-width: 768px)').matches;
  }

   translate(key: string): string {
    return this.languageService.getTranslation(key);
  }
}
