import { Component } from '@angular/core';
import { HeroComponent } from '../hero/hero';
import { AboutPreviewComponent } from '../about-preview/about-preview';
import { ServicesOverviewComponent } from '../services-overview/services-overview';
import { DestinationsComponent } from '../destinations/destinations';
import { CtaBannerComponent } from '../cta-banner/cta-banner';

@Component({
  selector: 'app-home',
  imports: [
    HeroComponent,
    AboutPreviewComponent,
    ServicesOverviewComponent,
    DestinationsComponent,
    CtaBannerComponent,
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
