import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { DestinationCardComponent } from './destination-card';
import { Destination } from '../destination.model';

describe('DestinationCardComponent', () => {
  let component: DestinationCardComponent;
  let fixture: ComponentFixture<DestinationCardComponent>;

  const mockDestination: Destination = {
    id: 'kerala',
    name: 'Kerala',
    category: 'Backwaters and green landscapes',
    image: 'images/destinations/kerala.jpg',
    alt: 'Traditional houseboat on peaceful Kerala backwaters',
    link: '/contact?destination=kerala',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DestinationCardComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(DestinationCardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('destination', mockDestination);
    fixture.detectChanges();
  });

  it('should create the card component', () => {
    expect(component).toBeTruthy();
  });

  it('should render destination name and category', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const title = compiled.querySelector('.card__title');
    const category = compiled.querySelector('.card__category');

    expect(title?.textContent?.trim()).toBe('Kerala');
    expect(category?.textContent?.trim()).toBe('Backwaters and green landscapes');
  });

  it('should render image with src and alt', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const img = compiled.querySelector('.card__img') as HTMLImageElement;

    expect(img).toBeTruthy();
    expect(img.getAttribute('src')).toBe('images/destinations/kerala.jpg');
    expect(img.getAttribute('alt')).toBe('Traditional houseboat on peaceful Kerala backwaters');
  });

  it('should render overlapping circular action arrow with northeast SVG', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const actionBtn = compiled.querySelector('.card__action-btn');
    expect(actionBtn).toBeTruthy();

    const svg = actionBtn?.querySelector('svg');
    expect(svg).toBeTruthy();
  });

  it('should render non-rating decorative brand motif', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const motif = compiled.querySelector('.card__motif');
    expect(motif).toBeTruthy();
    expect(motif?.textContent).toContain('✦');
  });

  it('should configure card link with destination query param', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const link = compiled.querySelector('.card__link') as HTMLAnchorElement;
    expect(link.getAttribute('href')).toContain('/contact');
    expect(link.getAttribute('href')).toContain('destination=kerala');
  });
});
