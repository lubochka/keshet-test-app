// src/app/core/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InvoiceQueryDto } from './models/invoice-query.dto';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly baseUrl = 'http://localhost:3006/api/invoices';

  constructor(private http: HttpClient) {}

  // GET /invoices?client=...&title=...&dateFrom=...&dateTo=...&page=...&limit=...
  getInvoices(filter: InvoiceQueryDto = {}): Observable<any[]> {
    let params = new HttpParams();
    // Only add fields if they are set (to avoid undefined in URL)
    Object.entries(filter).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params = params.set(key, String(value));
      }
    });
    return this.http.get<any[]>(this.baseUrl, { params });
  }

  // GET /invoices/:id
  getInvoiceById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  // GET /invoices/:id/pdf (returns blob for PDF download/view)
  getInvoicePdf(id: string): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/${id}/pdf`, { responseType: 'blob' });
  }
}
