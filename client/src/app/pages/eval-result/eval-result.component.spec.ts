import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvalResultComponent } from './eval-result.component';

describe('EvalResultComponent', () => {
  let component: EvalResultComponent;
  let fixture: ComponentFixture<EvalResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvalResultComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvalResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
