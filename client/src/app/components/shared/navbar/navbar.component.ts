import { Component } from '@angular/core';
import { CATEGORIES } from '../../../utils/constants';
import { Router, RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, NgFor],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  navigationCategoryLinks = [
    { name: 'Najnovije', color: '#2ad1d2' },
    ...CATEGORIES,
  ];

  constructor(protected authService: AuthService, private router: Router) {}

  isMobileMenuOpen = false;

  handleLogout() {
    this.router.navigate(['/login']);
    this.authService.logout();
  }

  toggleMobileMenu() {
    console.log('Mobile menu toggled');
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}
