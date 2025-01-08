# News Modal Component Documentation

## Table of Contents

* [1. Overview](#1-overview)
* [2. Component Structure](#2-component-structure)
* [3. Class Members](#3-class-members)
    * [3.1 Properties](#31-properties)
    * [3.2 Methods](#32-methods)
* [4. Form Handling](#4-form-handling)
* [5. Image Handling](#5-image-handling)
* [6. Data Submission](#6-data-submission)


## 1. Overview

The `NewsModalComponent` is an Angular component responsible for creating new news entries.  It utilizes a reactive form for data input, a rich text editor (`ngx-editor`), and handles image uploads. The component interacts with the `NewsService` to submit new news data and the `EventService` to broadcast a news creation event.


## 2. Component Structure

The component uses a standalone component structure, importing necessary Angular modules (ReactiveFormsModule, MatDialogModule, CommonModule) and the `ngx-editor` module.  A custom element schema is included to accommodate potential elements from external libraries. The component's template (`news-create-modal.component.html`) and styles (`news-create-modal.component.scss`) are separately defined.


## 3. Class Members

### 3.1 Properties

| Property Name        | Type                                      | Description                                                                                               |
|-----------------------|-------------------------------------------|-----------------------------------------------------------------------------------------------------------|
| `newsForm`           | `FormGroup`                               | Reactive form group managing news data input.                                                              |
| `editor`             | `Editor`                                   | Instance of the `ngx-editor` for rich text editing.                                                        |
| `categories`         | `any[]`                                   | Array of news categories (populated from `CATEGORIES` constant).                                          |
| `selectedFile`       | `File | null`                             | Stores the selected thumbnail file.                                                                       |
| `previewUrl`         | `string | ArrayBuffer | null`             | Stores the preview URL of the selected thumbnail.                                                          |
| `toolbar`            | `Toolbar`                                 | Configuration for the `ngx-editor` toolbar.                                                             |


### 3.2 Methods

| Method Name          | Description                                                                                                                                                                   | Algorithm/Implementation Details                                                                                                                                 |
|-----------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `onFileSelected`     | Handles file selection for the news thumbnail. Reads the selected file and updates the `previewUrl` using a `FileReader` to display a preview.                        | Uses a `FileReader` to asynchronously read the file's data URL.  The `onload` event of the `FileReader` updates `this.previewUrl` with the resulting data URL.          |
| `onSubmit`           | Submits the news data to the server.  Validates the form, constructs a `FormData` object containing the form data and the selected file (if any), and sends it to the API.| Constructs a `FormData` object, adding both the file and the JSON representation of the form data.  Handles subcategories and keywords as comma-separated lists that are then split, trimmed and mapped into arrays.  Uses a subscription to handle the response and potential errors.|
| `changeImage`        | Clears the selected image and triggers the image input element to open the file dialog.                                                                                   | Clears the `previewUrl`, resets the value of the file input element (`#thumbnail`), and programmatically triggers a click event on the element.             |
| `ngOnDestroy`        | Cleans up the rich text editor instance on component destruction.                                                                                                             | Calls the `destroy()` method on the `ngx-editor` instance to release resources.                                                                                  |


## 4. Form Handling

The component uses Angular's ReactiveFormsModule to create a form group (`newsForm`).  Validators ensure that required fields are filled.  The form data is accessed using `this.newsForm.value`.  Subcategories and keywords are handled as comma-separated strings that are processed into arrays before submission to the API to improve database schema compliance.


## 5. Image Handling

Image selection and preview are managed using the `onFileSelected` method. A `FileReader` is used to generate a data URL from the selected file, which is then displayed as a preview.  The `changeImage` method provides a way to replace or remove the selected image.


## 6. Data Submission

The `onSubmit` method handles the submission of the news data. It creates a `FormData` object, including both the form data (converted to JSON) and the selected image file. The `NewsService`'s `createNews` method is called to send the data to the backend. The response from the API is handled via a subscription, with success leading to the emission of a news added event and closing the dialog, while errors are logged to the console.
