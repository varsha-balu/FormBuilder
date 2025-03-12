import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.scss'],
})
export class LeftPanelComponent {

  @Input() fieldGroups: any[] = [];
  @Input() selectedGroup: any;
  @Output() selectGroup = new EventEmitter<any>();
  @Output() export = new EventEmitter<any>();

  @Output() openPopup = new EventEmitter<{ isEdit: boolean, group?: any }>();

  showCreateForm = false;
  showDeleteConfirm = false;
  newGroup = { id: 0, name: '', description: '' };
  deleteIndex: number | null = null;


  createFieldGroup() {
    if (this.newGroup.name.trim() && this.newGroup.description.trim()) {
      this.fieldGroups.push({ ...this.newGroup });
      let idString = this.fieldGroups.length;
      this.newGroup = { id: idString, name: '', description: '' };
      this.showCreateForm = false;
    }
  }

  
  exportToJson(){
      this.export.emit();
  }


  triggerCreate() {
    this.openPopup.emit({ isEdit: false });
  }


  confirmDelete(index: number) {
    this.deleteIndex = index;
    this.showDeleteConfirm = true;
  }

  copyFieldGroup(group: any) {
    const newGroup = { ...group, id: Math.max(...this.fieldGroups.map(g => g.id)) + 1, name: group.name + ' (Copy)' };
    this.fieldGroups.push(newGroup);
  }
  onDrop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.fieldGroups, event.previousIndex, event.currentIndex);
  }


  selectFieldGroup(group: any) {
    this.selectGroup.emit(group);
  }
}
