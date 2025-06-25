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

  private hideAllImages(): void {
    const images = document.querySelectorAll('.project-image');
    images.forEach(img => {
      (img as HTMLElement).style.opacity = '0';
    });
  }

/* private setImagePositions(): void {
  setTimeout(() => {
    const projectContents = document.querySelectorAll('.project-content');
    const images = document.querySelectorAll('.project-image');
    let cumulativeTop = 0;
    
    projectContents.forEach((content, index) => {
      const correspondingImage = images[index] as HTMLElement;
      if (correspondingImage && content) {
        correspondingImage.style.top = `${cumulativeTop}px`;
        const contentHeight = (content as HTMLElement).offsetHeight;
        cumulativeTop += contentHeight;
      }
    });
  }, 200);
} */

private setImagePositions(): void {
  setTimeout(() => {
    const projectRows = document.querySelectorAll('.project-row'); // Ganze Zeile statt nur Content
    const images = document.querySelectorAll('.project-image');
    let cumulativeTop = 0;
    
    console.log('=== Bildpositionierung ===');
    console.log('Bildschirmbreite:', window.innerWidth);
    
    projectRows.forEach((row, index) => {
      const correspondingImage = images[index] as HTMLElement;
      if (correspondingImage && row) {
        const rowElement = row as HTMLElement;
        const rowHeight = rowElement.offsetHeight;
        
        console.log(`Zeile ${index}: Höhe=${rowHeight}, Position=${cumulativeTop}`);
        
        correspondingImage.style.top = `${cumulativeTop}px`;
        
        cumulativeTop += rowHeight;
      }
    });
  }, 300); // Längeres Timeout für responsive Anpassung
}



@HostListener('window:resize')
onResize(): void {
  this.setImagePositions();
}

}



