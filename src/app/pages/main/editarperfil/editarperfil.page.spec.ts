import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarPerfilPage } from './editarperfil.page';

describe('EditarperfilPage', () => {
  let component: EditarPerfilPage;
  let fixture: ComponentFixture<EditarPerfilPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarPerfilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
