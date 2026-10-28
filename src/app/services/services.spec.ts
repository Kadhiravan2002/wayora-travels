import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ServicesComponent } from './services';

describe('ServicesComponent', () => {
  let component: ServicesComponent;
  let fixture: ComponentFixture<ServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicesComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the services component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the banner title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const bannerTitle = compiled.querySelector('#services-banner-title');
    expect(bannerTitle?.textContent?.trim()).toBe('Our Travel Services');
  });

  it('should render the centered expertise & support section header', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const heading = compiled.querySelector('#services-overview-heading');
    expect(heading?.textContent).toContain('Thoughtful services for');
    expect(heading?.textContent).toContain('discerning travelers.');
    const lead = compiled.querySelector('.services-main__lead');
    expect(lead?.textContent).toContain(
      "Every service is shaped by our passion for India's regional diversity and our dedication to personal, unhurried travel assistance.",
    );
  });

  it('should render exactly 4 detailed service cards with natural, customer-focused copy', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const cards = compiled.querySelectorAll('.service-detail-card');
    expect(cards.length).toBe(4);

    expect(compiled.textContent).toContain('Personalised Travel & Route Planning');
    expect(compiled.textContent).toContain('Your trip, planned around you.');
    expect(compiled.textContent).toContain('Tailored Holiday Packages');
    expect(compiled.textContent).toContain('More to discover, less to organise.');
    expect(compiled.textContent).toContain('Accommodation Assistance');
    expect(compiled.textContent).toContain('A stay that suits your journey.');
    expect(compiled.textContent).toContain('Local Experiences & Sightseeing');
    expect(compiled.textContent).toContain('See India beyond the usual sights.');
  });

  it('should render the curated travel categories section with 4 image-led cards including Group Adventures', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const catHeading = compiled.querySelector('#travel-categories-heading');
    expect(catHeading?.textContent?.trim()).toBe('Journeys made for the way you travel.');

    const catCards = compiled.querySelectorAll('.travel-category-card');
    expect(catCards.length).toBe(4);

    expect(compiled.textContent).toContain('Couple Getaways');
    expect(compiled.textContent).toContain('Family Holidays');
    expect(compiled.textContent).toContain('Group Adventures');
    expect(compiled.textContent).toContain('Solo & Custom Journeys');
  });

  it('should link travel category cards with respective package query params', () => {
    expect(component.travelCategories.length).toBe(4);
    expect(component.travelCategories[0].packageParam).toBe('couple');
    expect(component.travelCategories[1].packageParam).toBe('family');
    expect(component.travelCategories[2].packageParam).toBe('group');
    expect(component.travelCategories[3].packageParam).toBe('custom');
  });

  it('should render CTA linking to contact', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const cta = compiled.querySelector('.services-cta a');
    expect(cta?.textContent?.trim()).toBe('Plan Your Journey Today');
  });

  it('should render Services CTA banner with scenic backdrop, eyebrow, heading, and arrow icon', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const bgImg = compiled.querySelector('.services-cta__bg-img') as HTMLImageElement;
    expect(bgImg?.getAttribute('src')).toBe('images/wayora-cta-landscape.jpg');

    const eyebrow = compiled.querySelector('.services-cta__eyebrow');
    expect(eyebrow?.textContent).toContain('START YOUR CONVERSATION');

    const heading = compiled.querySelector('#services-cta-heading');
    expect(heading?.textContent?.trim()).toBe('Have a custom trip in mind?');

    const lead = compiled.querySelector('.services-cta__lead');
    expect(lead?.textContent).toContain('Tell us your travel dates, group size, and interests.');

    const btn = compiled.querySelector('.services-cta__btn--primary');
    expect(btn?.getAttribute('routerLink')).toBe('/contact');
    expect(btn?.querySelector('.services-cta__btn-icon')).toBeTruthy();
  });
});
