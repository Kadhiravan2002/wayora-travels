import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CONTACT_INFO } from '../contact-info';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class ContactComponent implements OnInit {
  readonly contact = CONTACT_INFO;
  readonly contactForm: FormGroup;
  readonly isSubmitted = signal(false);
  readonly submissionSuccess = signal(false);
  private readonly route = inject(ActivatedRoute, { optional: true });

  /**
   * Evaluates whether a valid Google Maps embed iframe URL is configured.
   */
  readonly hasValidEmbedUrl = computed<boolean>(() => {
    const url = this.contact.mapsEmbedUrl.trim();
    return (
      url.startsWith('https://www.google.com/maps/embed') ||
      url.startsWith('https://maps.google.com/maps')
    );
  });

  /**
   * Safe sanitized embed URL for the iframe, if configured.
   */
  readonly sanitizedEmbedUrl = computed<SafeResourceUrl | null>(() => {
    if (this.hasValidEmbedUrl()) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(this.contact.mapsEmbedUrl.trim());
    }
    return null;
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly sanitizer: DomSanitizer,
  ) {
    this.contactForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.pattern('^[+0-9\\s-]{7,16}$')]],
      destination: [''],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  ngOnInit(): void {
    const params = this.route?.snapshot?.queryParams;
    if (params) {
      if (params['package']) {
        const packageMap: Record<string, string> = {
          couple: 'Couple Getaways',
          family: 'Family Holidays',
          group: 'Group Adventures',
          custom: 'Solo & Custom Journeys',
        };
        const pkgName = packageMap[params['package']] || params['package'];
        const messageControl = this.contactForm.get('message');
        if (!messageControl?.dirty && !messageControl?.value) {
          messageControl?.setValue(`Enquiring about the ${pkgName} package.`);
        }
      } else if (params['service']) {
        const serviceMap: Record<string, string> = {
          itinerary: 'Tour & Itinerary Planning',
          packages: 'Tailored Holiday Packages',
          accommodations: 'Accommodation Assistance',
          experiences: 'Local Experiences & Sightseeing',
        };
        const serviceName = serviceMap[params['service']] || params['service'];
        const messageControl = this.contactForm.get('message');
        if (!messageControl?.dirty && !messageControl?.value) {
          messageControl?.setValue(`Enquiring about: ${serviceName}.`);
        }
      }
    }
  }

  onSubmit(): void {
    this.isSubmitted.set(true);

    if (this.contactForm.valid) {
      this.submissionSuccess.set(true);
    }
  }

  resetForm(): void {
    this.contactForm.reset();
    this.isSubmitted.set(false);
    this.submissionSuccess.set(false);
  }
}
