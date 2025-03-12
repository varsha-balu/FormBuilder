import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { FormBuilderService } from 'src/app/form-builder.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-middle-panel',
  templateUrl: './middle-panel.component.html',
  styleUrls: ['./middle-panel.component.scss']
})
export class MiddlePanelComponent {
   formFields: any[] = [];
   newField:any;
     form!: FormGroup;
     selectedFieldIndex: number | null = null;

    @Input() selectedGroup: any;
     @Output() editGroup = new EventEmitter<void>();
  @Output() copyGroup = new EventEmitter<void>();
  @Output() deleteGroup = new EventEmitter<void>();
    @Output() openPopup = new EventEmitter<{ isEdit: boolean, group?: any }>();
   isOpenField=false;

  constructor(private formBuilderService: FormBuilderService,private fb: FormBuilder) {}

  ngOnInit() {
    this.formBuilderService.draggedElement$.subscribe((element) => {
      this.formFields.push(element);
    });
     this.form = this.fb.group({
    formFields: this.fb.array([])
  });
  }

  ngOnChanges() {
    this.loadFieldsForSelectedGroup();
  }
onDrop(event: CdkDragDrop<any[]>) {
  if(!this.selectedGroup) return; // Ensure a group is selected

  const selectedGroupFields = this.selectedGroup.fields || [];
  if (event.previousContainer === event.container) {
    // Rearranging items in the same container
    moveItemInArray(selectedGroupFields, event.previousIndex, event.currentIndex);
    const control = this.fields.at(event.previousIndex);
    this.fields.removeAt(event.previousIndex);
    this.fields.insert(event.currentIndex, control);
  } else {
    // Adding a new field when dropped from the right panel
    const draggedElement = event.item.data;
    const newField = {
      ...draggedElement,
      id: Date.now(),
    };

    // Add to UI array
    selectedGroupFields.splice(event.currentIndex, 0, newField);
    this.selectedGroup.fields = selectedGroupFields;

    // Add corresponding control to FormArray
    const newControl = this.fb.group({
      label: [newField.label || ''],
      placeholder: [newField.placeholder || ''],
      description: [newField.description || ''],
      value: [newField.value || ''],
      type: [newField.type || 'text'],
      validations: this.fb.group({
        required: [newField.validations?.required || false],
        minLength: [newField.validations?.minLength || ''],
        maxLength: [newField.validations?.maxLength || ''],
      }),
      options: [newField.options || []],
    });

    this.fields.insert(event.currentIndex, newControl);
  }
  this.updateFormFields(); // Ensure UI sync

}

get fields(): FormArray {
    return this.form.get('formFields') as FormArray;
  }

  triggerEdit(group: any) {
    this.openPopup.emit({ isEdit: true, group });
  }


  updateFormFields() {
    this.formFields = this.selectedGroup?.fields || [];
  }

  

    addField(field: any) {
  const control = this.fb.group({
    label: [field.label || 'New Field'],
    type: [field.type || 'text'],
    description: [field.description || ''],
    placeholder: [field.placeholder || ''],
    value: [field.value || ''],
    validations: this.fb.group({
      required: [field.validations?.required || false],
      minLength: [field.validations?.minLength || null],
      maxLength: [field.validations?.maxLength || null],
    }),
    options: [field.options || []],
  });

  this.fields.push(control);
  this.formFields.push(field); // Keep both in sync
  this.setValidators(field);
}

  editField(index: number) {
  const field = this.fields.at(index).value;
  this.selectedFieldIndex = index;
  this.newField = { ...field };
  this.isOpenField = true;
}

  loadFieldsForSelectedGroup() {
    this.formFields = this.selectedGroup?.fields || [];
    this.form = this.fb.group({
      formFields: this.fb.array(this.formFields.map((field: any) => this.createFormField(field)))
    });
  }

  createFormField(field: any): FormGroup {
    return this.fb.group({
      label: [field.label || ''],
      description :[field.description || ''],
      placeholder: [field.placeholder || ''],
      value: [field.value || ''],
      type: [field.type || 'text'],
      validations: this.fb.group({
        required: [field.validations?.required || false],
        minLength: [field.validations?.minLength || null],
        maxLength: [field.validations?.maxLength || null],
      }),
      options: [field.options || []],
    });
  }


  removeField(index: number) {
    if (!this.selectedGroup) return;

    this.fields.removeAt(index);
    this.formFields.splice(index, 1);
    this.selectedGroup.fields.splice(index, 1); // Remove from group's fields

  }

 copyField(index: number) {
  // Get the field to copy from the FormArray
  const fieldToCopy = this.fields.at(index) as FormGroup;
  
  // Create a deep copy of the field value
  const fieldValue = { ...fieldToCopy.value };
  fieldValue.id = Date.now(); // Assign a new ID
  
  this.addField(fieldValue); // Add the field to the UI array
}

saveChanges(updatedField: any): void {
  if (this.selectedFieldIndex !== null) {
    const fieldGroup = this.fields.at(this.selectedFieldIndex) as FormGroup;

    // Update form group with new values
    fieldGroup.patchValue({
      label: updatedField.label,
      placeholder: updatedField.placeholder,
      description: updatedField.description,
      value: updatedField.value,
      type: updatedField.type,
      validations: {
        required: updatedField.validations?.required || false,
        minLength: updatedField.validations?.minLength || null,
        maxLength: updatedField.validations?.maxLength || null,
      },
      options: updatedField.options || [],
    });

    // Apply updated validations
    this.setValidators(fieldGroup);

    // Also update the UI array (for display purposes)
    this.formFields[this.selectedFieldIndex] = { ...updatedField };
  }

  this.isOpenField = false; // Close the popup
  this.selectedFieldIndex = null; // Reset selected index
}


closePopup() {
  this.isOpenField = false;
}

setValidators(fieldGroup: FormGroup): void {
    const validations = fieldGroup.get('validations') as FormGroup;
    const valueControl = fieldGroup.get('value');
    
    if (!valueControl || !validations) return;
    
    const validators = [];
    
    if (validations.get('required')?.value === true) {
      validators.push(Validators.required);
    }
    
    const minLength = validations.get('minLength')?.value;
    if (minLength && !isNaN(minLength) && minLength > 0) {
      validators.push(Validators.minLength(minLength));
    }
    
    const maxLength = validations.get('maxLength')?.value;
    if (maxLength && !isNaN(maxLength) && maxLength > 0) {
      validators.push(Validators.maxLength(maxLength));
    }
    
    valueControl.setValidators(validators);
    valueControl.updateValueAndValidity();
}
}
