# News Table Component Documentation

## Table of Contents

* [1. Overview](#1-overview)
* [2. Component Properties](#2-component-properties)
* [3. Constructor](#3-constructor)
* [4. `ngOnInit()` Method](#4-ngoninit-method)
* [5. `ngOnDestroy()` Method](#5-ngondestroy-method)
* [6. `fetchNews()` Method](#6-fetchnews-method)
* [7. `onPageChange()` Method](#7-onchange-method)
* [8. `openEditNewsModal()` Method](#8-openeditnewsmodal-method)
* [9. `deleteNews()` Method](#9-deletenews-method)


## 1. Overview

The `NewsTableComponent` displays a paginated table of news articles.  It fetches data from the `NewsService`, handles pagination, allows editing articles via a modal, and provides a mechanism to delete articles. The component utilizes Angular's `Component`, `OnInit`, and `OnDestroy` lifecycle hooks, RxJS `Subscription` for event handling, and Angular Material's `MatDialog` for modal interactions.


## 2. Component Properties

| Property Name          | Type             | Description                                                                     |
|-----------------------|-------------------|---------------------------------------------------------------------------------|
| `news`                 | `Article[]`       | Array of `Article` objects representing the news articles displayed on the current page. |
| `currentPage`          | `number`          | The currently displayed page number.                                             |
| `totalPages`           | `number`          | The total number of pages available.                                            |
| `newsAddedSubscription` | `Subscription`    | Subscription to the `newsAdded$` event from `EventService`.                    |


## 3. Constructor

The constructor initializes the component by injecting the necessary services:

* `newsService`: Used to fetch and manipulate news articles.
* `eventService`: Used to subscribe to news addition events.
* `sanitizer`:  Used for sanitizing HTML (although not directly used in this provided code snippet).
* `dialog`: Used to open the news edit modal.


## 4. `ngOnInit()` Method

The `ngOnInit()` method is called after the component is initialized. It performs the following actions:

1. Calls `fetchNews()` to retrieve the initial set of news articles.
2. Subscribes to the `newsAdded$` observable from `eventService`.  Whenever a new article is added (signaled by the observable emitting a value), `fetchNews()` is called again to refresh the displayed data.  This ensures the table always reflects the latest data.


## 5. `ngOnDestroy()` Method

The `ngOnDestroy()` method is called just before Angular destroys the component. It unsubscribes from the `newsAddedSubscription` to prevent memory leaks and potential errors.  This is crucial for components that manage subscriptions to prevent resource exhaustion.


## 6. `fetchNews()` Method

The `fetchNews()` method retrieves news articles from the `NewsService`.  It accepts an optional `page` parameter (defaulting to 1) to handle pagination.

The method's logic is as follows:

1. Calls `newsService.getNews(undefined, 10, page)` to fetch a page of news articles.  The `undefined` likely represents a filter parameter (not used here), `10` indicates the number of items per page, and `page` specifies the desired page number.

2. The response is mapped to an array of `Article` objects.  The mapping converts the raw data from the service into strongly typed `Article` instances.  Each `Article` object is initialized with data from the response (e.g., `item.id`, `item.title`, etc.).

3. Updates `currentPage` and `totalPages` with the values returned by the service.  This is important for displaying pagination controls accurately.


## 7. `onPageChange()` Method

The `onPageChange()` method is called when the user changes the page number via pagination controls.  It simply calls `fetchNews()` with the new page number, triggering a data refresh for the new page.


## 8. `openEditNewsModal()` Method

The `openEditNewsModal()` method opens a modal dialog (`NewsEditModalComponent`) to allow the user to edit a selected news article (`news`).  The selected article's data is passed to the modal via the `data` property.


## 9. `deleteNews()` Method

The `deleteNews()` method handles the deletion of a news article.

1. Calls `newsService.deleteNews(id)` to delete the article on the server.

2. Filters the `news` array locally to remove the deleted article.  This provides immediate visual feedback to the user.

3. Refreshes the current page's data with `fetchNews(this.currentPage)` to ensure consistency between the UI and server-side data.
