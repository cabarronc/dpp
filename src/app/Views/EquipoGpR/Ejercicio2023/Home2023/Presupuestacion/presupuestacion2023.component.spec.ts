import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Presupuestacion2023Component } from './presupuestacion2023.component';

describe('Presupuestacion2023Component', () => {
  let component: Presupuestacion2023Component;
  let fixture: ComponentFixture<Presupuestacion2023Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Presupuestacion2023Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Presupuestacion2023Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
