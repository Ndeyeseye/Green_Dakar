import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterOngPage } from './register-ong.page';

describe('RegisterOngPage', () => {
  let component: RegisterOngPage;
  let fixture: ComponentFixture<RegisterOngPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterOngPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
