import { ComponentFixture, TestBed } from '@angular/core/testing';

import { P2Rotation } from './p2-rotation';

describe('P2Rotation', () => {
  let component: P2Rotation;
  let fixture: ComponentFixture<P2Rotation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [P2Rotation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(P2Rotation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
