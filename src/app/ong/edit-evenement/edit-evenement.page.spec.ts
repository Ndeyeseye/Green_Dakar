import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditEvenementPage } from './edit-evenement.page';

describe('EditEvenementPage', () => {
  let component: EditEvenementPage;
  let fixture: ComponentFixture<EditEvenementPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEvenementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
