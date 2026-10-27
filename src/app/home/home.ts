import { Component } from '@angular/core';
import { HeroComponent } from '../hero/hero';
import { DestinationsComponent } from '../destinations/destinations';
import { PackagesComponent } from '../packages/packages';

@Component({
  selector: 'app-home',
  imports: [HeroComponent, DestinationsComponent, PackagesComponent],
  templateUrl: './home.html',
  styles: `
    :host {
      display: block;
      width: 100%;
    }
  `,
})
export class HomeComponent {}

