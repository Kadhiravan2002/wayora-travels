import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PackageCardComponent } from './package-card';
import { TourPackage } from '../package.model';

describe('PackageCardComponent', () => {
  let component: PackageCardComponent;
  let fixture: ComponentFixture<PackageCardComponent>;

  const mockPackage: TourPackage = {
    id: 'kerala-backwater-escape',
    title: 'Kerala Backwater Escape',
    destination: 'Kerala',
    duration: '4 days / 3 nights',
    highlights: ['Houseboat experience', 'Peaceful backwaters', 'Local cuisine'],
    image: 'images/packages/kerala-package.jpg',
    alt: 'Traditional wooden houseboat sailing along tranquil palm-fringed Kerala backwaters',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PackageCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PackageCardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('package', mockPackage);
    fixture.detectChanges();
  });

  it('should create the package card component', () => {
    expect(component).toBeTruthy();
  });

  it('should render title, destination, and duration badge', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const title = compiled.querySelector('.package-card__title');
    const destination = compiled.querySelector('.package-card__destination');
    const duration = compiled.querySelector('.package-card__duration-badge');

    expect(title?.textContent?.trim()).toBe('Kerala Backwater Escape');
    expect(destination?.textContent?.trim()).toBe('Kerala');
    expect(duration?.textContent?.trim()).toBe('4 days / 3 nights');
  });

  it('should render all highlights', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const highlights = compiled.querySelectorAll('.package-card__highlight-item');
    expect(highlights.length).toBe(3);

    const itemsText = Array.from(highlights).map((item) => item.textContent);
    expect(itemsText[0]).toContain('Houseboat experience');
    expect(itemsText[1]).toContain('Peaceful backwaters');
    expect(itemsText[2]).toContain('Local cuisine');
  });

  it('should render the CTA with meaningful link including package identifier', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const cta = compiled.querySelector('.package-card__btn');

    expect(cta?.textContent?.trim()).toBe('Explore Package');
    expect(cta?.getAttribute('href')).toBe('#contact?package=kerala-backwater-escape');
  });
});
