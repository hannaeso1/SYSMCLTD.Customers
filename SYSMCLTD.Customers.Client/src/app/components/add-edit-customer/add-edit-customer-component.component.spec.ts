import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCustomerComponentComponent } from './add-edit-customer-component.component';

describe('AddEditCustomerComponentComponent', () => {
  let component: AddEditCustomerComponentComponent;
  let fixture: ComponentFixture<AddEditCustomerComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditCustomerComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditCustomerComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
