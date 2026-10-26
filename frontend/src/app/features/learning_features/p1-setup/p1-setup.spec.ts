import { ComponentFixture, TestBed } from '@angular/core/testing';

import { P1Setup } from './p1-setup';

describe('P1Setup', () => {
  let component: P1Setup;
  let fixture: ComponentFixture<P1Setup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [P1Setup]
    })
    .compileComponents();

    fixture = TestBed.createComponent(P1Setup);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
