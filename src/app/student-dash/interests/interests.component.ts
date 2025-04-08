import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HnavComponent } from "../../hnav/hnav.component";

@Component({
  selector: 'app-interests',
  imports: [CommonModule, FormsModule, HnavComponent],
  templateUrl: './interests.component.html',
  styleUrls: ['./interests.component.css']
})
export class InterestsComponent implements OnInit {
  myInterests: string[] = ['Design Thinking', 'Communication', 'Robotics', 'Machine Learning', 'Internet of Things'];
  allSuggestions: string[] = [
    'Generative AI program', 'Generative program', 'Photography',
    'Telecommunications', 'Emotions', 'Music', 'Bigdata',
    'Creative Confidence', 'Science', 'Game design', 'Computer Vision',
    'Accessibility', 'Health and Fitness', 'Personality development', 'Diversity'
  ];
  suggestions: string[] = [...this.allSuggestions];
  searchQuery: string = '';
  hoveredItem: string | null = null;

  ngOnInit(): void {
    this.loadUserInterests();
  }

  loadUserInterests(): void {
    const storedInterests = localStorage.getItem('userInterests');
    if (storedInterests) {
      this.myInterests = JSON.parse(storedInterests);
      this.updateSuggestions();
    }
  }

  addInterest(topic: string): void {
    if (!this.myInterests.includes(topic)) {
      this.myInterests.push(topic);
      this.updateSuggestions();
      this.saveUserInterests();
    }
  }

  removeInterest(topic: string): void {
    this.myInterests = this.myInterests.filter(item => item !== topic);
    this.updateSuggestions();
    this.saveUserInterests();
  }

  updateSuggestions(): void {
    this.suggestions = this.allSuggestions.filter(item => !this.myInterests.includes(item));
    this.filterSuggestions();
  }

  filterSuggestions(): void {
    this.suggestions = this.allSuggestions
      .filter(item => !this.myInterests.includes(item))
      .filter(item => item.toLowerCase().includes(this.searchQuery.toLowerCase()));
  }

  saveUserInterests(): void {
    localStorage.setItem('userInterests', JSON.stringify(this.myInterests));
  }
}