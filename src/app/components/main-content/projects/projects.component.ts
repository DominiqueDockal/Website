import { Component, inject, OnInit, HostListener, AfterViewInit,Renderer2, OnDestroy} from '@angular/core';
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
export class ProjectsComponent implements OnInit, AfterViewInit, OnDestroy {
  private languageService = inject(LanguageService);
  private projectsService = inject(ProjectsService);
  private sanitizer = inject(DomSanitizer);
  private renderer = inject(Renderer2);

  private readonly CSS_SELECTORS = {
    OVERLAY: '.overlay-projects',
    PROJECT_IMAGE: '.project-image',
    PROJECT_ROW: '.project-row'
  } as const;

  private readonly CSS_CLASSES = {
    OVERLAY_ACTIVE: 'active',
    OVERLAY_OPEN: 'overlay-open'
    } as const;

  isOverlayVisible = false;
  projects: Project[] = [];

  get currentProject(): Project | null {
    return this.projectsService.getCurrentProject();
  }

  ngOnInit(): void {
    this.projects = this.projectsService.getProjects();
  }

  ngAfterViewInit(): void {
    this.setImagePositions();
  }

  ngOnDestroy(): void {
  this.renderer.removeClass(document.body, this.CSS_CLASSES.OVERLAY_OPEN);
}

  translate(key: string): string {
    return this.languageService.getTranslation(key);
  }

  onProjectHover(projectId: string): void {
    this.hideAllImages();
    const selector = `[data-project="${projectId}"]${this.CSS_SELECTORS.PROJECT_IMAGE}`;
    const targetImage = document.querySelector(selector) as HTMLElement;
    if (targetImage) targetImage.style.opacity = '1';
  }

  onProjectLeave(): void {
    this.hideAllImages();
  }

  onProjectClick(projectId: string): void {
    this.projectsService.setCurrentProject(projectId);
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
    const images = document.querySelectorAll(this.CSS_SELECTORS.PROJECT_IMAGE);
    images.forEach(img => {
      (img as HTMLElement).style.opacity = '0';
    });
  }

  private setImagePositions(): void {
    setTimeout(() => {
      const projectRows = document.querySelectorAll(this.CSS_SELECTORS.PROJECT_ROW); 
      const images = document.querySelectorAll(this.CSS_SELECTORS.PROJECT_IMAGE);
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
    this.isOverlayVisible = true;
    const overlay = document.querySelector(this.CSS_SELECTORS.OVERLAY) as HTMLElement;
    if (overlay) {
      overlay.classList.add(this.CSS_CLASSES.OVERLAY_ACTIVE);
      this.renderer.addClass(document.body, this.CSS_CLASSES.OVERLAY_OPEN);
    }
  }

  private hideOverlay(): void {
    this.isOverlayVisible = false;
    const overlay = document.querySelector(this.CSS_SELECTORS.OVERLAY) as HTMLElement;
    if (overlay) {
      overlay.classList.remove(this.CSS_CLASSES.OVERLAY_ACTIVE);
      this.renderer.removeClass(document.body, this.CSS_CLASSES.OVERLAY_OPEN);
    }
  }

  getFormattedProjectId(): string {
    if (!this.currentProject) return '';
    return this.projectsService.getFormattedProjectNumber(this.currentProject.id);
  }

   getSafeHtml(htmlString: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(htmlString);
  }

  onNextProject(): void {
    this.projectsService.getNextProject();
  }


}






