import { Component, input } from '@angular/core';
import { TourPackage } from '../package.model';

@Component({
  selector: 'app-package-card',
  imports: [],
  templateUrl: './package-card.html',
  styleUrl: './package-card.css',
})
export class PackageCardComponent {
  readonly package = input.required<TourPackage>();
}
