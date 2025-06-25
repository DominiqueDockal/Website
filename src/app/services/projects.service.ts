
import { Injectable } from '@angular/core';
import { PROJECTS_DATA } from './projects.data';
import { Project } from '../models/project.interface';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  getProjects(): Project[] {
    return PROJECTS_DATA;
  }
}
