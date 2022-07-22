import { Component, OnInit } from '@angular/core';
import {Customer} from '../../models/customer';
import { CustomersService } from '../../services/customers.service';
import { ViewEditModeService } from '../../services/view-edit-mode.service';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customers: Array<Customer> | undefined;
  displayedColumns: string[] = ['id','name','customerNumber', 'action'];
  title:string = "SYSMCLTD Customers System";

  constructor(private customersService: CustomersService,private viewEditModeService:ViewEditModeService, private router: Router , private _snackBar: MatSnackBar) { 
    this.customersService.getAll().subscribe((customers: Array<Customer>) => {
      console.log(customers); 
      this.customers = customers;
    },
    err => {  
      console.log("error get customers");
      this._snackBar.open("An error occured", "Close")
    }
    );
  }

  ngOnInit(): void {
    
  }

  gotoAddRow()
  {
    this.router.navigate(["add-customer"]);
  }

gotoRow(id:number,isEdit:boolean)
{
  this.viewEditModeService.updateEditMode(isEdit);
  this.router.navigate(["customer", id]);
}

deleteRow(id:number)
{
  this.customersService.delete(id).subscribe((customer: Customer) => {
    this.customers = this.customers!.filter((value,key)=>{
      return value.id != id;
    });
  },
  err => {  
    console.log("error delete customer");
    this._snackBar.open("An error occured", "Close")
  }
  );
}
}

