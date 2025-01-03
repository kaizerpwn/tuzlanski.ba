export class Article {
  private id: number;
  private title: string | null;
  private thumbnail: string | null;
  private image_source: string | null;
  private images: string | null;
  private source_link: string | null;
  private category: string | null;
  private sub_categories: string | null;
  private short_description: string | null;
  private description: string | null;
  private keywords: string | null;
  private author: string | null;
  private language: string | null;

  constructor(
    id: number,
    title: string | null = null,
    thumbnail: string | null = null,
    image_source: string | null = null,
    images: string | null = null,
    source_link: string | null = null,
    category: string | null = null,
    sub_categories: string | null = null,
    short_description: string | null = null,
    description: string | null = null,
    keywords: string | null = null,
    author: string | null = null,
    language: string | null = null
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
  }

  getId(): number {
    return this.id;
  }

  setId(value: number): void {
    this.id = value;
  }

  getTitle(): string | null {
    return this.title;
  }

  setTitle(value: string | null): void {
    this.title = value;
  }

  getThumbnail(): string | null {
    return this.thumbnail;
  }

  setThumbnail(value: string | null): void {
    this.thumbnail = value;
  }

  getImageSource(): string | null {
    return this.image_source;
  }

  setImageSource(value: string | null): void {
    this.image_source = value;
  }

  getImages(): string | null {
    return this.images;
  }

  setImages(value: string | null): void {
    this.images = value;
  }

  getSourceLink(): string | null {
    return this.source_link;
  }

  setSourceLink(value: string | null): void {
    this.source_link = value;
  }

  getCategory(): string | null {
    return this.category;
  }

  setCategory(value: string | null): void {
    this.category = value;
  }

  getSubCategories(): string | null {
    return this.sub_categories;
  }

  setSubCategories(value: string | null): void {
    this.sub_categories = value;
  }

  getShortDescription(): string | null {
    return this.short_description;
  }

  setShortDescription(value: string | null): void {
    this.short_description = value;
  }

  getDescription(): string | null {
    return this.description;
  }

  setDescription(value: string | null): void {
    this.description = value;
  }

  getKeywords(): string | null {
    return this.keywords;
  }

  setKeywords(value: string | null): void {
    this.keywords = value;
  }

  getAuthor(): string | null {
    return this.author;
  }

  setAuthor(value: string | null): void {
    this.author = value;
  }

  getLanguage(): string | null {
    return this.language;
  }

  setLanguage(value: string | null): void {
    this.language = value;
  }
}
