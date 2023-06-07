import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistervetComponent } from './registervet.component';

describe('RegistervetComponent', () => {
  let component: RegistervetComponent;
  let fixture: ComponentFixture<RegistervetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistervetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistervetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
