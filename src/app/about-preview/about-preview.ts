import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CONTACT_INFO } from '../contact-info';

@Component({
  selector: 'app-about-preview',
  imports: [RouterLink],
  templateUrl: './about-preview.html',
  styleUrl: './about-preview.css',
})
export class AboutPreviewComponent {
  readonly contact = CONTACT_INFO;
}
