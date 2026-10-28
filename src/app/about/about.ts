import { Component, OnInit, OnDestroy, signal, computed, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CONTACT_INFO } from '../contact-info';

export interface TravelerTestimonial {
  readonly id: number;
  readonly quote: string;
  readonly name: string;
  readonly role: string;
  readonly avatar: string;
}

@Component({
  selector: 'app-about',
  imports: [RouterLink],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class AboutComponent implements OnInit, OnDestroy {
  readonly contact = CONTACT_INFO;

  readonly testimonials: readonly TravelerTestimonial[] = [
    {
      id: 1,
      quote:
        'From our peaceful houseboat stay in Alleppey to exploring the historic streets of Jaipur, every part of our trip felt thoughtfully planned. The itinerary gave us time to enjoy each destination without feeling rushed.',
      name: 'Arun Sharma',
      role: 'Heritage & Nature Traveller',
      avatar: 'images/testimonials/traveler-avatar-1.jpg',
    },
    {
      id: 2,
      quote:
        'Our family journey across Rajasthan was unforgettable. From sunrise over the desert dunes in Jaisalmer to the serene lakes of Udaipur, WAYORA made every transfer and stay completely seamless.',
      name: 'Priya Sundaram',
      role: 'Cultural Itinerary Traveller',
      avatar: 'images/testimonials/traveler-avatar-2.jpg',
    },
    {
      id: 3,
      quote:
        'Waking up to misty Kashmir valleys and enjoying peaceful shikara rides on Dal Lake was a dream. Our local guides were warm, knowledgeable, and attentive to every detail.',
      name: 'Vikram Malhotra',
      role: 'Mountain & Scenic Explorer',
      avatar: 'images/testimonials/traveler-avatar-3.jpg',
    },
  ];

  readonly activeIndex = signal(0);
  readonly isPaused = signal(false);
  readonly currentTestimonial = computed(() => this.testimonials[this.activeIndex()]);

  private autoAdvanceTimer: ReturnType<typeof setInterval> | null = null;
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private visibilityHandler: (() => void) | null = null;

  ngOnInit(): void {
    if (this.isBrowser) {
      this.startAutoAdvance();
      this.setupVisibilityListener();
    }
  }

  ngOnDestroy(): void {
    this.stopAutoAdvance();
    this.removeVisibilityListener();
  }

  nextSlide(): void {
    this.activeIndex.update((i) => (i + 1) % this.testimonials.length);
  }

  prevSlide(): void {
    this.activeIndex.update((i) => (i - 1 + this.testimonials.length) % this.testimonials.length);
  }

  goToSlide(index: number): void {
    if (index >= 0 && index < this.testimonials.length) {
      this.activeIndex.set(index);
    }
  }

  pauseSlider(): void {
    this.isPaused.set(true);
  }

  resumeSlider(): void {
    this.isPaused.set(false);
  }

  private startAutoAdvance(): void {
    this.stopAutoAdvance();
    this.autoAdvanceTimer = setInterval(() => {
      if (!this.isPaused() && typeof document !== 'undefined' && !document.hidden) {
        this.nextSlide();
      }
    }, 6000);
  }

  private stopAutoAdvance(): void {
    if (this.autoAdvanceTimer) {
      clearInterval(this.autoAdvanceTimer);
      this.autoAdvanceTimer = null;
    }
  }

  private setupVisibilityListener(): void {
    if (typeof document !== 'undefined') {
      this.visibilityHandler = () => {
        if (document.hidden) {
          this.pauseSlider();
        } else {
          this.resumeSlider();
        }
      };
      document.addEventListener('visibilitychange', this.visibilityHandler);
    }
  }

  private removeVisibilityListener(): void {
    if (typeof document !== 'undefined' && this.visibilityHandler) {
      document.removeEventListener('visibilitychange', this.visibilityHandler);
      this.visibilityHandler = null;
    }
  }
}
