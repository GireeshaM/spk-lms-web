import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-slider',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
  cards = Array(18).fill(null); // Array to generate 18 cards
  private isSplit = false; // Track the state of the cards

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    const splitCard = this.el.nativeElement.querySelector('.split-card');

    if (splitCard) {
      // Use Intersection Observer to detect when the section is in view
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !this.isSplit) {
              // Add the animation class when the section is in view
              this.renderer.addClass(splitCard, 'animate');
              this.isSplit = true; // Mark the cards as split
            }
          });
        },
        { threshold: 0.5 } // Trigger when 50% of the section is visible
      );

      observer.observe(splitCard);
    }
  }

  toggleCards(): void {
    const splitCard = this.el.nativeElement.querySelector('.split-card');
    if (splitCard) {
      if (this.isSplit) {
        // If cards are split, reset them
        this.renderer.removeClass(splitCard, 'animate');
        this.isSplit = false;
      } else {
        // If cards are reset, split them
        this.renderer.addClass(splitCard, 'animate');
        this.isSplit = true;
      }
    }
  }
  tools = [
    { name: 'ChatGPT', img: 'assets/images/chatgpt.png' },
    { name: 'Gemini', img: 'assets/images/gemini.png' },
    { name: 'Rainbow Sail', img: 'assets/images/rainbow-sail.png' },
    { name: 'Claude', img: 'assets/images/claude.png' },
    { name: 'Palette', img: 'assets/images/palette.png' },
    { name: 'Jasper', img: 'assets/images/jasper.png' },
    { name: 'Copy.ai', img: 'assets/images/copyai.png' },
    { name: 'Pictory', img: 'assets/images/pictory.png' },
    { name: 'Writesonic', img: 'assets/images/writesonic.png' },
    { name: 'Notion', img: 'assets/images/notion.png' },
    { name: 'Descript', img: 'assets/images/descript.png' },
    { name: 'Synthesia', img: 'assets/images/synthesia.png' },
    { name: 'Tome', img: 'assets/images/tome.png' },
    { name: 'ElevenLabs', img: 'assets/images/elevenlabs.png' },
    { name: 'Fliki', img: 'assets/images/fliki.png' },
    { name: 'Chatbot', img: 'assets/images/chatbot.png' },
    { name: 'DALL·E 3', img: 'assets/images/dalle3.png' },
    { name: 'Tabnine', img: 'assets/images/tabnine.png' },
    { name: 'Replika', img: 'assets/images/replika.png' },
    { name: 'Lumen5', img: 'assets/images/lumen5.png' },
    { name: 'DeepAI', img: 'assets/images/deepai.png' },
    { name: 'Runway', img: 'assets/images/runway.png' },
    { name: 'Quillbot', img: 'assets/images/quillbot.png' },
    { name: 'Fireflies', img: 'assets/images/fireflies.png' }
  ];

  getBoxClass(index: number): string {
    const row = Math.floor(index / 6);
    const col = index % 6;
    const startBlue = row % 2 === 0 ? 0 : 1;
    return (col + startBlue) % 2 === 0 ? 'light-box' : 'white-box';
  }
}