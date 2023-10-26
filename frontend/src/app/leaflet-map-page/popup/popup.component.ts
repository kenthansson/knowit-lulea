import { Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
	selector: 'poi-popup',
	templateUrl: './popup.component.html',
    styleUrls: ['./popup.component.css']
})
export class AddPoiPopup {
    name: string = '';
    description: string = '';
  
    constructor(
      public dialogRef: MatDialogRef<AddPoiPopup>,
      @Inject(MAT_DIALOG_DATA) public data: any
    ) {}
  
    onCancelClick(): void {
      this.dialogRef.close();
    }
  
    onSaveClick(): void {
      const result = {
        name: this.name,
        description: this.description
      };
      this.dialogRef.close(result);
    }
  }