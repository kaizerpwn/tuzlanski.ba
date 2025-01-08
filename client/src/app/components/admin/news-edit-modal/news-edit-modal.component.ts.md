# News Edit Modal Component Documentation

## Table of Contents

* [1. Overview](#1-overview)
* [2. Component Structure](#2-component-structure)
* [3. Form Handling](#3-form-handling)
* [4. File Upload and Preview](#4-file-upload-and-preview)
* [5. Data Submission](#5-data-submission)
* [6. Image Change Handling](#6-image-change-handling)
* [7. Component Destruction](#7-component-destruction)


## 1. Overview

The `NewsEditModalComponent` is an Angular component responsible for providing a modal dialog for editing existing news articles.  It utilizes reactive forms for data handling, a rich text editor (`ngx-editor`), and handles file uploads for updating thumbnails.  The component interacts with the `NewsService` for updating news data and the `EventService` to broadcast successful updates.


## 2. Component Structure

The component is declared as a standalone component, importing necessary Angular modules (ReactiveFormsModule, MatDialogModule, CommonModule) and the NgxEditorModule for the rich text editor.  It uses the `CUSTOM_ELEMENTS_SCHEMA` to avoid errors with custom elements that might be used within the rich text editor.

| Property          | Type                                  | Description                                                                     |
|----------------------|---------------------------------------|---------------------------------------------------------------------------------|
| `newsForm`          | `FormGroup`                           | Reactive form group managing news data.                                          |
| `editor`            | `Editor`                              | Instance of the NgxEditor component for rich text editing.                     |
| `categories`        | `any[]`                               | Array of news categories (from `CATEGORIES` constant).                          |
| `selectedFile`      | `File | null`                         | Stores the selected thumbnail file.                                             |
| `previewUrl`        | `string | ArrayBuffer | null`       | Stores the URL or ArrayBuffer of the preview thumbnail image.                 |
| `toolbar`           | `Toolbar`                             | Configuration for the NgxEditor toolbar.                                        |


## 3. Form Handling

The component uses a reactive form (`newsForm`) built with `FormBuilder`.  The form's initial values are populated from the `data` injected via `MAT_DIALOG_DATA`.  Note that `subcategories` and `keywords` are parsed from JSON strings and formatted as comma-separated strings for display in the form.  On submission, these are re-parsed into arrays.

Validators are used to ensure required fields are filled:

* `id`: Required.
* `title`: Required.
* `category`: Required.
* `short_description`: Required.
* `description`: Required.
* `author`: Required.

## 4. File Upload and Preview

The `onFileSelected` method handles file selection. It uses a `FileReader` to generate a data URL from the selected file, which is then assigned to `previewUrl` to display a preview of the selected image.

## 5. Data Submission

The `onSubmit` method handles form submission.  It creates a `FormData` object to send the data to the backend.  The `FormData` includes:

* `thumbnail`: The selected file (if any).
* `data`: A JSON string containing the form values.  Crucially, the `subcategories` and `keywords` are converted back into arrays from comma-separated strings before being included in the JSON.


The `newsService.updateNews` method is used to send the `FormData` to the server.  The `EventService` is notified of a successful update using `eventService.emitNewsAdded()`.

The algorithm for transforming comma-separated strings back into arrays is straightforward:
1. The string is split into an array of substrings using the comma (`,`) as a delimiter.
2. `map` function iterates through the substrings, trimming whitespace from each substring.
3. The result is an array of trimmed strings.



## 6. Image Change Handling

The `changeImage` method clears the existing preview and resets the file input element to allow the user to select a new image.  It achieves this by setting `previewUrl` to `null` and programmatically clearing and triggering a click on the hidden file input element.

## 7. Component Destruction

The `ngOnDestroy` lifecycle hook is used to properly destroy the NgxEditor instance, preventing memory leaks.  This is important for cleaning up resources when the component is destroyed.
