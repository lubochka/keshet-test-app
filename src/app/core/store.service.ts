// src/app/core/store.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';
import { Invoice,InvoiceListResponse } from './models/invoice';
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
        next: (invoiceListResponce) => this.invoicesSubject.next(invoiceListResponce.items),
        error: () => this.invoicesSubject.next([]), // fallback on error
      });
      this.loadInvoiceStatusCounts(this.currentFilter);
  }

  /** Get and store a specific invoice by ID */
  selectInvoice(id: string): void {
    this.api.getInvoiceById(id)
      .subscribe({
        next: (invoiceListResponce) => this.selectedInvoiceSubject.next(invoiceListResponce.total>0?invoiceListResponce.items[0]:null),
        error: () => this.selectedInvoiceSubject.next(null),
      });
  }

  /** Optionally, expose a method to clear selected invoice */
  clearSelectedInvoice(): void {
    this.selectedInvoiceSubject.next(null);
  }

  private statusCountsSubject = new BehaviorSubject<{ status: string, count: number }[]>([]);
statusCounts$ = this.statusCountsSubject.asObservable();

loadInvoiceStatusCounts(filter?: InvoiceQueryDto): void {
  this.api.getInvoiceCountsByStatus(filter || {})
    .subscribe({
      next: (counts) => this.statusCountsSubject.next(counts),
      error: () => this.statusCountsSubject.next([]),
    });
}
}
