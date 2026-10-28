import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ScrollRevealService } from './scroll-reveal.service';

describe('ScrollRevealService', () => {
  let service: ScrollRevealService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter([]), ScrollRevealService],
    });
    service = TestBed.inject(ScrollRevealService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should safely initialize and destroy without error', () => {
    expect(() => {
      service.init();
      service.destroy();
    }).not.toThrow();
  });

  it('should add is-revealed when element intersects and remove when it exits to allow replay', () => {
    let observerCallback: ((entries: Partial<IntersectionObserverEntry>[]) => void) | null = null;

    class MockIntersectionObserver {
      constructor(callback: (entries: Partial<IntersectionObserverEntry>[]) => void) {
        observerCallback = callback;
      }
      observe = vi.fn();
      unobserve = vi.fn();
      disconnect = vi.fn();
    }

    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);

    const testEl = document.createElement('div');
    testEl.className = 'reveal';
    document.body.appendChild(testEl);

    service.init();

    expect(observerCallback).toBeTruthy();

    // 1. Element enters viewport -> adds is-revealed
    observerCallback!([{ target: testEl, isIntersecting: true }]);
    expect(testEl.classList.contains('is-revealed')).toBe(true);

    // 2. Element scrolls out of viewport -> removes is-revealed
    observerCallback!([{ target: testEl, isIntersecting: false }]);
    expect(testEl.classList.contains('is-revealed')).toBe(false);

    // 3. Element re-enters viewport -> replays animation (adds is-revealed again)
    observerCallback!([{ target: testEl, isIntersecting: true }]);
    expect(testEl.classList.contains('is-revealed')).toBe(true);

    service.destroy();
    testEl.remove();
    vi.unstubAllGlobals();
  });

  it('should observe directional reveal and staggered containers', () => {
    const observedTargets: Element[] = [];

    class MockIntersectionObserver {
      constructor(_callback: unknown) {}
      observe = vi.fn((el: Element) => {
        observedTargets.push(el);
      });
      unobserve = vi.fn();
      disconnect = vi.fn();
    }

    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);

    const elLeft = document.createElement('div');
    elLeft.className = 'reveal-left';
    const elRight = document.createElement('div');
    elRight.className = 'reveal-right';
    const elStaggerDir = document.createElement('div');
    elStaggerDir.className = 'reveal-stagger-directional';

    document.body.appendChild(elLeft);
    document.body.appendChild(elRight);
    document.body.appendChild(elStaggerDir);

    service.init();

    expect(observedTargets).toContain(elLeft);
    expect(observedTargets).toContain(elRight);
    expect(observedTargets).toContain(elStaggerDir);

    service.destroy();
    elLeft.remove();
    elRight.remove();
    elStaggerDir.remove();
    vi.unstubAllGlobals();
  });
});
