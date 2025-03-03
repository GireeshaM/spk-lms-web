import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Category {
  name: string;
  subModules: string[];
}

@Component({
  selector: 'app-nav-bar1',
  imports: [CommonModule],
  templateUrl: './nav-bar1.component.html',
  styleUrls: ['./nav-bar1.component.css']
})
export class NavBar1Component {
  categories: Category[] = [
    { name: 'Web Development', subModules: ['Frontend', 'Backend', 'Full Stack', 'Frameworks'] },
    { name: 'Mobile Development', subModules: ['Android', 'iOS', 'Flutter', 'React Native'] },
    { name: 'Game Development', subModules: ['Unity', 'Unreal Engine', '2D Games', '3D Games'] },
    { name: 'Entrepreneurship', subModules: ['Startup Tips', 'Funding', 'Business Plans', 'Market Research'] },
    { name: 'Business Analytics', subModules: ['Data Science', 'Data Visualization', 'Machine Learning', 'Statistics'] },
    { name: 'IT Certifications', subModules: ['AWS', 'CompTIA', 'Google Cloud', 'Cisco'] },
    { name: 'Digital Marketing', subModules: ['SEO', 'PPC', 'Social Media', 'Email Marketing'] }
  ];

  activeCategory: Category | null = null;

  // Toggles the active category when clicked
  toggleCategory(category: Category): void {
    this.activeCategory = this.activeCategory === category ? null : category;
  }

  onSubModuleClick(subModule: string): void {
    alert(`You clicked on ${subModule}`);
  }
}
