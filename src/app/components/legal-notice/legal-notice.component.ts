import { Component, inject, OnInit } from '@angular/core';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-legal-notice',
  templateUrl: './legal-notice.component.html',
  styleUrl: './legal-notice.component.scss'
})
export class LegalNoticeComponent implements OnInit {
  private languageService = inject(LanguageService);

  translate(key: string): string {
    return this.languageService.getTranslation(key);
  }

  ngOnInit() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

}