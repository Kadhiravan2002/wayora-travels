import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-services-overview',
  imports: [RouterLink],
  templateUrl: './services-overview.html',
  styleUrl: './services-overview.css',
})
export class ServicesOverviewComponent {
  readonly services: ServiceItem[] = [
    {
      id: 'itinerary',
      title: 'Personalised Travel & Route Planning',
      description:
        'Personalised routes and day-by-day plans shaped around your interests and pace.',
      icon: '🗺️',
    },
    {
      id: 'packages',
      title: 'Curated Holiday Packages',
      description:
        'Well-planned holidays combining scenic destinations, culture, and relaxation.',
      icon: '✨',
    },
    {
      id: 'accommodations',
      title: 'Accommodation Assistance',
      description:
        'Handpicked stays, from heritage properties to peaceful backwater retreats.',
      icon: '🏡',
    },
    {
      id: 'experiences',
      title: 'Local Experiences & Sightseeing',
      description:
        "Discover local culture, cuisine, heritage, and India's natural beauty.",
      icon: '🌄',
    },
  ];
}
