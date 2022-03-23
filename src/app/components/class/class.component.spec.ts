import { ComponentFixture, TestBed } from '@angular/core/testing';

import { classComponent } from './class.component';

describe('CoursComponent', () => {
  let component: classComponent;
  let fixture: ComponentFixture<classComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ classComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(classComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
