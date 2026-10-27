import { Component, input } from '@angular/core';
import { Destination } from '../destination.model';

@Component({
  selector: 'app-destination-card',
  imports: [],
  templateUrl: './destination-card.html',
  styleUrl: './destination-card.css',
})
export class DestinationCardComponent {
  readonly destination = input.required<Destination>();
}
