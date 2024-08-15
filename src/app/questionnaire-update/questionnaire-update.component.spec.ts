import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionnaireUpdateComponent } from './questionnaire-update.component';

describe('QuestionnaireUpdateComponent', () => {
  let component: QuestionnaireUpdateComponent;
  let fixture: ComponentFixture<QuestionnaireUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionnaireUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionnaireUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
