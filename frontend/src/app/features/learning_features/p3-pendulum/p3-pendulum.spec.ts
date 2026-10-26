import { ComponentFixture, TestBed } from '@angular/core/testing';

import { P3Pendulum } from './p3-pendulum';

describe('P3Pendulum', () => {
  let component: P3Pendulum;
  let fixture: ComponentFixture<P3Pendulum>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [P3Pendulum]
    })
    .compileComponents();

    fixture = TestBed.createComponent(P3Pendulum);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
