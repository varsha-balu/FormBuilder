import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FormBuilderService {
private draggedElement = new Subject<any>();
  draggedElement$ = this.draggedElement.asObservable();

  setDraggedElement(element: any) {
    this.draggedElement.next(element);
  }
}
