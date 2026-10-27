import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PackagesComponent } from './packages';

describe('PackagesComponent', () => {
  let component: PackagesComponent;
  let fixture: ComponentFixture<PackagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PackagesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PackagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the packages component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the exact eyebrow copy', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const eyebrow = compiled.querySelector('.packages__eyebrow');
    expect(eyebrow?.textContent).toContain('CURATED FOR YOU');
  });

  it('should render the exact section heading', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const heading = compiled.querySelector('.packages__heading');
    expect(heading?.textContent?.trim()).toBe('Journeys worth remembering.');
  });

  it('should render the exact supporting text', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const lead = compiled.querySelector('.packages__lead');
    expect(lead?.textContent).toContain(
      "Thoughtfully planned escapes to help you experience India's most beautiful places."
    );
  });

  it('should render exactly three sample package cards with correct titles and destinations', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const cards = compiled.querySelectorAll('app-package-card');
    expect(cards.length).toBe(3);

    const cardTexts = Array.from(cards).map((c) => c.textContent);

    expect(cardTexts[0]).toContain('Kerala Backwater Escape');
    expect(cardTexts[0]).toContain('Kerala');
    expect(cardTexts[0]).toContain('4 days / 3 nights');
    expect(cardTexts[0]).toContain('Houseboat experience');

    expect(cardTexts[1]).toContain('Royal Rajasthan');
    expect(cardTexts[1]).toContain('Rajasthan');
    expect(cardTexts[1]).toContain('5 days / 4 nights');
    expect(cardTexts[1]).toContain('Jaipur heritage');

    expect(cardTexts[2]).toContain('Kashmir Mountain Retreat');
    expect(cardTexts[2]).toContain('Kashmir');
    expect(cardTexts[2]).toContain('5 days / 4 nights');
    expect(cardTexts[2]).toContain('Dal Lake');
  });
});
