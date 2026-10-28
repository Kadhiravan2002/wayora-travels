import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AboutPreviewComponent } from './about-preview';

describe('AboutPreviewComponent', () => {
  let component: AboutPreviewComponent;
  let fixture: ComponentFixture<AboutPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutPreviewComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the about preview component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the Who We Are eyebrow and Discover India your way heading', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const eyebrow = compiled.querySelector('.eyebrow');
    expect(eyebrow?.textContent).toContain('WHO WE ARE');

    const heading = compiled.querySelector('#about-preview-heading');
    expect(heading?.textContent?.trim()).toBe('Discover India your way.');

    const lead = compiled.querySelector('.about-intro__lead');
    expect(lead?.textContent).toContain('WAYORA Travels was founded with a singular purpose');
  });

  it('should render the layered imagery with main photograph and overlapping circle traveler photo', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const mainImg = compiled.querySelector('.about-intro__main-img') as HTMLImageElement;
    expect(mainImg).toBeTruthy();
    expect(mainImg.getAttribute('src')).toBe('images/about-india-travel.jpg');

    const circleImg = compiled.querySelector('.about-intro__circle-img') as HTMLImageElement;
    expect(circleImg).toBeTruthy();
    expect(circleImg.getAttribute('src')).toBe('images/testimonials/travelers-left.jpg');
  });

  it('should render the elevated benefits card with 3 travel items', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const benefitItems = compiled.querySelectorAll('.about-intro__benefit-item');
    expect(benefitItems.length).toBe(3);
    expect(compiled.textContent).toContain('Personalized Itineraries');
    expect(compiled.textContent).toContain('Handpicked Accommodations');
    expect(compiled.textContent).toContain('Attentive Local Guidance');
  });

  it('should render the Plan Your Trip button and Call Us phone contact pill', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const cta = compiled.querySelector('.about-intro__btn') as HTMLAnchorElement;
    expect(cta?.textContent).toContain('Plan Your Trip');
    expect(cta?.getAttribute('href')).toBe('/contact');

    const phoneLink = compiled.querySelector('.about-intro__call-cta') as HTMLAnchorElement;
    expect(phoneLink).toBeTruthy();
    expect(phoneLink?.textContent).toContain('Call Us');
    expect(phoneLink?.getAttribute('href')).toBe('tel:+916383809269');
  });
});
