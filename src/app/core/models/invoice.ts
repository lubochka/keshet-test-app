export interface Invoice {
  id: string;
  client: string;
  title: string;
  amount: number;
  status: string;
  currency:string;
  invoiceNumber:string;
  updatedAt:Date;
  pdfUrl?: string;
  // ...other fields as needed
}

export interface InvoiceListResponse {
  items: Invoice[];
  total: number;
}