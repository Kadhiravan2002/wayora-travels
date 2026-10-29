import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface ServiceDetail {
  id: string;
  categoryLabel: string;
  title: string;
  descriptor: string;
  description: string;
  highlights: string[];
  image: string;
  alt: string;
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
      categoryLabel: 'PERSONALISED PLANNING',
      title: 'Personalised Travel & Route Planning',
      descriptor: 'Routes shaped around you',
      description:
        "Personalised travel plans tailored to each traveller's interests, schedule, and pace.",
      highlights: ['Custom routes', 'Day-by-day planning', 'Practical guidance'],
      image: 'images/services-travel-planning.jpg',
      alt: 'Travel planning map, camera, and itinerary guide on wooden surface',
    },
    {
      id: 'packages',
      categoryLabel: 'TAILORED HOLIDAYS',
      title: 'Tailored Holiday Packages',
      descriptor: 'More to discover, less to organise',
      description:
        'Thoughtfully coordinated holidays combining destinations, local experiences, and comfortable stays.',
      highlights: ['Multi-stop journeys', 'Transport coordination', 'Flexible itineraries'],
      image: 'images/services-kerala-houseboat.jpg',
      alt: 'Scenic traditional Kerala houseboat cruising through tranquil backwaters',
    },
    {
      id: 'accommodations',
      categoryLabel: 'STAYS & COMFORT',
      title: 'Accommodation Assistance',
      descriptor: 'A stay that suits your journey',
      description:
        'Find suitable accommodation, from heritage properties to peaceful retreats, based on your travel preferences.',
      highlights: ['Stay recommendations', 'Location guidance', 'Comfort and convenience'],
      image: 'images/services-accommodation.jpg',
      alt: 'Luxury heritage resort stay with traditional Indian architectural details',
    },
    {
      id: 'experiences',
      categoryLabel: 'LOCAL DISCOVERIES',
      title: 'Local Experiences & Sightseeing',
      descriptor: 'Experience India beyond the usual sights',
      description:
        'Discover regional food, local traditions, historic places, and meaningful experiences across India.',
      highlights: ['Cultural discoveries', 'Sightseeing planning', 'Regional experiences'],
      image: 'images/services-sightseeing-heritage.jpg',
      alt: 'Historic Indian palace architecture illuminated during a cultural heritage tour',
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
