import {Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Poi} from "../../models/poi.model";

@Component({
  selector: 'app-pins-list-form',
  templateUrl: './pins-edit-dialog.component.html',
  styleUrls: ['./pins-edit-dialog.component.css']
})
export class PinsEditDialogComponent {
  editForm: FormGroup;

  constructor(
      private dialogRef: MatDialogRef<PinsEditDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: { poi: Poi },
      private fb: FormBuilder
  ) {
    this.editForm = this.fb.group({
      name: data.poi.name,
      description: data.poi.description,
    });
  }

  onSaveClick() {
    const updatedPoi = {
      id: this.data.poi.id,
      lat: this.data.poi.lat,
      lng: this.data.poi.lng,
      name: this.editForm.value.name,
      description: this.editForm.value.description,
    };
    this.dialogRef.close(updatedPoi);
  }

  onCancelClick() {
    this.dialogRef.close();
  }

}