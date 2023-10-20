import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PinsListPageComponent } from './pins-list-page.component';

describe('PinsListPageComponent', () => {
  let component: PinsListPageComponent;
  let fixture: ComponentFixture<PinsListPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PinsListPageComponent]
    });
    fixture = TestBed.createComponent(PinsListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
