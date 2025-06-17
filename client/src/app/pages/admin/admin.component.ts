import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import Swal from 'sweetalert2';
import { UserService } from '../../services/users/user.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  constructor(
    private titleService: Title, 
    private userService: UserService, 
    private http: HttpClient
  ) {
    this.titleService.setTitle("จัดการบุคลากร");
  }

  ngOnInit() {
    this.updatePagedData();
    this.userService.getUsers().subscribe({
      next: (data) => this.users = data.users,
      error: (err) => console.error(err),
    });
  }

  @ViewChild('fac_search') fac_search!: ElementRef;
  @ViewChild('fac_edit') fac_edit!: ElementRef;
  @ViewChild('pw_edit') pw_edit!: ElementRef;
  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    const fac_search = this.fac_search?.nativeElement?.contains(event.target);
    const fac_edit = this.fac_edit?.nativeElement?.contains(event.target);
    const pw_edit = this.pw_edit?.nativeElement?.contains(event.target);

    if (!fac_search) { this.facSearch_dd = false; }
    if (!fac_edit) { this.fac_dd = false; }
    if (!pw_edit) { this.pw_dd = false; }
  }

  // ตัวแปร
  users: any[] = [];
  searchName = '';
  searchFaculty = '';

  fac_dd = false;
  facSearch_dd = false;
  pw_dd = false;

  pagedData: any[] = [];
  currentPage: number = 1;
  pageSize: number = 15;
  totalPages: number = 1;
  showModal: boolean = false;
  confirmPopup: boolean = false;
  selectedUser: any = {};

  // ฟังก์ชันค้นหาข้อมูล
  search() {
    this.userService.searchUsers(this.searchName, this.searchFaculty).subscribe({
      next: (data) => (this.users = data),
      error: (err) => console.error(err),
    });
    // console.log(`Searching for name: ${this.searchName}, faculty: ${this.searchFaculty}`);
    
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

  positionWorkOptions: string[] = [
    "อธิการบดี",
    "รองอธิการบดี",
    "ผู้ช่วยอธิการบดี",
    "คณบดี",
    "รองคณบดี",
    "ผู้ช่วยคณบดี",
    "ผู้อำนวยการ",
    "รองผู้อำนวยการ",
    "หัวหน้าสาขาวิชา",
    "เลขานุการคณะ",
    "เลขานุการสาขา",
    "ประธานหลักสูตร",
    "กรรมการบริหารหลักสูตร"
  ].sort((a, b) => a.localeCompare(b, 'th'));

  // สถานะ dropdown

  toggleFac_dd() {
    this.fac_dd = !this.fac_dd;
    // console.log(this.fac_dd);
  }

  toggleFacSearch_dd() {
    this.facSearch_dd = !this.facSearch_dd;
    // console.log(this.facSearch_dd);
  }

  togglePw_dd() {
    this.pw_dd = !this.pw_dd;
    // console.log(this.pw_dd);
  }

  selectFaculty(faculty: string, event: Event) {
    event.stopPropagation();
    this.selectedUser.faculty = faculty;
    this.fac_dd = false;  
  }

  selectPositionWork(pw: string, event: Event) {
    event.stopPropagation();
    this.selectedUser.position_work = pw;
    this.pw_dd = false;  
  }

  selectSearchFaculty(faculty: string, event: Event) {
    event.stopPropagation();
    this.searchFaculty = faculty;
    this.facSearch_dd = false;
  }
  
  // เปลี่ยนหน้าตาราง
  
  updatePagedData() {
    this.totalPages = Math.ceil(this.users.length / this.pageSize) || 1;
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedData = this.users.slice(startIndex, endIndex);
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

  //ฟอร์มแก้ไขข้อมูล
  openEditModal(user: any) {
    this.selectedUser = { ...user };
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  openComfirm() {
    this.confirmPopup = true;
    Swal.fire({
      title: 'คุณแน่ใจหรือไม่?',
      text: "ต้องการแก้ไขข้อมูลหรือไม่",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'บันทึก',
      cancelButtonText: 'ยกเลิก',
      reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
          this.userService.updateUser(this.selectedUser).subscribe({
            next: (res) => {
              Swal.fire(
                'บันทึกแล้ว!',
                'แก้ไขข้อมูลเรียบร้อย',
                'success'
              ).then(() => {
                this.showModal = false;
                window.location.reload();
              });
            },
            error: (err) => {
              console.error('เกิดข้อผิดพลาด', err);
              Swal.fire('เกิดข้อผิดพลาด', 'ไม่สามารถอัปเดตข้อมูลได้', 'error');
            }
          });
        }
      });
  }
}
