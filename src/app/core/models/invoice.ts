export interface Invoice {
  id: string;
  description: string;
  supplier: string;
  cost: number;
  status: string;
  pdfUrl?: string;
  // ...other fields as needed
}