import { Component } from '@angular/core';
import { CATEGORIES } from '../../utils/constants';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  navigationCategoryLinks = [
    { name: 'Najnovije', color: '#2ad1d2' },
    ...CATEGORIES,
  ];
}
