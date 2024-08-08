import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IncidentePage } from './incidente.page';

describe('IncidentePage', () => {
  let component: IncidentePage;
  let fixture: ComponentFixture<IncidentePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidentePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
