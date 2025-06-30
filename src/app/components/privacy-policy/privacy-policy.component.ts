import { Component, inject, OnInit } from '@angular/core';
import { LanguageService } from '../../services/language.service';


@Component({
  selector: 'app-privacy-policy',
  imports: [],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.scss'
})
export class PrivacyPolicyComponent implements OnInit {
  private languageService = inject(LanguageService);

  translate(key: string): string {
    return this.languageService.getTranslation(key);
  }

   ngOnInit() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

}
