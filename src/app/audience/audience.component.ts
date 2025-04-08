import { CommonModule } from '@angular/common';
import { Component, OnInit, HostListener, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Define interfaces for features and sub-features
interface Feature {
  title: string;
  description: string;
  video: string;
  visible: boolean;
  subFeatures?: SubFeature[];
}

interface SubFeature {
  title: string;
  description: string;
}

interface CursorStyle {
  left: string;
  top: string;
  transform?: string;
}

@Component({
  selector: 'app-audience',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './audience.component.html',
  styleUrls: ['./audience.component.css']
})
export class AudienceComponent implements OnInit, AfterViewInit {
  typewriterText = 'Quality video lectures can set your course apart.';
  isScrolled = false;
  menuActive = false;
  scrollProgress = 0;
  features: Feature[] = [
    { 
      title: 'Script Your Content', 
      description: 'Learn to write engaging scripts with AI-driven suggestions.', 
      video: 'assets/scripting.mp4', 
      visible: false,
      subFeatures: [
        
      ]
    },
    { title: 'Set Up Lighting', description: 'Master professional lighting with interactive tutorials.', video: 'assets/lighting.mp4', visible: false },
    { title: 'Choose the Right Microphone', description: 'Get AI-recommended audio solutions for crystal-clear sound.', video: 'assets/microphone.mp4', visible: false },
    { title: 'Edit Like a Pro', description: 'Advanced editing skills with AI-assisted tools.', video: 'assets/editing.mp4', visible: false },
    { title: 'Learn Marketing Strategies', description: 'Boost your reach with AI-optimized marketing techniques.', video: 'assets/marketing.mp4', visible: false },
    { title: 'Optimize Video Delivery', description: 'Enhance streaming quality and accessibility with AI-driven compression.', video: 'assets/delivery.mp4', visible: false },
  ];
  formData = { name: '', email: '' };
  progress = 0;
  progressOffset = 251.2; // Circumference of circle with radius 40 (2 * π * 40 ≈ 251.2)
  showModal = false;
  selectedFeature: Feature | null = null;
  cursorStyle: CursorStyle = { left: '0px', top: '0px' };
  followerStyle: CursorStyle = { left: '0px', top: '0px' };
  cursorHover = false;
  analytics = { engagement: 75, views: 1200, subscribers: 350 };
  milestones = [
    { label: 'First 100 Views', achieved: true, reward: '🎉 Bronze Badge' },
    { label: '500 Views', achieved: false, reward: '🥈 Silver Badge' },
    { label: '1000 Subscribers', achieved: false, reward: '🥇 Gold Badge' }
  ];
  chatOpen = false;
  chatMessages = [{ text: 'Hi! How can I help you grow your audience?', sent: false }];
  chatInput = '';

  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;
  @ViewChild('heroCanvas') heroCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('engagementChart') engagementChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('viewsChart') viewsChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('subscribersChart') subscribersChart!: ElementRef<HTMLCanvasElement>;

  ngOnInit() {
    this.createParticles();
    this.startProgress();
    this.observeFeatures();
  }

  ngAfterViewInit() {
    this.initHeroAnimation();
    this.drawCharts();
  }

  createParticles() {
    const particlesDiv = document.getElementById('particles-js');
    if (particlesDiv) {
      for (let i = 0; i < 150; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
          position: absolute;
          width: ${Math.random() * 6}px;
          height: ${Math.random() * 6}px;
          background: rgba(0, 221, 235, ${Math.random() * 0.6});
          border-radius: 50%;
          top: ${Math.random() * 100}%;
          left: ${Math.random() * 100}%;
          animation: float ${Math.random() * 6 + 2}s infinite ease-in-out;
        `;
        particlesDiv.appendChild(particle);
      }
      const styleSheet = document.createElement('style');
      styleSheet.textContent = `
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
      `;
      document.head.appendChild(styleSheet);
    }
  }

  initHeroAnimation() {
    const canvas = this.heroCanvas.nativeElement;
    const ctx = canvas.getContext('2d')!;
    let particles: any[] = [];
    const particleCount = 60;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 5 + 1,
        speedX: Math.random() * 1.5 - 0.75,
        speedY: Math.random() * 1.5 - 0.75
      });
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle =  `rgba(0, 221, 235, ${Math.random() * 0.8 + 0.2})`;
        ctx.fill();

        particles.forEach(p2 => {
          const dist = Math.sqrt((p.x - p2.x) ** 2 + (p.y - p2.y) ** 2);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 221, 235, ${1 - dist / 120})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      });
      requestAnimationFrame(animate);
    }
    animate();
  }

  drawCharts() {
    this.drawPieChart(this.engagementChart.nativeElement, this.analytics.engagement);
    this.drawBarChart(this.viewsChart.nativeElement, this.analytics.views, 2000);
    this.drawBarChart(this.subscribersChart.nativeElement, this.analytics.subscribers, 1000);
  }

  drawPieChart(canvas: HTMLCanvasElement, value: number) {
    const ctx = canvas.getContext('2d')!;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 80;

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, -Math.PI / 2, -Math.PI / 2 + (value / 100) * 2 * Math.PI);
    ctx.fillStyle = '#00ddeb';
    ctx.fill();
  }

  drawBarChart(canvas: HTMLCanvasElement, value: number, max: number) {
    const ctx = canvas.getContext('2d')!;
    const height = canvas.height * (value / max);
    ctx.fillStyle = '#00ddeb';
    ctx.fillRect(80, canvas.height - height, 40, height);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.fillRect(80, 0, 40, canvas.height - height);
  }

  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled = window.scrollY > 50;
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    this.scrollProgress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.cursorStyle = { left: event.pageX + 'px', top: event.pageY + 'px' };
    this.followerStyle = { left: event.pageX - 14 + 'px', top: event.pageY - 14 + 'px' };
  }

  @HostListener('document:mouseover', ['$event'])
  onMouseOver(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.classList.contains('feature-card')) {
      this.cursorHover = true;
      this.cursorStyle = { ...this.cursorStyle, transform: 'scale(1.5)' };
      this.followerStyle = { ...this.followerStyle, transform: 'scale(1.5)' };
    }
  }

  @HostListener('document:mouseout', ['$event'])
  onMouseOut(event: MouseEvent) {
    const target = event.relatedTarget as HTMLElement;
    if (!target || !(target.tagName === 'A' || target.tagName === 'BUTTON' || target.classList.contains('feature-card'))) {
      this.cursorHover = false;
      this.cursorStyle = { ...this.cursorStyle, transform: 'scale(1)' };
      this.followerStyle = { ...this.followerStyle, transform: 'scale(1)' };
    }
  }

  toggleMenu() {
    this.menuActive = !this.menuActive;
  }

  scrollTo(section: string) {
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
    this.menuActive = false;
  }

  observeFeatures() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const index = this.features.findIndex(f => f.title === entry.target.querySelector('h3')?.textContent);
        if (entry.isIntersecting && index !== -1) {
          this.features[index].visible = true;
        }
      });
    }, { threshold: 0.1 });
    setTimeout(() => {
      document.querySelectorAll('.feature-card').forEach(card => observer.observe(card));
    }, 0);
  }

  startProgress() {
    setInterval(() => {
      if (this.progress < 100) {
        this.progress += Math.random() * 10;
        this.progress = Math.min(Math.round(this.progress), 100);
        this.progressOffset = 251.2 - (251.2 * this.progress) / 100;
        this.updateMilestones();
      }
    }, 2000);
  }

  updateMilestones() {
    if (this.analytics.views >= 100) this.milestones[0].achieved = true;
    if (this.analytics.views >= 500) this.milestones[1].achieved = true;
    if (this.analytics.subscribers >= 1000) this.milestones[2].achieved = true;
  }

  openVideoModal(feature: Feature) {
    this.selectedFeature = feature;
    this.showModal = true;
    setTimeout(() => this.videoPlayer.nativeElement.load(), 0);
  }

  closeVideoModal(event?: MouseEvent) {
    if (event?.target === event?.currentTarget || !event) {
      this.showModal = false;
      this.videoPlayer.nativeElement.pause();
    }
  }

  submitForm() {
    if (this.formData.name && this.formData.email) {
      alert('Thank you for joining! Check your email for next steps.');
      this.formData = { name: '', email: '' };
      this.analytics.subscribers += 1;
      this.drawCharts();
    } else {
      alert('Please fill out all fields.');
    }
  }

  toggleChat() {
    this.chatOpen = !this.chatOpen;
  }

  sendMessage() {
    if (this.chatInput.trim()) {
      this.chatMessages.push({ text: this.chatInput, sent: true });
      setTimeout(() => {
        this.chatMessages.push({ text: 'Thanks for your message! How can I assist you further?', sent: false });
      }, 1000);
      this.chatInput = '';
    }
  }
}