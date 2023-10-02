import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgRefComponent } from './ng-ref.component';

describe('NgRefComponent', () => {
  let component: NgRefComponent;
  let fixture: ComponentFixture<NgRefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgRefComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgRefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
