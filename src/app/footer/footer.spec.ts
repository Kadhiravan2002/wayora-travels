import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { FooterComponent } from './footer';
import { NewsletterService } from '../services/newsletter.service';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  const mockNewsletterService = {
    subscribe: () =>
      of({
        success: true,
        message: 'Thank you for subscribing! Our seasonal travel guides and itineraries will arrive in your inbox.',
      }),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent],
      providers: [
        provideRouter([]),
        { provide: NewsletterService, useValue: mockNewsletterService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the footer component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the brand description and not render the footer logo', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const logoImg = compiled.querySelector('.footer__logo');
    expect(logoImg).toBeFalsy();

    const desc = compiled.querySelector('.footer__desc');
    expect(desc?.textContent).toContain('modern Indian travel company');
  });

  it('should render quick links to all four primary pages', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const links = compiled.querySelectorAll('.footer__link');
    const labels = Array.from(links).map((l) => l.textContent?.trim());
    expect(labels).toEqual(['Home', 'About', 'Services', 'Contact']);
  });

  it('should render social media links and not render logo plate', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const socials = compiled.querySelectorAll('.footer__social-link');
    expect(socials.length).toBe(4);
    const logoPlate = compiled.querySelector('.footer__logo-plate');
    expect(logoPlate).toBeFalsy();
  });

  it('should render destination links for key regions', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const destLinks = compiled.querySelectorAll<HTMLAnchorElement>('.footer__dest-link');
    const labels = Array.from(destLinks).map((l) => l.textContent?.trim());
    expect(labels).toEqual(['Kerala', 'Rajasthan', 'Kashmir', 'Goa']);

    const fragments = Array.from(destLinks).map((l) => l.getAttribute('fragment') || l.getAttribute('href')?.split('#')[1]);
    expect(fragments).toEqual(['kerala', 'rajasthan', 'kashmir', 'goa']);
  });

  it('should render newsletter input and feedback on submit', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const form = compiled.querySelector('.footer__newsletter-form') as HTMLFormElement;
    expect(form).toBeTruthy();

    form.dispatchEvent(new Event('submit'));
    fixture.detectChanges();

    const feedback = compiled.querySelector('.footer__newsletter-feedback');
    expect(feedback?.textContent).toContain('Thank you for subscribing!');
  });

  it('should render copyright with current year', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const copyright = compiled.querySelector('.footer__copyright');
    expect(copyright?.textContent).toContain(component.currentYear.toString());
  });
});
