import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DestinationCardComponent } from './destination-card';
import { Destination } from '../destination.model';

describe('DestinationCardComponent', () => {
  let component: DestinationCardComponent;
  let fixture: ComponentFixture<DestinationCardComponent>;

  const mockDestination: Destination = {
    id: 'kerala',
    name: 'Kerala',
    category: 'Backwaters & nature',
    image: 'images/destinations/kerala.jpg',
    alt: 'Traditional houseboat on peaceful Kerala backwaters',
    link: '#destinations',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DestinationCardComponent],
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
    expect(category?.textContent?.trim()).toBe('Backwaters & nature');
  });

  it('should render image with src and alt', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const img = compiled.querySelector('.card__img') as HTMLImageElement;

    expect(img).toBeTruthy();
    expect(img.getAttribute('src')).toBe('images/destinations/kerala.jpg');
    expect(img.getAttribute('alt')).toBe('Traditional houseboat on peaceful Kerala backwaters');
  });

  it('should render interactive affordance text and arrow', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const action = compiled.querySelector('.card__action');
    expect(action?.textContent).toContain('Explore destination');
    expect(action?.textContent).toContain('→');
  });
});
