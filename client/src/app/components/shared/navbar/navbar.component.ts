import { Component } from '@angular/core';
import { CATEGORIES } from '../../../utils/constants';
import { RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';

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

  isMobileMenuOpen = false;

  toggleMobileMenu() {
    console.log('Mobile menu toggled');
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}
