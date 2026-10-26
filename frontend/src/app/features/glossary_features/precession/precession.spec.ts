import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Precession } from './precession';

describe('Precession', () => {
  let component: Precession;
  let fixture: ComponentFixture<Precession>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Precession]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Precession);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
