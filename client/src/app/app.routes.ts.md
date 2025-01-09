# Angular Routing Configuration Documentation

[TOC]

## 1. Introduction

This document details the Angular routing configuration defined in `routes.ts`.  This configuration maps URLs to specific Angular components, enabling navigation within the application.

## 2. Route Configuration (`routes.ts`)

The routing configuration is an array of route objects exported as the constant `routes`. Each route object defines a path and the corresponding component to be rendered.

| Path             | Component                     | Description                                      |
|-----------------|---------------------------------|--------------------------------------------------|
| `''`             | `HomeComponent`                | Home page, the default route.                    |
| `'category/:category'` | `CategoriesComponent`          | Displays news based on a specific category. The `:category` segment is a route parameter. |
| `'news/:id'`      | `SingleNewsComponent`           | Displays a single news article based on its ID. The `:id` segment is a route parameter. |
| `'login'`         | `LoginComponent`               | User login page.                                  |
| `'register'`      | `RegisterComponent`             | User registration page.                            |
| `'admin'`         | `AdminDashboardComponent`       | Admin dashboard, acts as a parent route for other admin pages. |
| `'admin/news'`    | `AdminNewsComponent`           | Admin news management page.                       |
| `'admin/users'`   | `AdminUsersComponent`          | Admin users management page.                      |


## 3. Route Parameters

The routes utilize route parameters to dynamically render content based on user input.

* **`/:category`:** This parameter in the `/category/:category` route allows the `CategoriesComponent` to fetch and display news items belonging to a specific category.  The value of `:category` is accessible within the `CategoriesComponent` via the `ActivatedRoute` service.

* **`/:id`:** This parameter in the `/news/:id` route allows the `SingleNewsComponent` to retrieve and display a single news article based on the provided ID.  Similar to `:category`, the value of `:id` is accessible within the `SingleNewsComponent` via the `ActivatedRoute` service.


## 4. Nested Routes (Admin Section)

The admin section demonstrates a nested routing structure.  The path `'admin'` acts as a parent route, and child routes (`'admin/news'`, `'admin/users'`) are nested under it.  This structure organizes admin-related functionalities under a single parent route, improving navigation and organization.  This approach can be further extended to create more deeply nested structures for more complex applications.


## 5.  Navigation

Navigation to different routes within the application can be achieved using either the Angular Router's programmatic API or by using `<a>` tags with the routerLink directive in the application's templates.


## 6.  Further Considerations

This documentation provides a high-level overview of the routing configuration.  For more detailed information on Angular routing, please refer to the official Angular documentation.  The implementation relies on standard Angular routing practices and doesn't employ any advanced routing techniques like lazy loading or route guards.  Adding such features may be considered for performance enhancements in larger applications.
