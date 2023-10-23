import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeafletMapPageComponent } from './leaflet-map-page.component';

describe('LeafletMapPageComponent', () => {
  let component: LeafletMapPageComponent;
  let fixture: ComponentFixture<LeafletMapPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeafletMapPageComponent]
    });
    fixture = TestBed.createComponent(LeafletMapPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
