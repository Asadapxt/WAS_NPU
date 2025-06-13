import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-home',
  imports: [
    CommonModule

  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private titleService: Title) {
    this.titleService.setTitle("หน้าหลัก");
  }

  downloadPdf() {
    const pdfUrl = 'files/หลักเกณฑ์และวิธีการประเมินผลการปฏิบัติงานของพนักงานมหาวิทยาลัย ประเภทวิชาการ.pdf';
    window.open(pdfUrl, '_blank');
  }
}
