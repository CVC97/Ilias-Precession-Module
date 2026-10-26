import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cones } from './cones';

describe('Cones', () => {
  let component: Cones;
  let fixture: ComponentFixture<Cones>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cones]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cones);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
