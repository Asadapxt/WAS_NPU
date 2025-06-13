import { Component } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { NgChartsModule } from 'ng2-charts';
import { ChartType, ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-rank',
  standalone: true,
  imports: [
    CommonModule,
    NgChartsModule,
  ],
  templateUrl: './rank.component.html',
  styleUrl: './rank.component.css',
})
export class RankComponent {
  ngOnInit() {
    this.updatePagedData();
  }

  constructor(private titleService: Title) {
    this.titleService.setTitle('อันดับการประเมินภาระงาน');
  }

  downloadPdf() {
    const pdfUrl = 'files/เกณฑ์ในการประเมินภาระงาน.pdf';
    window.open(pdfUrl, '_blank')
  }

  //ดึงข้อมูลวัน เดือน ปี ปัจจุบัน
  now = new Date();
  year: number = this.now.getFullYear() + 543;
  month: number = this.now.getMonth() + 1;
  day: number = this.now.getDate();
  academicYear: number = 0;

  //ตรวจสอบปีการศึกษา
  checkRound() {
    if((this.day >= 1 && this.month >= 10) || (this.month <= 3)) {
      return "1";
    }
    else {
      return "2";
    }
  }

  checkAcademicYear() {
    if (this.month >= 6) {
      return this.year;
    } 
    else {
      return this.year - 1;
    }
  }

  chartType: ChartType = 'bar';

  chartData: ChartData = {
    labels: ['0-10', '11-20', '21-30', '31-40', '41-50', '51-60', '61-70', '71-80', '81-90', '91-100'],
    datasets: [
      {
        data: [150, 200, 180, 250, 220, 210, 190, 270, 230, 300],
        label: 'จำนวนอาจารย์',
        backgroundColor: 'rgba(239, 178, 37, 0.8)',
        borderColor: '#EFB225',
        borderWidth: 1
      }
    ]
  };

  chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'ช่วงคะแนน'
        }
      },
      y: {
        title: {
          display: true,
          text: 'จำนวนอาจารย์'
        },
        min: 0,
        max: 600,
        ticks: {
          stepSize: 100,
        }
      }
    }
  };

  teachers = [
    { rank: 1, name: 'รศ.ดร.อัษฎา ปรีชาเจริญกิจ', faculty: 'วิศวกรรมศาสตร์', grade: 'A', score: 100, hours: 1000 },
    { rank: 2, name: 'อ.ดร.สมชาย ใจดี', faculty: 'ศิลปศาสตร์', grade: 'B', score: 95, hours: 800 },
    { rank: 3, name: 'ผศ.ดร.สุดา ศรีสุข', faculty: 'ครุศาสตร์', grade: 'C', score: 98, hours: 900 },
  ];
  
  pagedData: any[] = [];
  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 1;
  
  updatePagedData() {
    this.totalPages = Math.ceil(this.teachers.length / this.pageSize);
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedData = this.teachers.slice(startIndex, endIndex);
  }
  
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagedData();
    }
  }
  
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagedData();
    }
  }
}
