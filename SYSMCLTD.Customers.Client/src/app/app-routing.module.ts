import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from './components/customers/customers.component';
import { CustomerDetailsComponent } from './components/customer-details/customer-details.component';
import { NewCustomerComponent } from './components/new-customer/new-customer.component';
const routes: Routes = [ 
  {
  path: 'customers',
  component: CustomersComponent
},
{
  path: 'customer/:id',
  component: CustomerDetailsComponent
},
{
  path: 'add-customer',
  component: NewCustomerComponent
},
{
  path: '',
  component: CustomersComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
