import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { HeaderComponent } from './header';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the header component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the WAYORA brand title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const brandTitle = compiled.querySelector('.brand-name');
    expect(brandTitle?.textContent?.trim()).toBe('WAYORA');
  });

  it('should render the official logo image with proper attributes', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const logoImg = compiled.querySelector('.brand__logo') as HTMLImageElement;
    expect(logoImg).toBeTruthy();
    expect(logoImg.getAttribute('src')).toBe('images/wayora-logo.png');
  });

  it('should not render the top information strip', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const topBar = compiled.querySelector('.top-bar');
    expect(topBar).toBeNull();
  });

  it('should render the horizontal desktop navigation links', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const navLinks = compiled.querySelectorAll('.nav-desktop .nav-link');
    expect(navLinks.length).toBe(4);
    const linkTexts = Array.from(navLinks).map((link) => link.textContent?.trim());
    expect(linkTexts).toEqual(['Home', 'About', 'Services', 'Contact']);
  });

  it('should render the pill-shaped Plan Your Trip CTA button with northeast arrow', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const cta = compiled.querySelector('.header-actions .header-cta') as HTMLAnchorElement;
    expect(cta).toBeTruthy();
    expect(cta.textContent).toContain('Plan Your Trip');
    expect(cta.getAttribute('href')).toBe('/contact');
    const icon = cta.querySelector('.header-cta__icon svg');
    expect(icon).toBeTruthy();
  });

  it('should toggle mobile menu when toggle button is clicked', () => {
    expect(component.isMobileMenuOpen()).toBe(false);

    const toggleBtn = fixture.nativeElement.querySelector('.menu-toggle') as HTMLButtonElement;
    toggleBtn.click();
    fixture.detectChanges();

    expect(component.isMobileMenuOpen()).toBe(true);

    toggleBtn.click();
    fixture.detectChanges();

    expect(component.isMobileMenuOpen()).toBe(false);
  });

  it('should close mobile menu on escape key press', () => {
    component.toggleMobileMenu();
    expect(component.isMobileMenuOpen()).toBe(true);

    component.onEscape();
    expect(component.isMobileMenuOpen()).toBe(false);
  });
});
