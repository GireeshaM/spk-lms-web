import { Component } from '@angular/core';
import { InterestserviceService } from '../../services/interestservice.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-interests',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './interests.component.html',
  styleUrl: './interests.component.css'
})
export class InterestsComponent {
  userId: number = 1; // Replace with dynamic user ID
  interests: any[] = [];
  newInterest: string = '';
  recommendedInterests: any[] = [];

  // List of all possible interests (for recommendations)
  allInterests = [
    'Angular', 'React', 'Vue', 'AI', 'Machine Learning', 'Deep Learning', 
    'Cloud Computing', 'Cyber Security', 'Blockchain', 'Python', 'Data Science'
  ];

  // Map of images for predefined interests
  interestImages: { [key: string]: string } = {
   'Angular': 'images/angular.png',
    'React': 'images/react.png',
    'Vue': 'images/vue.png',
    'AI': 'images/ai.jpg',
    'Machine Learning': 'images/machine-learning.jpg',
    'Deep Learning': 'images/deep-learning.jpg',
    'Cloud Computing': 'images/cloud-computing.jpg',
    'Cyber Security': 'images/cyber-security.jpg',
    'Blockchain': 'images/blockchain.png',
    'Python': 'images/python.png',
    'Data Science': 'images/data-science.jpg',
    'Web Development': 'images/web-development.jpg'
  };

  constructor(private interestservice: InterestserviceService) {}

  ngOnInit(): void {
    this.loadInterests();
  }

  // Load user interests from service
  loadInterests() {
    this.interestservice.getUserInterests(this.userId).subscribe((data) => {
      this.interests = data.map((interest: any) => ({
        name: interest.name,
        logoUrl: this.interestImages[interest.name] || 'images/default.jpg' // Default image if not found
      }));
      this.updateRecommendations();
    });
  }

  // Add new interest
  addInterest() {
    if (this.newInterest.trim()) {
      this.interestservice.addInterest(this.userId, this.newInterest).subscribe(() => {
        this.loadInterests();
        this.newInterest = '';
      });
    }
  }

  // Remove an interest
  removeInterest(interest: string) {
    this.interestservice.removeInterest(this.userId, interest).subscribe(() => {
      this.loadInterests();
    });
  }

  // Update recommended interests dynamically
// Update recommended interests dynamically
updateRecommendations() {
  if (this.newInterest.trim() === '') {
    this.recommendedInterests = [];
    return;
  }

  const userInterests = this.interests.map(i => i.name.toLowerCase());

  this.recommendedInterests = this.allInterests
    .filter(interest => 
      !userInterests.includes(interest.toLowerCase()) && 
      interest.toLowerCase().includes(this.newInterest.toLowerCase())
    )
    .slice(0, 3) // Limit to 5 recommendations
    .map(interest => ({
      name: interest,
      logoUrl: this.interestImages[interest] || 'assets/images/default.jpg' // Default image if missing
    }));

  console.log('Updated Recommendations:', this.recommendedInterests);
}



  // Add interest from recommendations
  addInterestFromRecommendation(interest: string) {
    this.interestservice.addInterest(this.userId, interest).subscribe(() => {
      this.loadInterests();
    });
  }
}
