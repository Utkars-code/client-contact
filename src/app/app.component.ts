import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/model/Contect.model';
import { ContactService } from './services/contact.service';
import { ContactPopupComponent } from './components/contact-popup/contact-popup.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'ContectApp';

  contacts: Contact[] = [];
  editContact: Contact | null = null;

  constructor(private contactService: ContactService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts(): void {
    this.contactService.getContacts().subscribe((data: Contact[]) => {
      this.contacts = data;
    });
  }

  addContact(contact: Contact): void {
    this.contactService.addContact(contact).subscribe(() => {
      this.loadContacts();
    });
  }

  updateContact(contact: Contact): void {
    this.contactService.updateContact(contact).subscribe(() => {
      this.loadContacts();
      this.editContact = null;
    });
  }

  deleteContact(id: number): void {
    this.contactService.deleteContact(id).subscribe(() => {
      this.loadContacts();
    });
  }

  editExistingContact(contact: Contact): void {
    this.editContact = contact;
    this.openModal();
  }

  onAddNewContact(): void {
    this.editContact = null; // Clear editContact to open the form for a new contact
    this.openModal();
  }

  openModal(): void {
    const modalRef = this.modalService.open(ContactPopupComponent);
    modalRef.componentInstance.editContact = this.editContact; // Pass the editContact if exists

    modalRef.result.then((result) => {
      if (result) {
        if (this.editContact) {
          this.updateContact(result); // Update if editing
        } else {
          this.addContact(result); // Add if new
        }
      }
    }, (reason) => {
      console.log('Modal dismissed:', reason);
    });
  }
}
