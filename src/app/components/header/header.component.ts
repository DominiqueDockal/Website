import { Component, inject } from '@angular/core';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  
  private languageService = inject(LanguageService);

  switchToGerman() {
    this.languageService.switchLanguage('de');
  }

  switchToEnglish() {
    this.languageService.switchLanguage('en');
  }


}
