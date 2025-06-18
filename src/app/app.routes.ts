import { Routes } from '@angular/router';
import { MainContentComponent } from './components/main-content/main-content.component';
import { LegalNoticeComponent } from './components/legal-notice/legal-notice.component';

export const routes: Routes = [
  {
    path: '',
    component: MainContentComponent,
    title: 'Startseite'
  },
  {
    path: 'en',
    component: MainContentComponent,
    title: 'Startpage'
  },
  {
    path: 'impressum',
    component: LegalNoticeComponent,
    title: 'Impressum'
  },
  {
    path: 'legal-notice',
    component: LegalNoticeComponent,
    title: 'Legal Notice'
  },
  {
    path: '**',
    redirectTo: ''
  }
];