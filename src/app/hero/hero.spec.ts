import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroComponent } from './hero';

describe('HeroComponent', () => {
  let component: HeroComponent;
  let fixture: ComponentFixture<HeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroComponent],
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
    expect(eyebrow?.textContent).toContain('YOUR JOURNEY STARTS HERE');
  });

  it('should render the exact main heading', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const heading = compiled.querySelector('.hero__heading');
    expect(heading?.textContent?.trim()).toBe('Find your kind of somewhere.');
  });

  it('should render the exact supporting text', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const description = compiled.querySelector('.hero__description');
    expect(description?.textContent).toContain(
      'From misty mountains to peaceful backwaters, discover India your way with thoughtfully planned journeys made around you.'
    );
  });

  it('should render primary and secondary CTAs with correct labels and links', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const primaryCta = compiled.querySelector('.btn--primary');
    const secondaryCta = compiled.querySelector('.btn--secondary');

    expect(primaryCta?.textContent?.trim()).toBe('Explore Packages');
    expect(primaryCta?.getAttribute('href')).toBe('#packages');

    expect(secondaryCta?.textContent?.trim()).toBe('Plan Your Trip');
    expect(secondaryCta?.getAttribute('href')).toBe('#contact');
  });

  it('should render the image location badge as Kerala Backwaters', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const caption = compiled.querySelector('.hero__caption');
    expect(caption?.textContent?.trim()).toBe('Kerala Backwaters');
  });

  it('should render the landscape image with accurate alt text and source', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const image = compiled.querySelector('.hero__image') as HTMLImageElement;

    expect(image).toBeTruthy();
    expect(image.getAttribute('src')).toBe('images/kerala-tea-plantations.jpg');
    expect(image.getAttribute('alt')).toBe(
      'Scenic tropical backwaters and lush greenery of Kerala'
    );
  });
});
