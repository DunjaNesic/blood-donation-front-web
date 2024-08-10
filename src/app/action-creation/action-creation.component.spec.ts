import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionCreationComponent } from './action-creation.component';

describe('ActionCreationComponent', () => {
  let component: ActionCreationComponent;
  let fixture: ComponentFixture<ActionCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActionCreationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
