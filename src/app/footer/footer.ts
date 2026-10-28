import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class FooterComponent {
  readonly currentYear = new Date().getFullYear();
  readonly newsletterFeedback = signal<string | null>(null);

  onNewsletterSubmit(event: Event): void {
    event.preventDefault();
    this.newsletterFeedback.set(
      'Thank you for subscribing! Our seasonal travel guides and itineraries will arrive in your inbox.',
    );
  }
}
