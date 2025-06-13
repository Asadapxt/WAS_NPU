import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { UserService } from '../../services/users/user.service';

@Component({
  selector: 'app-eval-result',
  imports: [CommonModule, FormsModule],
  templateUrl: './eval-result.component.html',
  styleUrl: './eval-result.component.css'
})
export class EvalResultComponent {
  constructor(private titleService: Title, private userService: UserService) {
    this.titleService.setTitle("ผลการประเมิน (ปว-03)");
  }

  @ViewChild('fac_search') fac_search!: ElementRef;
  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    const fac_search = this.fac_search?.nativeElement?.contains(event.target);

    if (!fac_search) { this.facSearch_dd = false; }
  }

  ngOnInit() {
    this.updatePagedData();
    
  }

  // ตัวแปร
  users: any[] = [];  // ข้อมูลผู้ใช้
  searchName = '';
  searchFaculty = '';
  selectedUser: any = {};

  pagedData: any[] = [];  // ข้อมูลที่แสดงในตาราง
  currentPage: number = 1;
  pageSize: number = 15;
  totalPages: number = 1;

  // ข้อมูล
  teachers = [  
    { no: 1, name: 'รศ.ดร.อัษฎา ปรีชาเจริญกิจ', faculty: 'วิศวกรรมศาสตร์', position: 'คณบดี', status: 0, result_path: 'files/เกณฑ์ในการประเมินภาระงาน.pdf'},
    { no: 2, name: 'อ.ดร.สมชาย ใจดี', faculty: 'ศิลปศาสตร์', position: 'คณบดี', status: 0, result_path: 'files/เกณฑ์ในการประเมินภาระงาน.pdf'},
    { no: 3, name: 'ผศ.ดร.สุดา ศรีสุข', faculty: 'ครุศาสตร์', position: 'รองคณบดี', status: 1, result_path: 'files/เกณฑ์ในการประเมินภาระงาน.pdf'},
    { no: 3, name: 'ผศ.ดร.สุดา ศรีสุข', faculty: 'ครุศาสตร์', position: 'อาจารย์', status: 1, result_path: 'files/เกณฑ์ในการประเมินภาระงาน.pdf'},
  ];
  
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

  downloadPdf(path: string, name: string) {
    const link = document.createElement('a');
    link.href = path;
    link.download = 'แบบ ป-ว 03 ' + name + '.pdf';
    link.click();
  }

  // ตัวเลือกข้อมูล
  facultyOptions: string[] = [
    'เกษตรศาสตร์',
    'ครุศาสตร์อุตสาหกรรม',
    'เทคโนโลยี',
    'เทคโนโลยีสารสนเทศ',
    'ประมง',
    'วิทยาศาสตร์',
    'วิศวกรรมศาสตร์',
    'สิ่งแวดล้อม',
    'วิทยาศาสตร์การกีฬา',
    'กายภาพบำบัด',
    'การแพทย์แผนไทย',
    'ทันตแพทยศาสตร์',
    'พยาบาลศาสตร์',
    'เภสัชศาสตร์',
    'สหเวชศาสตร์',
    'สัตวแพทยศาสตร์',
    'สาธารณสุขศาสตร์',
    'นิติศาสตร์',
    'นิเทศศาสตร์',
    'บริหารธุรกิจและการบัญชี',
    'มนุษยศาสตร์',
    'รัฐศาสตร์',
    'ศิลปกรรมศาสตร์',
    'ศึกษาศาสตร์',
    'เศรษฐศาสตร์',
    'อักษรศาสตร์',
    'ศิลปศาสตร์',
    'โบราณคดี',
    'สถาปัตยกรรมศาสตร์',
    'สังคมศาสตร์',
  ].sort((a, b) => a.localeCompare(b, 'th'));

  // ฟังก์ชันค้นหา

  search() {
    this.userService.searchUsers(this.searchName, this.searchFaculty).subscribe({
      next: (data) => (this.users = data),
      error: (err) => console.error(err),
    });
    console.log(`Searching for name: ${this.searchName}, faculty: ${this.searchFaculty}`);
  }

  facSearch_dd = false;
  toggleFacSearch_dd() {
    this.facSearch_dd = !this.facSearch_dd;
    console.log(this.facSearch_dd);
  }

  selectSearchFaculty(faculty: string, event: Event) {
    event.stopPropagation();
    this.searchFaculty = faculty;
    this.facSearch_dd = false;  
  }

}
