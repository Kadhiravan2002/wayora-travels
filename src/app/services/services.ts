import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface ServiceDetail {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  image: string;
  icon: 'map' | 'suitcase' | 'bed' | 'binoculars';
}

export interface TravelCategory {
  id: string;
  number: string;
  title: string;
  description: string;
  destinations: string;
  image: string;
  alt: string;
  packageParam: 'couple' | 'family' | 'group' | 'custom';
}

@Component({
  selector: 'app-services',
  imports: [RouterLink],
  templateUrl: './services.html',
  styleUrl: './services.css',
})
export class ServicesComponent {
  readonly servicesList: ServiceDetail[] = [
    {
      id: 'itinerary',
      title: 'Personalised Travel & Route Planning',
      subtitle: 'Your trip, planned around you.',
      description: 'Personalised travel plans that fit your schedule, interests, and pace.',
      features: ['Personalised routes', 'Day-by-day planning', 'Practical travel guidance'],
      image: 'images/services-travel-planning.jpg',
      icon: 'map',
    },
    {
      id: 'packages',
      title: 'Tailored Holiday Packages',
      subtitle: 'More to discover, less to organise.',
      description:
        'Bring destinations, local experiences, and relaxing stays together in one trip.',
      features: ['Multi-destination holidays', 'Transport coordination', 'Flexible itineraries'],
      image: 'images/services-kerala-houseboat.jpg',
      icon: 'suitcase',
    },
    {
      id: 'accommodations',
      title: 'Accommodation Assistance',
      subtitle: 'A stay that suits your journey.',
      description:
        'Find the right stay, from heritage properties to peaceful backwater retreats.',
      features: [
        'Heritage and boutique stays',
        'Comfortable room options',
        'Destination-based recommendations',
      ],
      image: 'images/services-accommodation.jpg',
      icon: 'bed',
    },
    {
      id: 'experiences',
      title: 'Local Experiences & Sightseeing',
      subtitle: 'See India beyond the usual sights.',
      description:
        'Discover regional food, local traditions, historic places, and beautiful landscapes.',
      features: [
        'Local sightseeing guides',
        'Cultural and culinary activities',
        'Nature and heritage excursions',
      ],
      image: 'images/services-sightseeing-heritage.jpg',
      icon: 'binoculars',
    },
  ];

  readonly travelCategories: TravelCategory[] = [
    {
      id: 'couple-getaways',
      number: '01',
      title: 'Couple Getaways',
      description: 'Romantic escapes with scenic stays and time to relax together.',
      destinations: 'Kerala · Goa · Kashmir',
      image: 'images/packages/category-couple.jpg',
      alt: 'Couple enjoying a serene, peaceful boat ride together on calm waters',
      packageParam: 'couple',
    },
    {
      id: 'family-holidays',
      number: '02',
      title: 'Family Holidays',
      description: 'Comfortable stays and flexible adventures for the whole family.',
      destinations: 'Kerala · Rajasthan · Kashmir',
      image: 'images/packages/category-family.jpg',
      alt: 'Family enjoying a sunny seaside beach holiday together',
      packageParam: 'family',
    },
    {
      id: 'friends-group',
      number: '03',
      title: 'Group Adventures',
      description: "Discover India's landscapes and local culture together.",
      destinations: 'Rajasthan · Goa · Kashmir',
      image: 'images/packages/category-friends.jpg',
      alt: 'Four friends with backpacks hiking together along a scenic mountain trail',
      packageParam: 'group',
    },
    {
      id: 'solo-custom',
      number: '04',
      title: 'Solo & Custom Journeys',
      description: 'Explore at your own pace with a journey shaped around you.',
      destinations: 'Kerala · Rajasthan · Kashmir · Goa',
      image: 'images/packages/category-solo.jpg',
      alt: 'Solo traveler standing at a mountain ridge viewpoint admiring vast scenic vistas',
      packageParam: 'custom',
    },
  ];
}
