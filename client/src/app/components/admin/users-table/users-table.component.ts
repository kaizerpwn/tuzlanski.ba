import { Component } from '@angular/core';
import { User } from '../../../models/User';
import { UsersService } from '../../../services/users.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-users-table',
  standalone: true,
  imports: [],
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css'],
})
export class UsersTableComponent {
  users: User[] = [];

  constructor(
    private usersService: UsersService,
    protected sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.usersService.getAllUsers().subscribe((data: any) => {
      this.users = data.map(
        (item: any) =>
          new User({
            id: item.id,
            username: item.username,
            email: item.email,
            password: item.password,
            role: item.role,
            created_at: item.created_at,
            updated_at: item.updated_at,
            date_of_birth: item.date_of_birth,
          } as unknown as User)
      );
    });
  }

  protected deleteUser(id: number) {
    this.usersService.deleteUser(id).subscribe(() => {
      this.fetchUsers();
    });
  }
}
