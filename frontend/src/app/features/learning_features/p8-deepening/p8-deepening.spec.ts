import { ComponentFixture, TestBed } from '@angular/core/testing';

import { P8Deepening } from './p8-deepening';

describe('P8Deepening', () => {
  let component: P8Deepening;
  let fixture: ComponentFixture<P8Deepening>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [P8Deepening]
    })
    .compileComponents();

    fixture = TestBed.createComponent(P8Deepening);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
