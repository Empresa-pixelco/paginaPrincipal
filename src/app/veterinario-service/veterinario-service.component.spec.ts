import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeterinarioServiceComponent } from './veterinario-service.component';

describe('VeterinarioServiceComponent', () => {
  let component: VeterinarioServiceComponent;
  let fixture: ComponentFixture<VeterinarioServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VeterinarioServiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VeterinarioServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
