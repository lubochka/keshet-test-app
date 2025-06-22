import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Invoice } from '../../core/models/invoice'; // adjust path as needed
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-invoice-table',
   standalone: true, 
  imports: [CommonModule, MatIconModule],
  templateUrl: './invoice-table.component.html',
  styleUrl: './invoice-table.component.scss'
})
export class InvoiceTableComponent {
 @Input() invoices: Invoice[] = [];
  @Input() selectedId: Invoice | null = null;
  @Output() rowSelect = new EventEmitter<string>();
}
