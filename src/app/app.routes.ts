import { Routes } from '@angular/router';
import { MainContentComponent } from './components/main-content/main-content.component';
import { LegalNoticeComponent } from './components/legal-notice/legal-notice.component';


export const routes: Routes = [
  {
    path: '',
    component: MainContentComponent,
    title: 'Startpage'
  },
  {
    path: 'legalNotice',
    component: LegalNoticeComponent,
    title: 'LegalNotice'
  },
  {
    path: '**',
    redirectTo: ''
  }
];