import { ComponentFixture, TestBed } from '@angular/core/testing';

import { P5Precession } from './p5-precession';

describe('P5Precession', () => {
  let component: P5Precession;
  let fixture: ComponentFixture<P5Precession>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [P5Precession]
    })
    .compileComponents();

    fixture = TestBed.createComponent(P5Precession);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
