import { Component, OnInit, OnDestroy, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header';
import { FooterComponent } from './footer/footer';
import { ScrollRevealService } from './scroll-reveal.service';

@Component({
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App implements OnInit, OnDestroy {
  protected readonly title = signal('wayora-travels');
  private readonly scrollReveal = inject(ScrollRevealService);

  ngOnInit(): void {
    this.scrollReveal.init();
  }

  ngOnDestroy(): void {
    this.scrollReveal.destroy();
  }
}
