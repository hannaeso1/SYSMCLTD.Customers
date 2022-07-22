import { Component,Input, OnInit } from '@angular/core';
import {FormBuilder,FormGroup, Validators } from '@angular/forms';
import {Customer} from '../../models/customer';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CustomersService } from '../../services/customers.service';

@Component({
  selector: 'app-add-edit-customer-component',
  templateUrl: './add-edit-customer-component.component.html',
  styleUrls: ['./add-edit-customer-component.component.css']
})
export class AddEditCustomerComponentComponent implements OnInit {

  // @ts-ignore
  customerForm: FormGroup;
  @Input() customerId: string | undefined;
  isAddMode: boolean = true;

  constructor( private formBuilder: FormBuilder, private router: Router, private _snackBar: MatSnackBar,private customersService:CustomersService) { }

    // convenience getter for easy access to form fields
    get f() { return this.customerForm.controls; }

  ngOnInit(): void {
        this.isAddMode = !this.customerId;
        
        let group = {
          name: ['', [Validators.maxLength(50),Validators.required]],
          customerNumber: ['', [Validators.pattern("^[0-9]{9}$"),Validators.required]]
      }
      if(!this.isAddMode)
      // @ts-ignore
        group.id = this.customerId;

        this.customerForm = this.formBuilder.group(group);

        if (!this.isAddMode) {
          
          this.customersService.get(this.customerId!).subscribe((customer: any) => {
            console.log(customer); 
            this.customerForm.patchValue(customer);
          },
          err => {  
            this._snackBar.open(err.error, "Close");
          }
          );
      }
  }

  onSubmit() {
    if (this.customerForm!.invalid) {
        return;
    }

    if (this.isAddMode) {
        this.createCustomer();
    } else {
        this.updateCustomer();
    }
}

private createCustomer() {
  this.customersService.create(this.customerForm.value).subscribe( ()=> {
    this.router.navigate(["customers"]);
  },
  err => {  this._snackBar.open(err.error, "Close")
});
}

private updateCustomer() {
  this.customersService.update(this.customerId!, this.customerForm.value).subscribe( (customer: Customer)=> {
    console.log(customer); 
    this.router.navigate(["customers"]);
  },
  err => {  this._snackBar.open(err.error, "Close")
});
}
}
