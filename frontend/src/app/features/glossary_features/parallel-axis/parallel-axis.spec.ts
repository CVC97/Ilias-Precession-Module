import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParallelAxis } from './parallel-axis';

describe('ParallelAxis', () => {
  let component: ParallelAxis;
  let fixture: ComponentFixture<ParallelAxis>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParallelAxis]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParallelAxis);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
