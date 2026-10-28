import { Injectable, inject, PLATFORM_ID, NgZone } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScrollRevealService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private readonly router = inject(Router);
  private readonly ngZone = inject(NgZone);

  private intersectionObserver: IntersectionObserver | null = null;
  private mutationObserver: MutationObserver | null = null;
  private routerSub: Subscription | null = null;
  private readonly observedElements = new WeakSet<Element>();

  init(): void {
    if (!this.isBrowser || typeof IntersectionObserver === 'undefined') {
      return;
    }

    if (
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    if (typeof document !== 'undefined') {
      document.documentElement.classList.add('js-reveal-ready');
    }

    this.ngZone.runOutsideAngular(() => {
      this.setupIntersectionObserver();
      this.setupMutationObserver();
      this.scanAndObserve();

      this.routerSub = this.router.events
        .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
        .subscribe(() => {
          if (typeof requestAnimationFrame !== 'undefined') {
            requestAnimationFrame(() => {
              this.scanAndObserve();
            });
          } else {
            setTimeout(() => this.scanAndObserve(), 50);
          }
        });
    });
  }

  private setupIntersectionObserver(): void {
    if (typeof IntersectionObserver === 'undefined') return;

    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
          } else {
            entry.target.classList.remove('is-revealed');
          }
        }
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -20px 0px',
      },
    );
  }

  private setupMutationObserver(): void {
    if (typeof MutationObserver === 'undefined' || typeof document === 'undefined') return;

    this.mutationObserver = new MutationObserver(() => {
      this.scanAndObserve();
    });

    if (document.body) {
      this.mutationObserver.observe(document.body, {
        childList: true,
        subtree: true,
      });
    }
  }

  private scanAndObserve(): void {
    if (!this.intersectionObserver || typeof document === 'undefined') return;

    const elements = document.querySelectorAll(
      '.reveal, .reveal-stagger, .reveal-left, .reveal-right, .reveal-stagger-directional',
    );
    for (let i = 0; i < elements.length; i++) {
      const el = elements[i];
      if (!this.observedElements.has(el)) {
        this.intersectionObserver.observe(el);
        this.observedElements.add(el);
      }
    }
  }

  destroy(): void {
    this.routerSub?.unsubscribe();
    this.routerSub = null;
    this.intersectionObserver?.disconnect();
    this.intersectionObserver = null;
    this.mutationObserver?.disconnect();
    this.mutationObserver = null;
  }
}
