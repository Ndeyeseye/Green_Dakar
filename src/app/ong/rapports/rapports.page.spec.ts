import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RapportsPage } from './rapports.page';

describe('RapportsPage', () => {
  let component: RapportsPage;
  let fixture: ComponentFixture<RapportsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RapportsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
