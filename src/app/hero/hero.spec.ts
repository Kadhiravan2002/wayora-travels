import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { HeroComponent } from './hero';

describe('HeroComponent', () => {
  let component: HeroComponent;
  let fixture: ComponentFixture<HeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the hero component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the exact eyebrow copy', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const eyebrow = compiled.querySelector('.hero__eyebrow');
    expect(eyebrow?.textContent).toContain('DISCOVER INDIA WITH WAYORA');
  });

  it('should render the exact main heading with Antique Gold highlight', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const heading = compiled.querySelector('.hero__heading');
    expect(heading?.textContent?.trim()).toBe('Find your kind of somewhere.');

    const highlight = heading?.querySelector('.hero__heading-highlight');
    expect(highlight?.textContent?.trim()).toBe('somewhere.');
  });

  it('should render the exact supporting text', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const description = compiled.querySelector('.hero__description');
    expect(description?.textContent).toContain(
      'From peaceful backwaters and golden deserts to mountain escapes and coastal retreats, discover India your way with thoughtfully planned journeys.',
    );
  });

  it('should render primary CTA linking to #featured-destinations and secondary CTA linking to contact', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const primaryCta = compiled.querySelector('.hero__btn-primary');
    const secondaryCta = compiled.querySelector('.hero__btn-secondary');

    expect(primaryCta?.textContent?.trim()).toBe('Explore Destinations');
    expect(primaryCta?.getAttribute('href')).toBe('#featured-destinations');
    expect(primaryCta?.querySelector('.hero__btn-icon')).toBeTruthy();

    expect(secondaryCta?.textContent?.trim()).toBe('Plan Your Trip');
  });

  it('should render the background image with correct path and attributes', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const img = compiled.querySelector('.hero__bg-img') as HTMLImageElement;
    expect(img).toBeTruthy();
    expect(img.getAttribute('src')).toBe('images/wayora-hero-india.jpg');
    expect(img.getAttribute('fetchpriority')).toBe('high');
  });

  it('should not render right-side floating cards', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.hero__visual-stack')).toBeNull();
    expect(compiled.querySelector('.hero__badge')).toBeNull();
    expect(compiled.querySelector('.hero__card')).toBeNull();
  });
});
