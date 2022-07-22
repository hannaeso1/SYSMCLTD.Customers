import { Injectable } from '@angular/core';
import {Contact} from '../models/customer';
import { Observable, of ,BehaviorSubject} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private contactApiUrl = `${environment.apiUrl}/api/contact`;
  private contact = new BehaviorSubject(new Contact(0,false,"",0));
  currentApprovalStageMessage = this.contact.asObservable();

  constructor(private http: HttpClient) { }

  create(contact:Contact): Observable<Contact> {
    return this.http.post<Contact>(this.contactApiUrl, contact);
  }

  updateContactInParent(contact: Contact) {
    this.contact.next(contact);
}
}
