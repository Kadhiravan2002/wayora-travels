import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { HomeComponent } from './home';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the home component', () => {
    expect(component).toBeTruthy();
  });

  it('should render all sections in the exact required order', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const sections = compiled.children;

    expect(sections[0].tagName.toLowerCase()).toBe('app-hero');
    expect(sections[1].tagName.toLowerCase()).toBe('app-about-preview');
    expect(sections[2].tagName.toLowerCase()).toBe('app-services-overview');
    expect(sections[3].tagName.toLowerCase()).toBe('app-destinations');
    expect(sections[4].tagName.toLowerCase()).toBe('app-cta-banner');
  });
});
