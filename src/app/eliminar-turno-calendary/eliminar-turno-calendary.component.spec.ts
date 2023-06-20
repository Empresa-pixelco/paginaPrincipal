import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarTurnoCalendaryComponent } from './eliminar-turno-calendary.component';

describe('EliminarTurnoCalendaryComponent', () => {
  let component: EliminarTurnoCalendaryComponent;
  let fixture: ComponentFixture<EliminarTurnoCalendaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EliminarTurnoCalendaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EliminarTurnoCalendaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
