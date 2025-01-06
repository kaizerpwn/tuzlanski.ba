import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private newsAddedSource = new Subject<void>();
  newsAdded$ = this.newsAddedSource.asObservable();

  emitNewsAdded() {
    this.newsAddedSource.next();
  }
}
