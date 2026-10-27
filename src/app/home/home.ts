import { Component } from '@angular/core';
import { HeroComponent } from '../hero/hero';
import { DestinationsComponent } from '../destinations/destinations';
import { PackagesComponent } from '../packages/packages';
import { WhyChooseComponent } from '../why-choose/why-choose';

@Component({
  selector: 'app-home',
  imports: [
    HeroComponent,
    DestinationsComponent,
    PackagesComponent,
    WhyChooseComponent,
  ],
  templateUrl: './home.html',
  styles: `
    :host {
      display: block;
      width: 100%;
    }
  `,
})
export class HomeComponent {}

