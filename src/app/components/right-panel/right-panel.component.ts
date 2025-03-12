import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilderService } from 'src/app/form-builder.service';

@Component({
  selector: 'app-right-panel',
  templateUrl: './right-panel.component.html',
  styleUrls: ['./right-panel.component.scss']
})
export class RightPanelComponent {
  formElements = [
    { id: 1, label: 'Single Line Text', type: 'text', value: null, description: 'Single text area', icon: 'fas fa-font', placeholder: 'Enter text here', validations: null },
    { id: 2, label: 'Multi Line Text', type: 'textarea', value: null, description: 'Multi text area', icon: 'fas fa-align-left', placeholder: 'Enter text here', validations: null },
    { id: 3, label: 'Integer', type: 'number', value: null, description: 'Integer type area', icon: 'fas fa-list-ol', placeholder: 'Enter text here', validations: null },
    { id: 4, label: 'Date', type: 'date', value: null, description: 'Select date from datepicker', icon: 'fas fa-calendar', placeholder: 'Enter text here', validations: null },
    { id: 5, label: 'Time', type: 'time', value: null, description: 'Select time from timepicker', icon: 'fas fa-clock', placeholder: 'Enter text here', validations: null },
    { id: 6, label: 'Date & Time', value: null, type: 'datetime-local', description: 'Select date & time', icon: 'fas fa-calendar-alt', placeholder: 'Enter text here', validations: null },
    { id: 7, label: 'Single Selection', value: null, type: 'radio', description: 'Select single option', icon: 'fas fa-circle-dot', placeholder: 'Enter text here', validations: null, options: ['Option 1', 'Option 2', 'Option 3'] },
    { id: 8, label: 'Multi Selection', value: null, type: 'checkbox', description: 'Select multiple options', icon: 'fas fa-square-check', placeholder: 'Enter text here', validations: null, options: ['Option 1', 'Option 2', 'Option 3'] },
    { id: 9, label: 'Dropdown', value: null, type: 'select', description: 'Select from dropdown', icon: 'fas fa-check-square', placeholder: 'Enter text here', validations: null, options: ['Option 1', 'Option 2', 'Option 3'] },
    { id: 10, label: 'Upload', value: null, type: 'file', description: 'Upload media files', icon: 'fas fa-bars', placeholder: 'Enter text here', validations: null }
  ];

  @Output() elementDropped = new EventEmitter<any>();


  constructor(private formBuilderService: FormBuilderService) { }

  dragStart(element: any) {
    this.formBuilderService.setDraggedElement(element);
  }
}
