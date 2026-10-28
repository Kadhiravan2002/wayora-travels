import { Component, HostListener, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

export interface NavLink {
  label: string;
  path: string;
}

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class HeaderComponent {
  readonly isMobileMenuOpen = signal(false);

  readonly navLinks: NavLink[] = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Contact', path: '/contact' },
  ];

  toggleMobileMenu(): void {
    const nextState = !this.isMobileMenuOpen();
    this.isMobileMenuOpen.set(nextState);
    this.updateBodyScroll(!nextState);
  }

  closeMobileMenu(): void {
    if (this.isMobileMenuOpen()) {
      this.isMobileMenuOpen.set(false);
      this.updateBodyScroll(true);
    }
  }

  @HostListener('window:keydown.escape')
  onEscape(): void {
    this.closeMobileMenu();
  }

  @HostListener('window:resize')
  onResize(): void {
    if (typeof window !== 'undefined' && window.innerWidth >= 992 && this.isMobileMenuOpen()) {
      this.closeMobileMenu();
    }
  }

  private updateBodyScroll(allowScroll: boolean): void {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = allowScroll ? '' : 'hidden';
    }
  }
}
