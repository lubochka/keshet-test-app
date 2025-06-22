import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {InvoiceQueryDto} from '../core/models/invoice-query.dto'

@Component({
  selector: 'app-filter-bar',
  imports: [ FormsModule,
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
 
  internalFilter: InvoiceQueryDto = {
  client: '',
  title: '',
  dateFrom: null,
  dateTo: null,
  page: 1,
  limit: 10
};

  @Output() filterChange = new EventEmitter<InvoiceQueryDto>();

  emitFilter() {
    this.filterChange.emit(this.internalFilter);
  }
}
