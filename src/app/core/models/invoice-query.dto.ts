export interface InvoiceQueryDto {
  id?:string;
  client?: string;
  title?: string;
  dateFrom?: Date |null; // use ISO string: 'YYYY-MM-DD'
  dateTo?:  Date |null;   // use ISO string
  page?: number;
  limit?: number;
}