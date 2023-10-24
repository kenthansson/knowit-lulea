import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
	selector: 'poi-popup',
	templateUrl: './popup.component.html'
})
export class AddPoiPopup {
    input1: string = '';
    input2: string = '';
  
    constructor(
      public dialogRef: MatDialogRef<AddPoiPopup>,
      @Inject(MAT_DIALOG_DATA) public data: any
    ) {}
  
    onCancelClick(): void {
      this.dialogRef.close();
    }
  
    onSaveClick(): void {
      const result = {
        input1: this.input1,
        input2: this.input2
      };
      this.dialogRef.close(result);
    }
  }