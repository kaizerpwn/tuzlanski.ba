# Users Table Component Documentation

[Linked Table of Contents](#table-of-contents)

## Table of Contents

* [1. Overview](#1-overview)
* [2. Component Structure](#2-component-structure)
* [3. Class Members](#3-class-members)
* [4. Methods](#4-methods)
    * [4.1 `ngOnInit()`](#41-ngoninit)
    * [4.2 `ngOnDestroy()`](#42-ngondestroy)
    * [4.3 `fetchUsers()`](#43-fetchusers)
    * [4.4 `openEditUserModal()`](#44-openeditusermodal)
    * [4.5 `deleteUser()`](#45-deleteuser)


## 1. Overview

The `UsersTableComponent` is an Angular component responsible for displaying a table of users, allowing for editing and deletion of user entries. It interacts with the `UsersService` to fetch and manipulate user data and the `EventService` to react to user addition events.


## 2. Component Structure

The component utilizes Angular's standalone component feature.  It uses a template (`./users-table.component.html`) and stylesheet (`./users-table.component.css`) to render the user table.  The component's logic is encapsulated within the `UsersTableComponent` class.


## 3. Class Members

| Member Name             | Type                      | Description                                                                         |
|--------------------------|---------------------------|-------------------------------------------------------------------------------------|
| `users`                  | `User[]`                  | Array to store fetched user data.                                                    |
| `usersAddedSubscription` | `Subscription`            | Subscription to handle the `usersAddedSource$` observable from `EventService`.      |
| `usersService`           | `UsersService`            | Injected service for fetching and manipulating user data.                           |
| `sanitizer`              | `DomSanitizer`            | Injected service from `@angular/platform-browser`, not currently used in this component. |
| `eventService`           | `EventService`            | Injected service for handling events, specifically the addition of new users.        |
| `dialog`                 | `MatDialog`               | Injected service to open the modal dialog for user editing.                       |


## 4. Methods

### 4.1 `ngOnInit()`

This lifecycle hook is called after the component is initialized. It fetches the initial list of users using `fetchUsers()` and subscribes to the `usersAddedSource$` observable from the `EventService`.  When a new user is added (signaled by the observable), `fetchUsers()` is called again to refresh the user list.

```typescript
ngOnInit() {
  this.fetchUsers();
  this.usersAddedSubscription = this.eventService.usersAddedSource$.subscribe(
    () => {
      this.fetchUsers();
    }
  );
}
```

### 4.2 `ngOnDestroy()`

This lifecycle hook is called just before the component is destroyed. It unsubscribes from the `usersAddedSource$` observable to prevent memory leaks.

```typescript
ngOnDestroy() {
  if (this.usersAddedSubscription) {
    this.usersAddedSubscription.unsubscribe();
  }
}
```

### 4.3 `fetchUsers()`

This method retrieves all users from the `UsersService`.  The service's `getAllUsers()` method returns an observable. The returned data is then mapped to an array of `User` objects.  Note that the data is initially cast as `any` and then specifically cast to a `User` object.  This might indicate a mismatch between the service's response and the `User` model.

```typescript
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
```

### 4.4 `openEditUserModal()`

This method opens a modal dialog (`UsersEditModalComponent`) to allow editing of a selected user. The selected `user` object is passed as data to the modal.

```typescript
openEditUserModal(user: User) {
  this.dialog.open(UsersEditModalComponent, { data: user });
}
```

### 4.5 `deleteUser()`

This method deletes a user from the backend using the `UsersService`. After a successful deletion, it refreshes the user list by calling `fetchUsers()`.

```typescript
protected deleteUser(id: number) {
  this.usersService.deleteUser(id).subscribe(() => {
    this.fetchUsers();
  });
}
```

