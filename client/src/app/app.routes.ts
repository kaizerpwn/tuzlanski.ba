import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { AdminNewsComponent } from './pages/admin-news/admin-news.component';
import { SingleNewsComponent } from './components/landing/single-news/single-news.component';
import { AdminUsersComponent } from './pages/admin-users/admin-users.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'category/:category',
    component: CategoriesComponent,
  },
  {
    path: 'news/:id',
    component: SingleNewsComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },

  {
    path: 'admin',
    component: AdminDashboardComponent,
  },
  {
    path: 'admin/news',
    component: AdminNewsComponent,
  },
  {
    path: 'admin/users',
    component: AdminUsersComponent,
  },
];
