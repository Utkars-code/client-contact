import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Contact } from 'src/model/Contect.model';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private apiUrl = 'https://localhost:7104/api/Contact';

  constructor(private http: HttpClient,private toastr: ToastrService) {}

  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.apiUrl).pipe(
      catchError((error) => {
        this.toastr.error('Failed to fetch contacts.', 'Error');
        return throwError(error);
      })
    );
  }

  addContact(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(this.apiUrl, contact).pipe(
      catchError((error) => {
        this.toastr.error('Failed to add contact.', 'Error');
        return throwError(error);
      })
    );
  }

  updateContact(contact: Contact): Observable<Contact> {
    return this.http.put<Contact>(`${this.apiUrl}/${contact.id}`, contact).pipe(
      catchError((error) => {
        this.toastr.error('Failed to update contact.', 'Error');
        return throwError(error);
      })
    );
  }

  deleteContact(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        this.toastr.error('Failed to delete contact.', 'Error');
        return throwError(error);
      })
    );
  }
}

