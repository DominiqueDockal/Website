import { Component, inject } from '@angular/core';
import { LanguageService } from '../../../services/language.service';

@Component({
  selector: 'app-skills',
  imports: [],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent {
  private languageService = inject(LanguageService);

  translate(key: string): string {
    return this.languageService.getTranslation(key);
  }

  

}
