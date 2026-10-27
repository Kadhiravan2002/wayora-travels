import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DestinationsComponent } from './destinations';

describe('DestinationsComponent', () => {
  let component: DestinationsComponent;
  let fixture: ComponentFixture<DestinationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DestinationsComponent],
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
    const eyebrow = compiled.querySelector('.destinations__eyebrow');
    expect(eyebrow?.textContent).toContain('EXPLORE INDIA');
  });

  it('should render the exact section heading', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const heading = compiled.querySelector('.destinations__heading');
    expect(heading?.textContent?.trim()).toBe('Find your next escape.');
  });

  it('should render the exact supporting text', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const lead = compiled.querySelector('.destinations__lead');
    expect(lead?.textContent).toContain(
      'From tranquil backwaters to royal cities and mountain retreats, discover a destination that feels like you.'
    );
  });

  it('should render exactly 4 destination cards with required names and categories', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const cards = compiled.querySelectorAll('app-destination-card');
    expect(cards.length).toBe(4);

    const cardTexts = Array.from(cards).map((card) => card.textContent);

    expect(cardTexts[0]).toContain('Kerala');
    expect(cardTexts[0]).toContain('Backwaters & nature');

    expect(cardTexts[1]).toContain('Rajasthan');
    expect(cardTexts[1]).toContain('Heritage & culture');

    expect(cardTexts[2]).toContain('Kashmir');
    expect(cardTexts[2]).toContain('Mountains & lakes');

    expect(cardTexts[3]).toContain('Goa');
    expect(cardTexts[3]).toContain('Beaches & relaxation');
  });
});
