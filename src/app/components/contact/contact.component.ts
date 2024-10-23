import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Contact } from 'src/model/Contect.model';
import { ContactService } from 'src/app/services/contact.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit, OnChanges {

  @Input() editContact: Contact | null = null;
  @Output() contactAdded = new EventEmitter<Contact>();
  @Output() contactUpdated = new EventEmitter<Contact>();

  contactForm: FormGroup;
  contacts: Contact[] = [];

  constructor(private fb: FormBuilder, private toastr: ToastrService, private contactService: ContactService,private activeModal:NgbActiveModal) {
    this.contactForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
      lastName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    this.contactService.getContacts().subscribe({
      next: (contacts: Contact[]) => {
        this.contacts = contacts;
      },
      error: () => {
        this.toastr.error('Failed to load contacts for validation.', 'Error');
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['editContact'] && this.editContact) {
      this.contactForm.patchValue(this.editContact);
    } else {
      this.contactForm.reset();
    }
  }

  isEmailUnique(email: string): boolean {
    if (this.editContact && this.editContact.email === email) {
      return true;
    }
    return !this.contacts.some(contact => contact.email === email);
  }

  closeModal(): void {

    this.activeModal.dismiss('Close button click');
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      const contact: Contact = { ...this.contactForm.value };

      if (!this.isEmailUnique(contact.email)) {
        this.toastr.error('This email is already in use. Please use a different email.', 'Error');
        return;
      }

      if (this.editContact) {
        contact.id = this.editContact.id;
        this.contactUpdated.emit(contact);
        this.toastr.success('Contact updated successfully!', 'Success');
      } else {
        this.contactAdded.emit(contact);
        this.toastr.success('New Contact added successfully!', 'Success');
      }

      this.contactForm.reset();
    } else {
      this.toastr.error('Please fill out the form correctly.', 'Error');
    }
  }
}
