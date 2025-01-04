import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { formatTimeAgo } from '../../utils/helpers';

@Component({
  selector: 'app-small-news-card',
  standalone: true,
  imports: [],
  templateUrl: './small-news-card.component.html',
  styleUrls: ['./small-news-card.component.css'],
})
export class SmallNewsCardComponent implements OnChanges {
  @Input() title!: string;
  @Input() categoryName!: string;
  @Input() publishedAt!: string;
  @Input() thumbnail!: string;
  @Input() imageSource!: string;
  @Input() color!: string;

  safeImageUrl!: SafeUrl;
  formattedTime!: string;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['thumbnail'] && this.thumbnail) {
      this.safeImageUrl = this.sanitizer.bypassSecurityTrustUrl(this.thumbnail);
    }

    if (changes['publishedAt'] && this.publishedAt) {
      this.formattedTime = formatTimeAgo(this.publishedAt);
    }
  }
}
