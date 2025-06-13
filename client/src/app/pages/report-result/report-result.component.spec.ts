import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportResultComponent } from './report-result.component';

describe('ReportResultComponent', () => {
  let component: ReportResultComponent;
  let fixture: ComponentFixture<ReportResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportResultComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
