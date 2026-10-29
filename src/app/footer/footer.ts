import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NewsletterService } from '../services/newsletter.service';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class FooterComponent {
  readonly currentYear = new Date().getFullYear();
  readonly newsletterFeedback = signal<string | null>(null);
  readonly isSubmitting = signal(false);

  private readonly newsletterService = inject(NewsletterService);

  onNewsletterSubmit(event: Event): void {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const emailInput = form.querySelector('input[type="email"]') as HTMLInputElement;
    const honeypotInput = form.querySelector('input[name="hp_company"]') as HTMLInputElement;

    const email = emailInput?.value?.trim() || '';
    const honeypot = honeypotInput?.value || '';

    if (this.isSubmitting()) {
      return;
    }

    if (!email) {
      this.newsletterFeedback.set(
        'Thank you for subscribing! Our seasonal travel guides and itineraries will arrive in your inbox.',
      );
      return;
    }

    this.isSubmitting.set(true);
    this.newsletterFeedback.set(null);

    this.newsletterService.subscribe(email, honeypot).subscribe({
      next: (res) => {
        this.isSubmitting.set(false);
        this.newsletterFeedback.set(res.message);
        if (res.success) {
          form.reset();
        }
      },
      error: (err) => {
        this.isSubmitting.set(false);
        const serverMsg = err.error?.message;
        this.newsletterFeedback.set(
          serverMsg || 'Subscription service currently unavailable. Please try again later.'
        );
      },
    });
  }
}
