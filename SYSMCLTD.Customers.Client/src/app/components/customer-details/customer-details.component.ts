import { Component, OnInit } from '@angular/core';
import {Customer, Contact} from '../../models/customer';
import { CustomersService } from '../../services/customers.service';
import { ContactService } from '../../services/contact.service';
import { ViewEditModeService } from '../../services/view-edit-mode.service';
import { ActivatedRoute, Params } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {

  customer: Customer| undefined;
  isEditMode : boolean = false;
  isShowNewContactForm : boolean = false;
  customerId:string| undefined;

  constructor(private contactService: ContactService,private customersService: CustomersService, private viewEditModeService:ViewEditModeService, private route: ActivatedRoute, private _snackBar: MatSnackBar) { }

  customerForm = new FormGroup({
    customerName : new FormControl('',[Validators.required]),
    customerNumber: new FormControl('',[Validators.pattern("^[0-9]{9}$"),Validators.required])
  });

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => this.customerId = params['id']);
    this.viewEditModeService.currentApprovalStageMessage.subscribe(isEdit => this.isEditMode = isEdit);
    this.contactService.currentApprovalStageMessage.subscribe(contact => this.customer?.contacts?.push(contact));
    if(this.customerId != null)
    {
      this.customersService.get(this.customerId).subscribe((customer: Customer) => {
        console.log(customer); 
        this.customer = customer;
      },
      err => {  
        console.log("error get customer");
      }
      );
      
    }
  }
  changeEditState(){
    this.isEditMode =!this.isEditMode;
}
showAddContactForm()
{
  this.isShowNewContactForm = true;
}
}
