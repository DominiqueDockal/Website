import { Component, inject, OnInit, HostListener, AfterViewInit} from '@angular/core';
import { LanguageService } from '../../../services/language.service';
import { ProjectsService } from '../../../services/projects.service';
import { Project } from '../../../models/project.interface';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';


@Component({
  selector: 'app-projects',
  imports: [],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit, AfterViewInit {
  private languageService = inject(LanguageService);
  private projectsService = inject(ProjectsService);
  private sanitizer = inject(DomSanitizer);
  
  projects: Project[] = [];
  currentProject: Project | null = null; 

  ngOnInit(): void {
    this.projects = this.projectsService.getProjects();
  }

  ngAfterViewInit(): void {
    this.setImagePositions();
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

  onProjectClick(projectId: string): void {
    this.currentProject = this.projects.find(p => p.id === projectId) || null;
    this.showOverlay();
  }

  onCloseOverlay(): void {
    this.hideOverlay();
  }

  onOverlayBackgroundClick(): void {
    this.hideOverlay();
  }

  onOverlayContentClick(event: Event): void {
    event.stopPropagation();
  }

  @HostListener('window:resize')
  onResize(): void {
     this.setImagePositions();
  }

  private hideAllImages(): void {
    const images = document.querySelectorAll('.project-image');
    images.forEach(img => {
      (img as HTMLElement).style.opacity = '0';
    });
  }

  private setImagePositions(): void {
    setTimeout(() => {
      const projectRows = document.querySelectorAll('.project-row'); 
      const images = document.querySelectorAll('.project-image');
      let cumulativeTop = 0;
      projectRows.forEach((row, index) => {
        const correspondingImage = images[index] as HTMLElement;
        if (correspondingImage && row) {
          const rowElement = row as HTMLElement;
          const rowHeight = rowElement.offsetHeight;
          correspondingImage.style.top = `${cumulativeTop}px`;
          cumulativeTop += rowHeight;
        }
      });
    }, 300); 
  }

  private showOverlay(): void {
    const overlay = document.querySelector('.overlay-projects') as HTMLElement;
    if (overlay) overlay.classList.add('active');
  }

  private hideOverlay(): void {
    const overlay = document.querySelector('.overlay-projects') as HTMLElement;
    if (overlay) {
      overlay.classList.remove('active');
      this.currentProject = null; 
    }
  }

  getFormattedProjectId(): string {
    if (!this.currentProject) return '';
    const index = this.projects.findIndex(p => p.id === this.currentProject!.id);
    const projectNumber = index + 1; 
    return projectNumber.toString().padStart(2, '0');
  }

   getSafeHtml(htmlString: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(htmlString);
  }


}






