import { AfterViewInit, Component } from '@angular/core';
import Chart from 'chart.js/auto';
import { AdminNavComponent } from "../admin/admin-nav/admin-nav.component";


@Component({
  selector: 'app-admin-dashboard',
  imports: [AdminNavComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})

export class AdminDashboardComponent implements AfterViewInit {
  ngAfterViewInit() {
    this.renderCharts();
  }

  private renderCharts(): void {
    this.createChart('revenueChart', 'bar', ['Jan', 'Feb', 'Mar', 'Apr', 'May'], [{
      label: 'Revenue',
      data: [10, 20, 50, 40, 35],
      backgroundColor: '#4F46E5'
    }]);

    this.createChart('deviceChart', 'doughnut', ['python', '.net', 'Java', 'Sql', 'AIML'], [{
      data: [30,30,10,10,20],
      backgroundColor: ['#4F46E5', '#F59E0B', '#EF4444','#a5d6a7', '#ef9a9a']
    }]);

    this.createChart('totalAccountsChart', 'line', ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], [{
      label: 'Total Accounts Growth',
      data: [75000,  86000, 78000, 82000, 90000, 85247],
      borderColor: '#66bb6a',
      fill: false
    }]);

    this.createChart('enrollmentChart', 'bar', ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], [{
      label: 'Enrollments',
      data: [3200, 4500, 5000, 6000, 7000, 5200],
      backgroundColor: '#42a5f5'
    }]);

    this.createChart('courseRevenueChart', 'pie', ['Advanced Python', 'Web Dev', 'Data Science', 'Machine Learning'], [{
      data: [12500, 9800, 7500, 6400],
      backgroundColor: ['#ffcc80', '#90caf9', '#a5d6a7', '#ef9a9a']
    }]);

    this.createChart('userDemographicsChart', 'doughnut', ['18-24', '25-34', '35+'], [{
      data: [40, 35, 25],
      backgroundColor: ['#81c784', '#64b5f6', '#ffb74d']
    }]);
  }

  private createChart(elementId: string, type: any, labels: string[], datasets: any[]): void {
    const ctx = document.getElementById(elementId) as HTMLCanvasElement;
    if (ctx) {
      new Chart(ctx, {
        type: type,
        data: { labels, datasets }
      });
    }
  }
}
