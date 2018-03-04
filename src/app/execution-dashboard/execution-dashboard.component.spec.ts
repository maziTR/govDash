import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutionDashboardComponent } from './execution-dashboard.component';

describe('ExecutionDashboardComponent', () => {
  let component: ExecutionDashboardComponent;
  let fixture: ComponentFixture<ExecutionDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExecutionDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExecutionDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
