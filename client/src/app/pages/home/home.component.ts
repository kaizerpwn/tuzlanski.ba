import { Component } from '@angular/core';
import { BigNewsCardComponent } from '../../components/big-news-card/big-news-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BigNewsCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
