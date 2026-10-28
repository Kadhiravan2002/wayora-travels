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
      category: 'Backwaters and green landscapes',
      image: 'images/destinations/kerala.jpg',
      alt: 'Traditional wooden houseboat floating on calm palm-fringed Kerala backwaters',
      link: '/contact?destination=kerala',
    },
    {
      id: 'rajasthan',
      name: 'Rajasthan',
      category: 'Forts, palaces and desert heritage',
      image: 'images/destinations/rajasthan.jpg',
      alt: 'Intricate royal architecture and majestic historic fort in Rajasthan',
      link: '/contact?destination=rajasthan',
    },
    {
      id: 'kashmir',
      name: 'Kashmir',
      category: 'Mountains and lakes',
      image: 'images/destinations/kashmir.jpg',
      alt: 'Snow-dusted Himalayan peaks reflecting across the serene waters of Dal Lake in Kashmir',
      link: '/contact?destination=kashmir',
    },
    {
      id: 'goa',
      name: 'Goa',
      category: 'Beaches and coastal experiences',
      image: 'images/destinations/goa.jpg',
      alt: 'Golden sandy beach fringed with coconut palms during sunset in Goa',
      link: '/contact?destination=goa',
    },
  ];
}
