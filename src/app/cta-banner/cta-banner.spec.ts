import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { CtaBannerComponent } from './cta-banner';

describe('CtaBannerComponent', () => {
  let component: CtaBannerComponent;
  let fixture: ComponentFixture<CtaBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CtaBannerComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(CtaBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the CTA banner component', () => {
    expect(component).toBeTruthy();
  });

  it('should render exact heading and supporting text', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const heading = compiled.querySelector('#cta-banner-heading');
    expect(heading?.textContent?.trim()).toBe('Your next Indian adventure starts here.');

    const lead = compiled.querySelector('.cta-banner__lead');
    expect(lead?.textContent).toContain(
      'Let our travel specialists design a seamless, personalized itinerary',
    );
  });

  it('should render primary CTA linking to contact and secondary link to destinations', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const btns = compiled.querySelectorAll('.cta-banner__btn');
    expect(btns.length).toBe(2);
    expect(btns[0].textContent?.trim()).toBe('Plan Your Trip');
    expect(btns[1].textContent?.trim()).toBe('Explore Destinations');
  });
});
