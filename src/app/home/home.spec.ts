import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the home component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the hero section', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-hero')).toBeTruthy();
  });

  it('should render the destinations section directly below hero', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-destinations')).toBeTruthy();
  });

  it('should render the packages section directly below destinations', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-packages')).toBeTruthy();
  });
});
