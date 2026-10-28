import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { provideRouter } from '@angular/router';
import { ContactComponent } from './contact';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactComponent, ReactiveFormsModule],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the contact component', () => {
    expect(component).toBeTruthy();
  });

  it('should render banner title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const bannerTitle = compiled.querySelector('#contact-banner-title');
    expect(bannerTitle?.textContent?.trim()).toBe('Contact WAYORA Travels');
  });

  it('should render phone, email, address and working hours details in 4 cards', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const cards = compiled.querySelectorAll('.contact-card');
    expect(cards.length).toBe(4);

    const text = compiled.textContent;
    expect(text).toContain('+91 63838 09269');
    expect(text).toContain('kadhiravan2026@gmail.com');
    expect(text).toContain('Thangam Avenue, Chikkarayapuram, Kovur');
    expect(text).toContain('Monday – Saturday: 9:30 AM – 6:30 PM');
    expect(text).not.toContain('Demo Placeholder');
  });

  it('should render the location card with Google Maps link', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const locationCard = compiled.querySelector('.location-card');
    expect(locationCard).toBeTruthy();
    expect(locationCard?.textContent).toContain('Visit Our Planning Desk');
    const link = locationCard?.querySelector('a');
    expect(link?.getAttribute('href')).toBe('https://maps.app.goo.gl/ai7YazyuzqsKvJ1s6');
  });

  it('should validate form and not submit when required fields are missing', () => {
    expect(component.contactForm.valid).toBe(false);

    component.onSubmit();
    fixture.detectChanges();

    expect(component.isSubmitted()).toBe(true);
    expect(component.submissionSuccess()).toBe(false);
  });

  it('should show success message when form is properly completed and submitted', () => {
    component.contactForm.patchValue({
      fullName: 'Rahul Sharma',
      email: 'rahul@example.com',
      phone: '+91 9876543210',
      destination: 'kerala',
      message: 'Looking for a 6-day family trip to Kerala backwaters in December.',
    });

    expect(component.contactForm.valid).toBe(true);

    component.onSubmit();
    fixture.detectChanges();

    expect(component.submissionSuccess()).toBe(true);

    const compiled = fixture.nativeElement as HTMLElement;
    const successFeedback = compiled.querySelector('.form-feedback--success');
    expect(successFeedback).toBeTruthy();
    expect(successFeedback?.textContent).toContain('Enquiry Received');
  });

  it('should render the Send Enquiry submit button and form title as H2', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const formTitle = compiled.querySelector('.contact-form-card__title');
    expect(formTitle?.tagName).toBe('H2');
    expect(formTitle?.textContent?.trim()).toBe('Send an Enquiry');

    const submitBtn = compiled.querySelector('.contact-form__submit');
    expect(submitBtn?.textContent).toContain('Send Enquiry');
  });
});
