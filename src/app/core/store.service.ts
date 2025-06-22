// src/app/core/store.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';
import { Invoice } from './models/invoice';
import { InvoiceQueryDto } from './models/invoice-query.dto';

@Injectable({ providedIn: 'root' })
export class StoreService {
  private invoicesSubject = new BehaviorSubject<Invoice[]>([]);
  invoices$ = this.invoicesSubject.asObservable();

  private selectedInvoiceSubject = new BehaviorSubject<Invoice | null>(null);
  selectedInvoice$ = this.selectedInvoiceSubject.asObservable();

  private currentFilter: InvoiceQueryDto = {};

  constructor(private api: ApiService) {}

  /** Load invoices using provided filter, or current stored filter */
  loadInvoices(filter?: InvoiceQueryDto): void {
    this.currentFilter = filter || this.currentFilter || {};
    this.api.getInvoices(this.currentFilter)
      .subscribe({
        next: (invoices) => this.invoicesSubject.next(invoices),
        error: () => this.invoicesSubject.next([]), // fallback on error
      });
  }

  /** Get and store a specific invoice by ID */
  selectInvoice(id: string): void {
    this.api.getInvoiceById(id)
      .subscribe({
        next: (invoice) => this.selectedInvoiceSubject.next(invoice),
        error: () => this.selectedInvoiceSubject.next(null),
      });
  }

  /** Optionally, expose a method to clear selected invoice */
  clearSelectedInvoice(): void {
    this.selectedInvoiceSubject.next(null);
  }
}
