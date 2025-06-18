import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  
  private languageService = inject(LanguageService);

  translate(key: string): string {
    return this.languageService.getTranslation(key);
  }

  getLegalNoticeRoute(): string {
    return this.languageService.getLegalNoticeRoute();
  }

  getHomeRoute(): string {
    return this.languageService.getHomeRoute();
  }

}

