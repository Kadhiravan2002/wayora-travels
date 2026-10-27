import { Component } from '@angular/core';
import { Destination } from './destination.model';
import { DestinationCardComponent } from './destination-card/destination-card';

@Component({
  selector: 'app-destinations',
  imports: [DestinationCardComponent],
  templateUrl: './destinations.html',
  styleUrl: './destinations.css',
})
export class DestinationsComponent {
  readonly destinations: Destination[] = [
    {
      id: 'kerala',
      name: 'Kerala',
      category: 'Backwaters & nature',
      image: 'images/destinations/kerala.jpg',
      alt: 'Traditional wooden houseboat floating on peaceful palm-fringed Kerala backwaters',
      link: '#destinations',
    },
    {
      id: 'rajasthan',
      name: 'Rajasthan',
      category: 'Heritage & culture',
      image: 'images/destinations/rajasthan.jpg',
      alt: 'Intricate royal architecture and historic palace facade in Rajasthan',
      link: '#destinations',
    },
    {
      id: 'kashmir',
      name: 'Kashmir',
      category: 'Mountains & lakes',
      image: 'images/destinations/kashmir.jpg',
      alt: 'Snow-dusted Himalayan peaks reflecting across the serene waters of Dal Lake in Kashmir',
      link: '#destinations',
    },
    {
      id: 'goa',
      name: 'Goa',
      category: 'Beaches & relaxation',
      image: 'images/destinations/goa.jpg',
      alt: 'Golden sandy beach fringed with coconut palms during a calm sunset in Goa',
      link: '#destinations',
    },
  ];
}
