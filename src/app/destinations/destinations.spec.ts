import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { DestinationsComponent } from './destinations';

describe('DestinationsComponent', () => {
  let component: DestinationsComponent;
  let fixture: ComponentFixture<DestinationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DestinationsComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(DestinationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the destinations component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the exact eyebrow copy', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const eyebrow = compiled.querySelector('.eyebrow');
    expect(eyebrow?.textContent).toContain('FEATURED DESTINATIONS');
  });

  it('should render the section heading', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const heading = compiled.querySelector('.destinations__heading');
    expect(heading?.textContent?.trim()).toBe('Featured Destinations');
  });

  it('should render exactly 4 destination cards with required names and categories', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const cards = compiled.querySelectorAll('app-destination-card');
    expect(cards.length).toBe(4);

    const cardTexts = Array.from(cards).map((card) => card.textContent);

    expect(cardTexts[0]).toContain('Kerala');
    expect(cardTexts[0]).toContain('Backwaters and green landscapes');

    expect(cardTexts[1]).toContain('Rajasthan');
    expect(cardTexts[1]).toContain('Forts, palaces and desert heritage');

    expect(cardTexts[2]).toContain('Kashmir');
    expect(cardTexts[2]).toContain('Mountains and lakes');

    expect(cardTexts[3]).toContain('Goa');
    expect(cardTexts[3]).toContain('Beaches and coastal experiences');
  });
});
