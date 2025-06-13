import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvalCriteriaComponent } from './eval-criteria.component';

describe('EvalCriteriaComponent', () => {
  let component: EvalCriteriaComponent;
  let fixture: ComponentFixture<EvalCriteriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvalCriteriaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvalCriteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
