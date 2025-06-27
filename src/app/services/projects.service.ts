import { Injectable } from '@angular/core';
import { PROJECTS_DATA } from './projects.data';
import { Project } from '../models/project.interface';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private projects: Project[] = PROJECTS_DATA;
  private currentProjectIndex = 0;
  
  private projectByIdCache = new Map<string, Project | null>();
  private formattedNumberCache = new Map<string, string>();
  private projectsArrayCache: Project[] | null = null;

  constructor() {
    this.validateCurrentIndex();
    this.warmCaches();
  }

  getProjects(): Project[] {
    if (!this.projectsArrayCache) {
      this.projectsArrayCache = [...this.projects];
    }
    return this.projectsArrayCache;
  }

  getProjectById(id: string): Project | null {
    if (!id) return null;
    if (this.projectByIdCache.has(id)) {
      return this.projectByIdCache.get(id)!;
    }
    const project = this.projects.find(p => p.id === id) || null;
    this.projectByIdCache.set(id, project);
    return project;
  }

  getCurrentProject(): Project | null {
    this.validateCurrentIndex();
    return this.projects[this.currentProjectIndex] || null;
  }

  setCurrentProject(projectId: string): void {
    if (!projectId) return;
    const index = this.projects.findIndex(p => p.id === projectId);
    if (index !== -1) this.currentProjectIndex = index;
  }

  getNextProject(): Project | null {
    if (this.projects.length === 0) return null;
    this.currentProjectIndex = (this.currentProjectIndex + 1) % this.projects.length;
    return this.projects[this.currentProjectIndex];
  }

  getFormattedProjectNumber(projectId: string): string {
    if (!projectId) return '00';
    if (this.formattedNumberCache.has(projectId)) return this.formattedNumberCache.get(projectId)!;
    const index = this.projects.findIndex(p => p.id === projectId);
    const result = index === -1 ? '00' : (index + 1).toString().padStart(2, '0');
    this.formattedNumberCache.set(projectId, result);
    return result;
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

  private warmCaches(): void {
    this.projects.forEach(project => {
      this.projectByIdCache.set(project.id, project);
      const index = this.projects.findIndex(p => p.id === project.id);
      const formattedNumber = (index + 1).toString().padStart(2, '0');
      this.formattedNumberCache.set(project.id, formattedNumber);
    });
    this.projectsArrayCache = [...this.projects];
  }
}


