import { Component, inject, OnInit, HostListener} from '@angular/core';
import { LanguageService } from '../../../services/language.service';
import { ProjectsService } from '../../../services/projects.service';
import { Project } from '../../../models/project.interface';


@Component({
  selector: 'app-projects',
  imports: [],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit{
  private languageService = inject(LanguageService);
  private projectsService = inject(ProjectsService);
  projects: Project[] = [];

  ngOnInit(): void {
    this.projects = this.projectsService.getProjects();
  }

  translate(key: string): string {
    return this.languageService.getTranslation(key);
  }

  onProjectHover(projectId: string): void {
    this.hideAllImages();
    const targetImage = document.querySelector(`[data-project="${projectId}"].project-image`) as HTMLElement;
    if (targetImage) targetImage.style.opacity = '1';
  }

  onProjectLeave(): void {
    this.hideAllImages();
  }

  private hideAllImages(): void {
    const images = document.querySelectorAll('.project-image');
    images.forEach(img => {
      (img as HTMLElement).style.opacity = '0';
    });
  }
}



