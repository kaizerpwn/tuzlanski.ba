import { Component } from '@angular/core';
import { CATEGORIES } from '../../utils/constants';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  navigationCategoryLinks = ['Najnovije', ...CATEGORIES];
}
