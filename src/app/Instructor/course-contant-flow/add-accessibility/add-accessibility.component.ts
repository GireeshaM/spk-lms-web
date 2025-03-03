import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-add-accessibility',
  imports: [CommonModule],
  templateUrl: './add-accessibility.component.html',
  styleUrl: './add-accessibility.component.css'
})
export class AddAccessibilityComponent {
  // Accessibility checklist items
  checklists = [
    {
      title: 'Closed captions accessibility checklist',
      description: 'Captions in this course meet these guidelines',
      checked: false
    },
    {
      title: 'Audio content accessibility checklist',
      description: 'Audio content in this course meets these guidelines',
      checked: false
    },
    {
      title: 'Course materials accessibility checklist',
      description: 'Materials attached to this course meet these guidelines',
      checked: false
    }
  ];

  // Method to toggle checklist items
  toggleCheck(index: number): void {
    this.checklists[index].checked = !this.checklists[index].checked;
  }
}