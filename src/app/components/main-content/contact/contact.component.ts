import { Component, inject } from '@angular/core';
import { LanguageService } from '../../../services/language.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-contact',
  imports: [RouterLink],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  private languageService = inject(LanguageService);

  translate(key: string): string {
    return this.languageService.getTranslation(key);
  }

  getPrivacyRoute(): string {
    return this.languageService.getPrivacyRoute();
  }


}
