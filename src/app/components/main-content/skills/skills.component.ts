import { Component } from '@angular/core';

@Component({
  selector: 'app-skills',
  imports: [],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent {
  onButtonClick(event: Event): void {
    const target = event.target as HTMLElement;
    target.style.animation = 'none';
    
    // Hier  Navigation/Weiterleitung
    // z.B. this.router.navigate(['/contact']);
    
    console.log('Button clicked - navigation logic here');
}
  

}
