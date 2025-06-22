import { Component, EventEmitter, Output ,HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {InvoiceQueryDto} from '../../core/models/invoice-query.dto'
import { DatePipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-filter-bar',
  imports: [ FormsModule,
    DatePipe,
    CommonModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule],
  templateUrl: './filter-bar.component.html',
  styleUrl: './filter-bar.component.scss',
   standalone: true,
})
export class FilterBarComponent {
  showDatePicker = false;
  internalFilter: InvoiceQueryDto = {
  client: '',
  title: '',
  dateFrom: null,
  dateTo: null,
  page: 1,
  limit: 10
};

 toggleDateRange(event: Event) {
    event.stopPropagation(); // Prevent click from bubbling to document
    this.showDatePicker = true;
    console.log('showDatePicker:', this.showDatePicker);
  }

  // Button to close the popup and emit
  closeDateRange() {
    this.showDatePicker = false;
    this.emitFilter();
  }

  // Listen for clicks anywhere in the document
  @HostListener('document:click', ['$event'])
  handleOutsideClick(event: Event) {
    if (this.showDatePicker) {
      this.showDatePicker = false;
    }
  }
  @Output() filterChange = new EventEmitter<InvoiceQueryDto>();

  emitFilter() {
    this.filterChange.emit(this.internalFilter);
  }
}
