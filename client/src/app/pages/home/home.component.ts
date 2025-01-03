import { Component } from '@angular/core';
import { BigNewsCardComponent } from '../../components/big-news-card/big-news-card.component';
import { SideNewsListComponent } from '../../components/side-news-list/side-news-list.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { SmallNewsCardComponent } from '../../components/small-news-card/small-news-card.component';
import { CategoryNavComponent } from '../../components/category-nav/category-nav.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    BigNewsCardComponent,
    SideNewsListComponent,
    SidebarComponent,
    SmallNewsCardComponent,
    CategoryNavComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
