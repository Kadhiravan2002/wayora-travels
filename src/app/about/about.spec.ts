import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AboutComponent } from './about';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the about component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the banner title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const bannerTitle = compiled.querySelector('#about-banner-title');
    expect(bannerTitle?.textContent?.trim()).toBe('About WAYORA Travels');
  });

  it('should render the company introduction', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const introHeading = compiled.querySelector('#about-intro-heading');
    expect(introHeading?.textContent?.trim()).toBe('Discover India your way.');
  });

  it('should render the company approach split section with 3 points', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const heading = compiled.querySelector('#approach-heading');
    expect(heading?.textContent?.trim()).toBe('Our Approach to Travel');

    const eyebrow = compiled.querySelector('.about-approach__eyebrow');
    expect(eyebrow?.textContent).toContain('OUR PHILOSOPHY');

    const highlights = compiled.querySelectorAll('.about-approach__highlight');
    expect(highlights.length).toBe(3);

    const approachCards = compiled.querySelectorAll('.approach-card');
    expect(approachCards.length).toBe(3);
    expect(compiled.textContent).toContain('Curated with Intention');
    expect(compiled.textContent).toContain('Our Travel Partners');
    expect(compiled.textContent).toContain('Transparent Guidance');
  });

  it('should render traveler stories with realistic sample review', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const heading = compiled.querySelector('#testimonials-heading');
    expect(heading?.textContent).toContain('Journeys worth');
    expect(heading?.textContent).toContain('remembering.');

    const quote = compiled.querySelector('.testimonials-card__quote');
    expect(quote?.textContent).toContain('houseboat stay in Alleppey');

    const reviewer = compiled.querySelector('.testimonials-card__name');
    expect(reviewer?.textContent?.trim()).toBe('Arun Sharma');
  });

  it('should support slide navigation via next/prev buttons and indicator dots', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const nextBtn = compiled.querySelector('button[aria-label="Next traveler story"]') as HTMLButtonElement;
    expect(nextBtn).toBeTruthy();

    nextBtn.click();
    fixture.detectChanges();

    expect(component.activeIndex()).toBe(1);
    expect(component.currentTestimonial().name).toBe('Priya Sundaram');
    expect(component.currentTestimonial().avatar).toBe('images/testimonials/traveler-avatar-2.jpg');
    let reviewer = compiled.querySelector('.testimonials-card__name');
    expect(reviewer?.textContent?.trim()).toBe('Priya Sundaram');

    const dots = compiled.querySelectorAll('.testimonials-slider__dot');
    expect(dots.length).toBe(3);
    (dots[2] as HTMLButtonElement).click();
    fixture.detectChanges();

    expect(component.activeIndex()).toBe(2);
    expect(component.currentTestimonial().name).toBe('Vikram Malhotra');
    expect(component.currentTestimonial().avatar).toBe('images/testimonials/traveler-avatar-3.jpg');
    reviewer = compiled.querySelector('.testimonials-card__name');
    expect(reviewer?.textContent?.trim()).toBe('Vikram Malhotra');

    const prevBtn = compiled.querySelector('button[aria-label="Previous traveler story"]') as HTMLButtonElement;
    prevBtn.click();
    fixture.detectChanges();
    expect(component.activeIndex()).toBe(1);
  });

  it('should pause on hover and resume on mouse leave', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const card = compiled.querySelector('.testimonials-card') as HTMLElement;
    expect(card).toBeTruthy();

    card.dispatchEvent(new Event('mouseenter'));
    expect(component.isPaused()).toBe(true);

    card.dispatchEvent(new Event('mouseleave'));
    expect(component.isPaused()).toBe(false);
  });

  it('should render redesigned visual CTA banner with traveler cutouts and Get in Touch link', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const ctaHeading = compiled.querySelector('#about-cta-heading');
    expect(ctaHeading?.textContent?.trim()).toBe('Ready to plan your Indian journey?');

    const ctaText = compiled.querySelector('.about-cta__text');
    expect(ctaText?.textContent).toContain(
      'Speak with our travel specialists today and receive a tailored itinerary crafted for you.',
    );

    const ctaBtn = compiled.querySelector('.about-cta__btn-primary') as HTMLAnchorElement;
    expect(ctaBtn).toBeTruthy();
    expect(ctaBtn.textContent).toContain('Get in Touch');
    expect(ctaBtn.getAttribute('href')).toBe('/contact');
    expect(ctaBtn.querySelector('.about-cta__btn-icon')).toBeTruthy();

    const leftTraveler = compiled.querySelector('.about-cta__traveler--left img');
    const rightTraveler = compiled.querySelector('.about-cta__traveler--right img');
    expect(leftTraveler?.getAttribute('src')).toBe('images/cta-travelers-left.png');
    expect(rightTraveler?.getAttribute('src')).toBe('images/cta-travelers-right.png');
  });
});
