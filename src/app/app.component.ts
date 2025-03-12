import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  selectedGroup: any = null;
  showPopup = false;
  isEdit = false;
  fieldGroups = [
    { id: 1, name: 'AMC Reports', description: 'Annual maintenance contract reports',fields:[] },
    { id: 2, name: 'HVAC Repair', description: 'Heating, Ventilation, and Air Conditioning repairs', fields: [] },
    { id: 3, name: 'AMC Yearly', description: 'Yearly maintenance schedule', fields: [] },
    { id: 4, name: 'AMC Installations - Tier 3', description: 'Installations for Tier 3 customers', fields: [] }
  ];
  popupData = { id:0,name: '', description: '',fields:[] };


  ngOnInit(){
    this.selectedGroup=this.fieldGroups[0];
    this.loadFieldGroupsFromLocalStorage();

  }

  onGroupSelected(group: any) {
    this.selectedGroup = group;
  }

  onEdit(group: any) {
    this.isEdit = true;
    this.popupData = { ...group };
    this.showPopup = true;
    this.saveFieldGroupsToLocalStorage();

  }

  openCreatePopup() {
    this.isEdit = false;
    this.popupData = { id:this.fieldGroups.length+1,name: '', description: '',fields:[] };
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
  }

  savePopup() {
    if (this.isEdit) {
      this.selectedGroup.name = this.popupData.name;
      this.selectedGroup.description = this.popupData.description;
    } else {
      this.selectedGroup = { ...this.popupData };
      this.fieldGroups.push(this.selectedGroup);
    }
    this.saveFieldGroupsToLocalStorage();
    this.closePopup();
  }

  onDelete(id: any) {
   const index = this.fieldGroups.findIndex(group => group.id === id);
    this.fieldGroups = this.fieldGroups.filter(group => group.id !== id);
    
    if (this.selectedGroup && this.selectedGroup.id === id) {
      if (index > 0) {
        this.selectedGroup = this.fieldGroups[index - 1]; // select previous
      } else if (index === 0 && this.fieldGroups.length > 0) {
        this.selectedGroup = this.fieldGroups[0]; // select next if first item deleted
      } else {
        this.selectedGroup = null; // no items left
      }
    }
    this.saveFieldGroupsToLocalStorage();

  }

  exportToJson(): void {
    const formData = this.fieldGroups; // Get the current form data
    const jsonString = JSON.stringify(formData, null, 2); // Pretty print JSON

    // Create a blob and download link
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'form-builder-data.json'; // File name
    a.click();

    URL.revokeObjectURL(url); // Clean up
  }

  onCopy(group: any) {
    const newGroup = { ...group, id: Math.max(...this.fieldGroups.map(g => g.id)) + 1, name: group.name + ' (Copy)' };
    this.fieldGroups.push(newGroup);
    this.saveFieldGroupsToLocalStorage();

  }

  saveFieldGroupsToLocalStorage() {
    localStorage.setItem('fieldGroups', JSON.stringify(this.fieldGroups));
  }

  loadFieldGroupsFromLocalStorage() {
    const savedFieldGroups = localStorage.getItem('fieldGroups');
    this.fieldGroups = savedFieldGroups ? JSON.parse(savedFieldGroups) : this.fieldGroups;
  }
}
