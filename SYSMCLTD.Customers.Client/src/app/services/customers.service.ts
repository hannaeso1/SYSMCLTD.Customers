import { Injectable } from '@angular/core';
import {Customer} from '../models/customer';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  private customersApiUrl = `${environment.apiUrl}/api/customers`;
  
  constructor(private http: HttpClient) { }

  getAll(): Observable<Array<Customer>> {
    return  this.http.get<Array<Customer>>(this.customersApiUrl);
  }

  get(id:string): Observable<Customer> {
    return  this.http.get<Customer>(`${this.customersApiUrl}/${id}`);
  }

  update(id:string, customer:Customer): Observable<Customer> {
    return this.http.put<Customer>(`${this.customersApiUrl}/${id}`, customer);
  }

  create(customer:Customer): Observable<Customer> {
    return this.http.post<Customer>(this.customersApiUrl, customer);
  }


  delete(id:number): Observable<Customer> {
    return this.http.delete<Customer>(`${this.customersApiUrl}/${id}`);
  }
}
