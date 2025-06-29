import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { HeroComponent } from './hero/hero.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { SkillsComponent } from './skills/skills.component';
import { ProjectsComponent } from './projects/projects.component';
import { ContactComponent } from './contact/contact.component';
import { Subscription } from 'rxjs';
import { LanguageService } from '../../services/language.service';


@Component({
  selector: 'app-main-content',
  imports: [
    HeroComponent,
    AboutMeComponent,
    SkillsComponent,
    ProjectsComponent,
    ContactComponent
  ],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss'
})
export class MainContentComponent implements OnInit, OnDestroy {
  private languageService = inject(LanguageService);
  private scrollSubscription?: Subscription;

  ngOnInit() {
    this.scrollSubscription = this.languageService.scrollToSection$.subscribe(sectionId => {
      if (sectionId) {
        this.scrollToSection(sectionId);
      }
    });
  }

  ngOnDestroy() {
    this.scrollSubscription?.unsubscribe();
  }

  private scrollToSection(sectionId: string) {
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }, 300); 
  }

}
