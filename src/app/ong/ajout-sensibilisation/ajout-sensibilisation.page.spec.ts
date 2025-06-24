import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AjoutSensibilisationPage } from './ajout-sensibilisation.page';

describe('AjoutSensibilisationPage', () => {
  let component: AjoutSensibilisationPage;
  let fixture: ComponentFixture<AjoutSensibilisationPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutSensibilisationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
