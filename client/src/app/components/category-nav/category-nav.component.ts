import { CommonModule, NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-category-nav',
  standalone: true,
  imports: [CommonModule, NgFor],
  templateUrl: './category-nav.component.html',
  styleUrl: './category-nav.component.css',
})
export class CategoryNavComponent {
  @Input() categoryName!: string;
  @Input() color!: string;
  @Input() backgroundColor!: string;
  @Input() subCategories!: string[];
}
