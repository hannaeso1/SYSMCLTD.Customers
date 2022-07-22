import { Component,Input, OnInit } from '@angular/core';
import {FormBuilder,FormGroup, Validators } from '@angular/forms';
import {Contact} from '../../models/customer';
import {MatSnackBar} from '@angular/material/snack-bar';
//import { Router } from '@angular/router';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {

   // @ts-ignore
   contactForm: FormGroup;
   @Input() customerId: string | undefined;

  constructor( private formBuilder: FormBuilder, private _snackBar: MatSnackBar,private contactService:ContactService) { }

    // convenience getter for easy access to form fields
    get f() { return this.contactForm.controls; }

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      customerId:[this.customerId],
      fullName: ['', [Validators.maxLength(50),Validators.required]],
      officeNumber:['',[Validators.maxLength(18),Validators.pattern("^[0-9]{0,18}$")]],
      email: ['', [Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"), Validators.maxLength(50)]]
  });
  }

  onSubmit() {
    if (this.contactForm!.invalid) {
        return;
    }

    this.contactService.create(this.contactForm.value).subscribe( (contact:Contact)=> {
      this.contactService.updateContactInParent(contact);
    },
    err => {  this._snackBar.open(err.error, "Close")
  });
}
}
