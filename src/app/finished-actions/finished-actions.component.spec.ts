import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishedActionsComponent } from './finished-actions.component';

describe('FinishedActionsComponent', () => {
  let component: FinishedActionsComponent;
  let fixture: ComponentFixture<FinishedActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinishedActionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinishedActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
