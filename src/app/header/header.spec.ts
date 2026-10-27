import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
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
