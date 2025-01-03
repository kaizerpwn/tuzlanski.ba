export class Article {
  private id: number;
  private title: string;
  private image: string;
  private source_link: string;
  private categories: string[];
  private short_description: string;
  private description: string;
  private keywords: string[];
  private author: string;
  private language: string;

  constructor(data: Article) {
    this.id = data.id;
    this.title = data.title;
    this.image = data.image;
    this.source_link = data.source_link;
    this.categories = data.categories;
    this.short_description = data.short_description;
    this.description = data.description;
    this.keywords = data.keywords;
    this.author = data.author;
    this.language = data.language;
  }

  getId(): number {
    return this.id;
  }

  getTitle(): string {
    return this.title;
  }

  getImage(): string {
    return this.image;
  }

  getSourceLink(): string {
    return this.source_link;
  }

  getCategories(): string[] {
    return this.categories;
  }

  getShortDescription(): string {
    return this.short_description;
  }

  getDescription(): string {
    return this.description;
  }

  getKeywords(): string[] {
    return this.keywords;
  }

  getAuthor(): string {
    return this.author;
  }

  getLanguage(): string {
    return this.language;
  }
}
