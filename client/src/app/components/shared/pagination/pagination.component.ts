import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
  imports: [NgIf, NgFor],
})
export class PaginationComponent {
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 1;
  @Output() pageChange = new EventEmitter<number>();

  private surroundingPageCount = 2;

  get displayedPages(): number[] {
    const range: number[] = [];

    for (
      let i = Math.max(2, this.currentPage - 1);
      i <= Math.min(this.totalPages - 1, this.currentPage + 1);
      i++
    ) {
      range.push(i);
    }

    return range;
  }

  get shouldShowStartEllipsis(): boolean {
    return this.currentPage > this.surroundingPageCount + 2;
  }

  get shouldShowEndEllipsis(): boolean {
    return this.currentPage < this.totalPages - this.surroundingPageCount - 1;
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.pageChange.emit(page);
    }
  }
}
