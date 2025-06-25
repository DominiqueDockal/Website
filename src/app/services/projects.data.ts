import { Project } from '../models/project.interface';

export const PROJECTS_DATA: Project[] = [
  {
    id: 'pollo-loco',
    name: 'El Pollo Loco',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    image: 'assets/images/PolloLoco.png'
  },
  {
    id: 'da-bubble',
    name: 'Da Bubble',
    technologies: ['Angular', 'Firebase', 'TypeScript'],
    image: 'assets/images/DaBubble.png'
  },
  {
    id: 'backend',
    name: 'Backend',
    technologies: ['XXX', 'abc', 'ABC'],
    image: 'assets/images/BackendDevSecOps.png'
  }
];
