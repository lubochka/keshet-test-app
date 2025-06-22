import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { CounterBarComponent } from '../counter-bar/counter-bar.component';
import { FilterBarComponent } from '../filter-bar/filter-bar.component';
import { InvoiceTableComponent } from '../invoice-table/invoice-table.component';
import { PdfViewerComponent } from '../pdf-viewer/pdf-viewer.component';
import { StoreService } from '../../core/store.service'; // Make sure this exists!
import { Invoice } from '../../core/models/invoice';
import { InvoiceQueryDto } from '../../core/models/invoice-query.dto';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-invoices-page',
   standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    CounterBarComponent,
    FilterBarComponent,
    InvoiceTableComponent,
    PdfViewerComponent
  ],
  templateUrl: './invoices-page.component.html',
  styleUrl: './invoices-page.component.scss'
})
export class InvoicesPageComponent {
 invoices: Invoice[] = [];
  selectedInvoice: Invoice | null = null;

  private subscriptions = new Subscription();

  constructor(private store: StoreService) {}

  ngOnInit(): void {
    // Initial load
    this.store.loadInvoices();

    // Subscribe to store
    this.subscriptions.add(
      this.store.invoices$.subscribe(invList => this.invoices = invList)
    );
    this.subscriptions.add(
      this.store.selectedInvoice$.subscribe(inv => this.selectedInvoice = inv)
    );
  }

  onFilterChange(filter: InvoiceQueryDto) {
    this.store.loadInvoices(filter);
    // Optionally clear selected invoice on new filter:
    this.store.clearSelectedInvoice();
  }

  onRowSelect(invoiceId: string) {
    this.store.selectInvoice(invoiceId);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
