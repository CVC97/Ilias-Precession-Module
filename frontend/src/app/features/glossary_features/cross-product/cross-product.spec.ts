import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrossProduct } from './cross-product';

describe('CrossProduct', () => {
  let component: CrossProduct;
  let fixture: ComponentFixture<CrossProduct>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrossProduct]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrossProduct);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
