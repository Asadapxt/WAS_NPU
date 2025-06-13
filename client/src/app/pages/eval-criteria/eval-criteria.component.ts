import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-eval-criteria',
  imports: [CommonModule],
  templateUrl: './eval-criteria.component.html',
  styleUrl: './eval-criteria.component.css'
})
export class EvalCriteriaComponent {

  constructor(private router: Router, private titleService: Title) {
    this.titleService.setTitle("เกณฑ์การประเมินภาระงาน");
  }

  downloadPdf() {
    const pdfUrl = 'files/เกณฑ์ในการประเมินภาระงาน.pdf';
    window.open(pdfUrl, '_blank')
  }
}
