import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AjoutEvenementPage } from './ajout-evenement.page';

describe('AjoutEvenementPage', () => {
  let component: AjoutEvenementPage;
  let fixture: ComponentFixture<AjoutEvenementPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutEvenementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
