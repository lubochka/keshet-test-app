import { Component, Input,OnChanges,SimpleChanges  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@Component({
  selector: 'app-pdf-viewer',
  standalone: true,
  imports: [CommonModule, PdfViewerModule],
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.scss']
})
export class PdfViewerComponent {
  @Input() pdfId?:string | null;
  @Input() pdfSrc?: string | null; // Accepts URL, base64, or Blob URL
  @Input() title?: string | null;
  page: number = 1;

  ngOnChanges(changes: SimpleChanges) {
    // Only set pdfSrc if it is not provided by parent, and pdfId changes
    console.log('changes',changes, changes['pdfId']['currentValue']);
    if (changes['pdfId'] && changes['pdfId']['currentValue']) {
      this.pdfSrc = `http://localhost:3001/api/invoices/${changes['pdfId']['currentValue']}/pdf`;
    }
    
  }

  onPdfLoad() {
    this.page = 1;
  }
}
