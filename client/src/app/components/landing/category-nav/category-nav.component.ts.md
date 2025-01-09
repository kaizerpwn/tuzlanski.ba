# Category Navigation Component Documentation

[Linked Table of Contents](#linked-table-of-contents)

## Linked Table of Contents

* [1. Overview](#1-overview)
* [2. Component Structure](#2-component-structure)
* [3. Inputs](#3-inputs)


## 1. Overview

The `CategoryNavComponent` is a standalone Angular component designed to display a navigation menu for a given category.  It leverages Angular's standalone component feature for improved modularity and reduced boilerplate. The component renders a list of subcategories, allowing users to navigate to different sections within the application.  Styling is handled through CSS, allowing for easy customization.


## 2. Component Structure

The `CategoryNavComponent` is a simple presentational component.  It doesn't contain any complex logic or business rules. It receives data through input properties and renders it using Angular's template system.  The component's structure is straightforward:

| Element          | Description                                                              |
|-----------------|--------------------------------------------------------------------------|
| `@Component`    | Angular decorator that defines the component's metadata.                  |
| `selector`       | Specifies the component's HTML tag (`<app-category-nav>`).                |
| `standalone`     | Indicates that the component is standalone, not requiring a NgModule.    |
| `imports`        | Lists the modules required by the component (CommonModule, NgFor, RouterLink). |
| `templateUrl`   | Specifies the path to the component's HTML template.                   |
| `styleUrl`       | Specifies the path to the component's CSS stylesheet.                   |
| `@Input() categoryName` | Receives the main category name as a string. |
| `@Input() color` | Receives the text color as a string (e.g., "#007bff"). |
| `@Input() backgroundColor` | Receives the background color as a string (e.g., "#f8f9fa"). |
| `@Input() subCategories` | Receives an array of strings representing the subcategories. |


The `imports` array includes:

* **`CommonModule`**: Provides common directives like `NgFor` which is used within the component's template (located at `./category-nav.component.html`).
* **`NgFor`**:  Used to iterate over the `subCategories` array and display each subcategory as a link.
* **`RouterLink`**: Enables navigation to different routes within the application when a subcategory link is clicked.  Each subcategory string within `subCategories` is assumed to be a valid route.



## 3. Inputs

The component accepts the following input properties:

| Input Property       | Type      | Description                                                     |
|-----------------------|-----------|-----------------------------------------------------------------|
| `categoryName`       | `string`  | The name of the main category.                                |
| `color`              | `string`  | The text color for the category name and subcategories.         |
| `backgroundColor`    | `string`  | The background color for the navigation menu.                    |
| `subCategories`      | `string[]` | An array of strings representing the subcategories. Each string should correspond to a route. |


No error handling or input validation is explicitly implemented in this component.  It's assumed that the parent component will provide valid input data.
