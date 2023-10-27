import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PinsEditDialogComponent } from './pins-edit-dialog.component';

describe('PinsListFormComponent', () => {
  let component: PinsEditDialogComponent;
  let fixture: ComponentFixture<PinsEditDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PinsEditDialogComponent]
    });
    fixture = TestBed.createComponent(PinsEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
