import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvalForm2Component } from './eval-form2.component';

describe('EvalForm2Component', () => {
  let component: EvalForm2Component;
  let fixture: ComponentFixture<EvalForm2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvalForm2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvalForm2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
