import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnosDiasVetComponent } from './turnos-dias-vet.component';

describe('TurnosDiasVetComponent', () => {
  let component: TurnosDiasVetComponent;
  let fixture: ComponentFixture<TurnosDiasVetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TurnosDiasVetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TurnosDiasVetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
