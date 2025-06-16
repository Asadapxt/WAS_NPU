import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/users/user.service';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-registery',
  imports: [FormsModule, CommonModule],
  templateUrl: './registery.component.html',
  styleUrl: './registery.component.css'
})
export class RegisteryComponent {

  constructor(
    private titleService: Title, 
    private userService: UserService,
    private router: Router
  ) { this.titleService.setTitle("กรอกข้อมูลที่จำเป็น"); }

  ngOnInit() {

    this.userService.getUsers().subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.error(err);
      }
    });

    this.userService.getSSOUser().subscribe({
      next: (res) => {
        console.log(res); // ผลลัพธ์จาก API

        this.selectedUser.master_id = res.sso_user.data.user.id;
        this.selectedUser.name = res.sso_user.data.user.name;
        this.selectedUser.email = res.sso_user.data.user.email;
        
      },
      error: (err) => {
        console.error(err);
      }
    });   
  }

  selectedUser = {
    master_id: '',
    name: '',
    email: '',
    faculty: '',
    field_study: '',
    position: '',
    position_work: '',
    register_status: 1
  };

  get filteredFields(): string[] {
    return this.facultyMap[this.selectedUser.faculty] || [];
  }

  fac_dd = false;
  field_dd = false;
  position_dd = false;
  positionWork_dd = false;
  setStatus = 1;

  toggleFac_dd() {
    this.fac_dd = !this.fac_dd;
    console.log(this.fac_dd);
  }
  
  toggleField_dd() {
    if (!this.selectedUser.faculty) return; // ป้องกันการเลือก field ก่อน faculty
    this.field_dd = !this.field_dd;
    this.fac_dd = false;
  }

  togglePostion_dd() {
    this.position_dd = !this.position_dd;
    console.log(this.position_dd);
  }

  togglePositionWork_dd() {
    this.positionWork_dd = !this.positionWork_dd;
    console.log(this.positionWork_dd);
  }

  selectFaculty(faculty: string, event: Event) {
    event.stopPropagation();
    this.selectedUser.faculty = faculty;
    this.selectedUser.field_study = '';
    this.fac_dd = false;
  }

  selectField(field: string, event: Event) {
    event.stopPropagation();
    this.selectedUser.field_study = field;
    this.field_dd = false;
  }

  selectPosition(pos: string, event: Event) {
    event.stopPropagation();
    this.selectedUser.position = pos;
    this.position_dd = false; 
  }

  selectPositionWork(posw: string, event: Event) {
    event.stopPropagation();
    this.selectedUser.position_work = posw;
    this.positionWork_dd = false;
  }

  @ViewChild('fac') fac!: ElementRef;
  @ViewChild('field') field!: ElementRef;
  @ViewChild('p') p!: ElementRef;
  @ViewChild('pw') pw!: ElementRef;
  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    const fac = this.fac?.nativeElement?.contains(event.target);
    const field = this.field?.nativeElement?.contains(event.target);
    const p = this.p?.nativeElement?.contains(event.target);
    const pw = this.pw?.nativeElement?.contains(event.target);

    if (!fac) { this.fac_dd = false; }
    if (!field) { this.field_dd = false; }
    if (!p) { this.position_dd = false; }
    if (!pw) { this.positionWork_dd = false; }
  }

  // ตัวเลือกข้อมูล
  facultyMap: Record<string, string[]> = {
    'เกษตรและเทคโนโลยี': [
      'สาขาวิชาเกษตรศาสตร์',
      'สาขาวิชาพืชศาสตร์',
      'สาขาวิชาเพาะเลี้ยงสัตว์น้ำ',
      'สาขาวิชาสัตวศาสตร์',
      'สาขาวิชาอุตสาหกรรมเกษตร',
      'สาขาวิชาช่างกลเกษตร',
      'แขนงวิชาเทคโนโลยีอาหาร',
      'แขนงวิชาพืชศาสตร์',
      'แขนงวิชาการประมง',
      'แขนงวิชาเทคโนโลยีเครื่องจักรกลเกษตร',
      'แขนงวิชาสัตวศาสตร์'
    ],
    'ครุศาสตร์': [
      'สาขาวิชาเอกการศึกษาปฐมวัย',
      'สาขาวิชาเอกคณิตศาสตร์ศึกษา',
      'สาขาวิชาเอกคอมพิวเตอร์ศึกษา',
      'สาขาวิชาเอกภาษาไทย',
      'สาขาวิชาเอกภาษาอังกฤษ',
      'สาขาวิชาเอกวิทยาศาสตร์',
      'สาขาวิชาเอกดนตรีศึกษา',
      'สาขาวิชาเอกสังคมศึกษา',
      'สาขาวิชาการบริหารและพัฒนาการศึกษา',
      'สาขาวิชาหลักสูตรและการสอน',
      'สาขาวิชานวัตกรรมการจัดการเรียนรู้ประถมศึกษา'
    ],
    'วิทยาลัยการบินการศึกษาและวิจัยนานาชาติ': [
      'สาขาวิชาช่างอากาศยาน',
      'สาขาวิชาการจัดการการบิน'
    ],
    'วิทยาการจัดการและเทคโนโลยีสารสนเทศ': [
      'สาขาวิชาการจัดการ',
      'สาขาวิชานวัตกรรมการตลาดและธุรกิจอัจฉริยะ',
      'สาขาวิชาบัญชีบัณฑิต',
      'สาขาวิชานิเทศศาสตร์ดิจิทัล',
      'สาขาวิชาแขนงวิชาการจัดการกีฬา',
      'สาขาวิชาแขนงวิชาการฝึกกีฬาและการออกกำลังกาย',
      'สาขาวิชาเทคโนโลยีสารสนเทศและนวัตกรรมคอมพิวเตอร์',
      'สาขาวิชาเทคโนโลยีและนวัตกรรมคอมพิวเตอร์',
      'สาขาวิชานวัตกรรมการตลาด',
      'สาขาวิชาการจัดการและนวัตกรรมดิจิทัล'
    ],
    'วิทยาศาสตร์': [
      'สาขาวิชาแขนงวิชาคณิตศาสตร์',
      'สาขาวิชาชีววิทยา',
      'สาขาวิชาแขนงวิชาชีววิทยา',
      'สาขาวิชาฟิสิกส์',
      'สาขาวิชาแขนงวิชาฟิสิกส์',
      'สาขาวิชาแขนงวิชาเคมี',
      'สาขาวิชาเทคนิคการแพทย์'
    ],
    'วิศวกรรมศาสตร์': [
      'สาขาวิชาวิศวกรรมคอมพิวเตอร์',
      'สาขาวิชาวิศวกรรมอุตสาหการและการจัดการ',
      'สาขาวิชาวิศวกรรมเครื่องกล',
      'สาขาวิชาวิศวกรรมโยธา',
      'สาขาวิชาวิศวกรรมโลจิสติกส์',
      'สาขาวิชาวิศวกรรมไฟฟ้า',
      'สาขาวิชาการบริหารงานก่อสร้างและโครงสร้างพื้นฐาน'
    ],
    'ศิลปศาสตร์และวิทยาศาสตร์': [
      'สาขาวิชาพัฒนาสังคมและสิ่งแวดล้อม',
      'สาขาวิชาภาษาจีน',
      'สาขาวิชานิติศาสตร์บัณฑิต',
      'สาขาวิชารัฐประศาสนศาสตร์',
      'สาขาวิชาภาษาอังกฤษ',
      'สาขาวิชาภาษาไทยเพื่อการสื่อสารในยุคดิจิทัล'
    ],
    'วิทยาลัยการท่องเที่ยวและอุตสาหกรรมบริการ': [
      'สาขาวิชาการโรงแรม ภัตตาคาร และอีเว้นท์',
      'สาขาวิชาการท่องเที่ยวและอุตสาหกรรมบริการ'
    ],
    'เทคโนโลยีอุตสาหกรรม': [
      'สาขาวิชาช่างยนต์',
      'สาขาวิชาช่างกลโรงงาน',
      'สาขาวิชาช่างเชื่อมโลหะ',
      'สาขาวิชาช่างไฟฟ้ากำลัง',
      'สาขาวิชาช่างอิเล็กทรอนิกส์',
      'สาขาวิชาช่างก่อสร้าง',
      'สาขาวิชาสถาปัตยกรรม',
      'สาขาวิชาการบัญชี',
      'สาขาวิชาการตลาด',
      'สาขาวิชาการจัดการสำนักงาน',
      'สาขาวิชาคอมพิวเตอร์ธุรกิจ',
      'สาขาวิชาการโรงแรม',
      'สาขาวิชาเทคนิคเครื่องกล',
      'สาขาวิชาเทคนิคการผลิต',
      'สาขาวิชาเทคนิคโลหะ',
      'สาขาวิชาไฟฟ้า',
      'สาขาวิชาเทคนิคสถาปัตยกรรม',
      'สาขาวิชาเทคโนโลยีไฟฟ้าอุตสาหกรรม แขนงวิชาเทคโนโลยีไฟฟ้าและระบบอัตโนมัติ',
      'สาขาวิชาเทคโนโลยีไฟฟ้าอุตสาหกรรม แขนงวิชาเทคโนโลยีอิเล็กทรอนิกส์อัจฉริยะ',
      'สาขาวิชาเทคโนโลยีเครื่องกล แขนงวิชาเทคโนโลยีเครื่องกล',
      'สาขาวิชาเทคโนโลยีเครื่องกล แขนงวิชาเทคโนโลยียานยนต์สมัยใหม่',
      'สาขาวิชาเทคโนโลยีอุตสาหการ แขนงวิชาเทคโนโลยีวิศวกรรมการจัดการอุตสาหกรรม',
      'สาขาวิชาเทคโนโลยีอุตสาหการ แขนงวิชาเทคโนโลยีวิศวกรรมการผลิต',
      'สาขาวิชาหุ่นยนต์อัจฉริยะ',
      'สาขาวิชาวิศวกรรมไฟฟ้า',
      'สาขาวิชาเทคโนโลยีอุตสาหกรรม'
    ],
    'วิทยาลัยเทคโนโลยีอุตสาหกรรมศรีสงคราม': [
      'สาขาวิชาช่างยนต์',
      'สาขาวิชาช่างไฟฟ้ากำลัง',
      'สาขาวิชาช่างอิเล็กทรอนิกส์',
      'สาขาวิชาการบัญชี',
      'สาขาวิชาคอมพิวเตอร์ธุรกิจ',
      'สาขาวิชาการตลาด',
      'สาขาวิชาเทคนิคเครื่องกล',
      'สาขาวิชาการบัญชี',
      'สาขาวิชาคอมพิวเตอร์และการตลาดดิจิทัล',
      'สาขาวิชาไฟฟ้าและระบบอัตโนมัติ',
      'สาขาวิชาหุ่นยนต์อุตสาหกรรมและระบบอัตโนมัติ'
    ],
    'วิทยาลัยธาตุพนม': [
      'สาขาวิชาช่างยนต์',
      'สาขาวิชาช่างไฟฟ้ากำลัง',
      'สาขาวิชาช่างอิเล็กทรอนิกส์',
      'สาขาวิชาการบัญชี',
      'สาขาวิชาคอมพิวเตอร์ธุรกิจ',
      'สาขาวิชาอิเล็กทรอนิกส์และหุ่นยนต์',
      'สาขาวิชาไฟฟ้าและระบบอัตโนมัติ',
      'สาขาวิชาคอมพิวเตอร์และการตลาดดิจิทัล',
      'การจัดการธุรกิจค้าปลีกสมัยใหม่',
      'สาขาวิชาวิศวกรรมพลังงาน',
      'สาขาวิชาการจัดการธุรกิจการค้าสมัยใหม่',
      'สาขาวิชาไฟฟ้าเครื่องกลการผลิต แขนงวิชาไฟฟ้าควบคุม',
      'สาขาวิชาไฟฟ้าเครื่องกลการผลิต แขนงวิชาเครื่องกลการผลิต',
      'บัญชีบัณฑิต'
    ],
    'วิทยาลัยนาหว้า': [
      'สาขาวิชาช่างยนต์',
      'สาขาวิชาช่างไฟฟ้ากำลัง',
      'สาขาวิชาช่างอิเล็กทรอนิกส์',
      'สาขาวิชาการบัญชี',
      'สาขาวิชาคอมพิวเตอร์ธุรกิจ'
    ],
    'วิทยาลัยพยาบาลบรมราชชนนีนครพนม': [
      'สาขาวิชาพยาบาลศาสตร์',
      'ประกาศนียบัตรผู้ช่วยพยาบาล'
    ]
  };

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

  positionOptions: string[] = [
    "อาจารย์",
    "ผู้ช่วยศาสตราจารย์",
    "รองศาสตราจารย์",
    "ศาสตราจารย์"
  ].sort((a, b) => a.localeCompare(b, 'th'));

  facultyOptions: string[] = Object.keys(this.facultyMap);

  onSubmit() {
    if(this.selectedUser.faculty === '' || this.selectedUser.field_study === '' || this.selectedUser.position === '' || this.selectedUser.position_work === ''){
      Swal.fire({
        icon: 'error',
        title: 'กรุณากรอกข้อมูลให้ครบถ้วน',
        text: 'กรุณาเลือกคณะ สาขาวิชา ตำแหน่ง และตำแหน่งงาน',
      });
      return;
    }
    else {
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
            console.log(this.selectedUser);
            this.userService.createUser(this.selectedUser).subscribe({
              next: (res) => {
                Swal.fire(
                  'บันทึกแล้ว!',
                  'บันทึกข้อมูลเรียบร้อย',
                  'success'
                ).then(() => {
                  this.router.navigate(['/NPU/home']);
                });
              },
            });
          }
        });
    }
    
  }
}
