import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockersDashboardComponent } from './blockers-dashboard.component';

describe('BlockersDashboardComponent', () => {
  let component: BlockersDashboardComponent;
  let fixture: ComponentFixture<BlockersDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockersDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockersDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
