import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ServicesOverviewComponent } from './services-overview';

describe('ServicesOverviewComponent', () => {
  let component: ServicesOverviewComponent;
  let fixture: ComponentFixture<ServicesOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicesOverviewComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ServicesOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the services overview component', () => {
    expect(component).toBeTruthy();
  });

  it('should render exactly 4 travel service cards', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const cards = compiled.querySelectorAll('.service-card');
    expect(cards.length).toBe(4);
    expect(compiled.textContent).toContain('Personalised Travel & Route Planning');
    expect(compiled.textContent).toContain('Curated Holiday Packages');
    expect(compiled.textContent).toContain('Accommodation Assistance');
    expect(compiled.textContent).toContain('Local Experiences & Sightseeing');
  });

  it('should render section heading and lead text', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const heading = compiled.querySelector('#services-overview-heading');
    expect(heading?.textContent).toContain('Comprehensive Travel Solutions');
    expect(heading?.textContent).toContain('Across India');
    const lead = compiled.querySelector('.services-overview__lead');
    expect(lead?.textContent).toContain(
      'Thoughtfully planned journeys, comfortable stays, and memorable local experiences across India.',
    );
  });

  it('should render the layered travel visual and floating cards', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const img = compiled.querySelector('.services-overview__main-img');
    expect(img).toBeTruthy();
    const floatingCards = compiled.querySelectorAll('.services-overview__floating-card');
    expect(floatingCards.length).toBe(3);
  });

  it('should render View All Travel Services button linking to services page', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const btn = compiled.querySelector('.services-overview__btn') as HTMLAnchorElement;
    expect(btn?.textContent).toContain('View All Travel Services');
    expect(btn?.getAttribute('href')).toBe('/services');
  });
});
