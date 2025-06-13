import { Component, ViewChild, ElementRef } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-setting',
  imports: [],
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.css'
})
export class SettingComponent {
  @ViewChild('htmlData', { static: false }) htmlData!: ElementRef;

  exportToPDF(): void {
    const doc = new jsPDF();

    autoTable(doc, {
      html: this.htmlData.nativeElement,  // ดึงข้อมูลจากตารางใน HTML
      startY: 20,
      headStyles: {
        fillColor: false,
        textColor: 0,
      },
      bodyStyles: {
        fillColor: [255, 255, 255], // ✅ สีพื้นหลังของ cell ใน body (เช่น ขาว)
        textColor: 20,
        lineColor: [0, 0, 0],
        lineWidth: 0.1
      },
      styles: {
        fontSize: 12,
        cellPadding: 4,
        lineColor: [0, 0, 0],      // เส้นขอบ cell (RGB) เช่น [0,0,0] = สีดำ
        lineWidth: 0.1
      },
    });

    doc.setFontSize(16);
    doc.text('รายงานสินค้าคงคลัง', 14, 15);
    const pdfBlob = doc.output('blob');
    const pdfUrl = URL.createObjectURL(pdfBlob);
    window.open(pdfUrl);
  }
}
