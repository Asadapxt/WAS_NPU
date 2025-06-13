import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-committee',
  imports: [CommonModule, FormsModule],
  templateUrl: './committee.component.html',
  styleUrl: './committee.component.css'
})
export class CommitteeComponent {
  constructor(private titleService: Title) {
    this.titleService.setTitle("คณะกรรมการประเมิน");
  }

  ngOnInit() {
    this.updatePagedData();
    
  }

  // ข้อมูล
  teachers = [  
    { no: 1, name: 'รศ.ดร.อัษฎา ปรีชาเจริญกิจ', faculty: 'วิศวกรรมศาสตร์', position: 'คณบดี', status: 0, vote: 0, File1_path: '', File2_path: ''},
    { no: 2, name: 'อ.ดร.สมชาย ใจดี', faculty: 'ศิลปศาสตร์', position: 'คณบดี', status: 0, vote: 0, File1_path: '', File2_path: ''},
    { no: 3, name: 'ผศ.ดร.สุดา ศรีสุข', faculty: 'ครุศาสตร์', position: 'รองคณบดี', status: 1, vote: 1, File1_path: '', File2_path: ''},
    { no: 3, name: 'ผศ.ดร.สุดา ศรีสุข', faculty: 'ครุศาสตร์', position: 'อาจารย์', status: 1, vote: 1, File1_path: '', File2_path: ''},
  ];
  
  // เปลี่ยนหน้าตาราง
  pagedData: any[] = [];
  currentPage: number = 1;
  pageSize: number = 11;
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
