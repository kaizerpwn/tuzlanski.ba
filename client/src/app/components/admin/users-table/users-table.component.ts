import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../../../models/User';
import { UsersService } from '../../../services/users.service';
import { DomSanitizer } from '@angular/platform-browser';
import { EventService } from '../../../services/event.service';
import { Subscription } from 'rxjs';
import { UsersEditModalComponent } from '../users-edit-modal/users-edit-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-users-table',
  standalone: true,
  imports: [],
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css'],
})
export class UsersTableComponent implements OnInit, OnDestroy {
  users: User[] = [];
  private usersAddedSubscription!: Subscription;

  constructor(
    private usersService: UsersService,
    protected sanitizer: DomSanitizer,
    private eventService: EventService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.fetchUsers();
    this.usersAddedSubscription = this.eventService.usersAddedSource$.subscribe(
      () => {
        this.fetchUsers();
      }
    );
  }

  ngOnDestroy() {
    if (this.usersAddedSubscription) {
      this.usersAddedSubscription.unsubscribe();
    }
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

  openEditUserModal(user: User) {
    this.dialog.open(UsersEditModalComponent, { data: user });
  }

  protected deleteUser(id: number) {
    this.usersService.deleteUser(id).subscribe(() => {
      this.fetchUsers();
    });
  }
}
