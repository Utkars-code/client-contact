import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Contact } from 'src/model/Contect.model';

@Component({
  selector: 'app-contact-popup',
  templateUrl: './contact-popup.component.html',
  styleUrls: ['./contact-popup.component.scss']
})
export class ContactPopupComponent {

  @Input() editContact: Contact | null = null;

  constructor(public activeModal: NgbActiveModal) {}

  onContactAdded(contact: Contact): void {
    this.activeModal.close(contact);
  }

  onContactUpdated(contact: Contact): void {
    this.activeModal.close(contact);
  }
}
