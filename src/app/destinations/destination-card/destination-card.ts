import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Destination } from '../destination.model';

@Component({
  selector: 'app-destination-card',
  imports: [RouterLink],
  templateUrl: './destination-card.html',
  styleUrl: './destination-card.css',
})
export class DestinationCardComponent {
  readonly destination = input.required<Destination>();
}
