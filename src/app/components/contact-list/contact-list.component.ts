import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Contact } from 'src/model/Contect.model';

@Component({
  selector: 'app-contact-list',

  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent {
  @Input() contacts: Contact[] = [];
  @Output() deleteContact = new EventEmitter<number>();
  @Output() editContact = new EventEmitter<Contact>();
  @Output() addNewContact = new EventEmitter<void>();

  // Pagination and filtering variables
  searchTerm: string = '';
  currentPage: number = 1;
  selectedContact: Contact | null = null;

  constructor(private toastr: ToastrService) {}

  // Filter contacts based on search
  get filteredContacts(): Contact[] {
    if (!this.searchTerm) {
      return this.contacts;
    }
    return this.contacts.filter(contact =>
      contact.firstName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      contact.lastName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  onDelete(id: number): void {
    this.deleteContact.emit(id);
    this.toastr.success('Contact deleted successfully!', 'Success');
  }

  onEdit(contact: Contact): void {
    this.editContact.emit(contact);
  }

  addNContact(): void {
    this.addNewContact.emit();
  }
    // Display the details of the selected contact
    showDetails(contact: Contact): void {
      this.selectedContact = contact;
    }
    onMouseOver(contact: Contact): void {
      contact.isHovered = true;
    }

    // Remove highlight when mouse leaves the row
    onMouseOut(contact: Contact): void {
      contact.isHovered = false;
    }
}
