import { Component, inject } from '@angular/core';
import { LanguageService } from '../../../services/language.service';

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {
  private languageService = inject(LanguageService);

  translate(key: string): string {
    return this.languageService.getTranslation(key);
  }

}
