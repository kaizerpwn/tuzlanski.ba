export class Article {
  private id: number;
  private title: string;
  private thumbnail: string;
  private image_source: string;
  private images: string;
  private source_link: string;
  private category: string;
  private sub_categories: string;
  private short_description: string;
  private description: string;
  private keywords: string;
  private author: string;
  private language: string;
  private published_at: string;

  constructor(
    id: number,
    title: string,
    thumbnail: string,
    image_source: string,
    images: string,
    source_link: string,
    category: string,
    sub_categories: string,
    short_description: string,
    description: string,
    keywords: string,
    author: string,
    language: string,
    published_at: string
  ) {
    this.id = id;
    this.title = title;
    this.thumbnail = thumbnail;
    this.image_source = image_source;
    this.images = images;
    this.source_link = source_link;
    this.category = category;
    this.sub_categories = sub_categories;
    this.short_description = short_description;
    this.description = description;
    this.keywords = keywords;
    this.author = author;
    this.language = language;
    this.published_at = published_at;
  }

  getId(): number {
    return this.id;
  }

  setId(value: number): void {
    this.id = value;
  }

  getTitle(): string {
    return this.title;
  }

  setTitle(value: string): void {
    this.title = value;
  }

  getThumbnail(): string {
    return this.thumbnail;
  }

  setThumbnail(value: string): void {
    this.thumbnail = value;
  }

  getImageSource(): string {
    return this.image_source;
  }

  setImageSource(value: string): void {
    this.image_source = value;
  }

  getImages(): string {
    return this.images;
  }

  setImages(value: string): void {
    this.images = value;
  }

  getSourceLink(): string {
    return this.source_link;
  }

  setSourceLink(value: string): void {
    this.source_link = value;
  }

  getCategory(): string {
    return this.category;
  }

  setCategory(value: string): void {
    this.category = value;
  }

  getSubCategories(): string {
    return this.sub_categories;
  }

  setSubCategories(value: string): void {
    this.sub_categories = value;
  }

  getShortDescription(): string {
    return this.short_description;
  }

  setShortDescription(value: string): void {
    this.short_description = value;
  }

  getDescription(): string {
    return this.description;
  }

  setDescription(value: string): void {
    this.description = value;
  }

  getKeywords(): string {
    return this.keywords;
  }

  setKeywords(value: string): void {
    this.keywords = value;
  }

  getAuthor(): string {
    return this.author;
  }

  setAuthor(value: string): void {
    this.author = value;
  }

  getLanguage(): string {
    return this.language;
  }

  setLanguage(value: string): void {
    this.language = value;
  }

  getPublishedAt(): string {
    return this.published_at;
  }

  setPublishedAt(value: string): void {
    this.published_at = value;
  }
}
