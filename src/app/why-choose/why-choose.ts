import { Component } from '@angular/core';

export interface Benefit {
  id: string;
  title: string;
  description: string;
  icon: 'planned' | 'experiences' | 'options' | 'support';
}

@Component({
  selector: 'app-why-choose',
  templateUrl: './why-choose.html',
  styleUrl: './why-choose.css',
})
export class WhyChooseComponent {
  readonly benefits: Benefit[] = [
    {
      id: 'thoughtfully-planned',
      title: 'Thoughtfully Planned',
      description: 'Itineraries shaped around your interests, time and travel preferences.',
      icon: 'planned',
    },
    {
      id: 'experiences-that-matter',
      title: 'Experiences That Matter',
      description: 'Discover local culture, memorable landscapes and meaningful moments.',
      icon: 'experiences',
    },
    {
      id: 'flexible-travel-options',
      title: 'Flexible Travel Options',
      description: 'Explore ready-made journeys or enquire about a trip tailored to you.',
      icon: 'options',
    },
    {
      id: 'support-along-the-way',
      title: 'Support Along the Way',
      description: 'Get help understanding your options before you decide on your journey.',
      icon: 'support',
    },
  ];
}
