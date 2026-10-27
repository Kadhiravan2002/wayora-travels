import { Component } from '@angular/core';
import { TourPackage } from './package.model';
import { PackageCardComponent } from './package-card/package-card';

@Component({
  selector: 'app-packages',
  imports: [PackageCardComponent],
  templateUrl: './packages.html',
  styleUrl: './packages.css',
})
export class PackagesComponent {
  readonly packages: TourPackage[] = [
    {
      id: 'kerala-backwater-escape',
      title: 'Kerala Backwater Escape',
      destination: 'Kerala',
      duration: '4 days / 3 nights',
      highlights: ['Houseboat experience', 'Peaceful backwaters', 'Local cuisine'],
      image: 'images/packages/kerala-package.jpg',
      alt: 'Traditional wooden houseboat sailing along tranquil palm-fringed Kerala backwaters',
    },
    {
      id: 'royal-rajasthan',
      title: 'Royal Rajasthan',
      destination: 'Rajasthan',
      duration: '5 days / 4 nights',
      highlights: ['Jaipur heritage', 'Majestic forts', 'Local culture'],
      image: 'images/packages/rajasthan-package.jpg',
      alt: 'Historic Amber Fort walls and royal Rajput architecture in Rajasthan',
    },
    {
      id: 'kashmir-mountain-retreat',
      title: 'Kashmir Mountain Retreat',
      destination: 'Kashmir',
      duration: '5 days / 4 nights',
      highlights: ['Dal Lake', 'Mountain scenery', 'Traditional shikara ride'],
      image: 'images/packages/kashmir-package.jpg',
      alt: 'Traditional shikara boat on calm Dal Lake with snow-capped mountain backdrop in Kashmir',
    },
  ];
}
