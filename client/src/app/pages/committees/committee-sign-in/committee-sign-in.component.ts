import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-committee-sign-in',
  imports: [CommonModule],
  templateUrl: './committee-sign-in.component.html',
  styleUrl: './committee-sign-in.component.css'
})
export class CommitteeSignInComponent {
  constructor(private titleService: Title) {
    this.titleService.setTitle("ลงชื่อเข้าร่วมการประเมิน");
  }

  year = new Date().getFullYear() + 543;

  users = [
    { name: 'ดร.อัษฎา ปรีชาเจริญกิจ', faculty: 'วิศวกรรมศาสตร์', position: 'ผู้ช่วยศาสตราจารย์'},
  ];
}
