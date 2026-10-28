import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { AboutComponent } from './about/about';
import { ServicesComponent } from './services/services';
import { ContactComponent } from './contact/contact';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'WAYORA Travels — Discover India' },
  { path: 'about', component: AboutComponent, title: 'About — WAYORA Travels' },
  { path: 'services', component: ServicesComponent, title: 'Services — WAYORA Travels' },
  { path: 'contact', component: ContactComponent, title: 'Contact — WAYORA Travels' },
  { path: '**', redirectTo: '' },
];
