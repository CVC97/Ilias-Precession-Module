import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FigureAxis } from './figure-axis';

describe('FigureAxis', () => {
  let component: FigureAxis;
  let fixture: ComponentFixture<FigureAxis>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FigureAxis]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FigureAxis);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
