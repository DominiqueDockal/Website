import { Injectable } from '@angular/core';
import { PROJECTS_DATA } from './projects.data';
import { Project } from '../models/project.interface';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private projects: Project[] = PROJECTS_DATA;
  private currentProjectIndex = 0;

  constructor() {
    this.validateCurrentIndex();
  }

  getProjects(): Project[] {
    return [...this.projects];
  }

  getProjectById(id: string): Project | null {
    if (!id) return null;
    return this.projects.find(p => p.id === id) || null;
  }

  getCurrentProject(): Project | null {
    this.validateCurrentIndex();
    return this.projects[this.currentProjectIndex] || null;
  }

  setCurrentProject(projectId: string): void {
    if (!projectId) return;
    const index = this.projects.findIndex(p => p.id === projectId);
    if (index !== -1) {
      this.currentProjectIndex = index;
    }
  }

  getNextProject(): Project | null {
    if (this.projects.length === 0) return null;
    this.currentProjectIndex = (this.currentProjectIndex + 1) % this.projects.length;
    return this.projects[this.currentProjectIndex];
  }

  getFormattedProjectNumber(projectId: string): string {
    if (!projectId) return '00';
    const index = this.projects.findIndex(p => p.id === projectId);
    if (index === -1) return '00';
    const projectNumber = index + 1;
    return projectNumber.toString().padStart(2, '0');
  }

  private validateCurrentIndex(): void {
    if (this.projects.length === 0) {
      this.currentProjectIndex = 0;
    } else if (this.currentProjectIndex >= this.projects.length) {
      this.currentProjectIndex = 0;
    } else if (this.currentProjectIndex < 0) {
      this.currentProjectIndex = this.projects.length - 1;
    }
  }
}

