import { Routes } from '@angular/router';
import { MainContentComponent } from './components/main-content/main-content.component';
import { LegalNoticeComponent } from './components/legal-notice/legal-notice.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';

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
    path: 'Datenschutz',
    component: PrivacyPolicyComponent,
    title: 'Datenschutz'
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent,
    title: 'Privacy Policy'
  },
  {
    path: '**',
    redirectTo: ''
  }
];