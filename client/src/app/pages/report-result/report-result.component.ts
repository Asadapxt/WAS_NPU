import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-report-result',
  imports: [CommonModule, FormsModule],
  templateUrl: './report-result.component.html',
  styleUrl: './report-result.component.css'
})
export class ReportResultComponent {
    constructor(private titleService: Title) {
      this.titleService.setTitle("แจ้งผลการประเมิน (ปว-04)");
    }
  
    ngOnInit() {
      this.updatePagedData();
      
    }
  
    // ข้อมูล
    teachers = [  
      { no: 1, name: 'รศ.ดร.อัษฎา ปรีชาเจริญกิจ', faculty: 'วิศวกรรมศาสตร์', position: 'คณบดี', status: 0, score: 100, grade:'A', upload_path: ''},
      { no: 2, name: 'อ.ดร.สมชาย ใจดี', faculty: 'ศิลปศาสตร์', position: 'คณบดี', status: 0, score: 88, grade:'B', upload_path: ''},
      { no: 3, name: 'ผศ.ดร.สุดา ศรีสุข', faculty: 'ครุศาสตร์', position: 'รองคณบดี', status: 1, score: 55, grade:'C', upload_path: ''},
      { no: 3, name: 'ผศ.ดร.สุดา ศรีสุข', faculty: 'ครุศาสตร์', position: 'อาจารย์', status: 1, score: 42, grade:'D', upload_path: ''},
      { no: 3, name: 'ผศ.ดร.สุดา ศรีสุข', faculty: 'ครุศาสตร์', position: 'รองคณบดี', status: 1, score: 43, grade:'F', upload_path: ''},
      { no: 3, name: 'ผศ.ดร.สุดา ศรีสุข', faculty: 'ครุศาสตร์', position: 'อาจารย์', status: 1, score: 57, grade:'D', upload_path: ''},
      { no: 3, name: 'ผศ.ดร.สุดา ศรีสุข', faculty: 'ครุศาสตร์', position: 'รองคณบดี', status: 1, score: 48, grade:'A', upload_path: ''},
      { no: 3, name: 'ผศ.ดร.สุดา ศรีสุข', faculty: 'ครุศาสตร์', position: 'อาจารย์', status: 1, score: 25, grade:'A', upload_path: ''},
      { no: 3, name: 'ผศ.ดร.สุดา ศรีสุข', faculty: 'ครุศาสตร์', position: 'รองคณบดี', status: 1, score: 22, grade:'C', upload_path: ''},
      { no: 3, name: 'ผศ.ดร.สุดา ศรีสุข', faculty: 'ครุศาสตร์', position: 'อาจารย์', status: 1, score: 77, grade:'A', upload_path: ''},
      { no: 3, name: 'ผศ.ดร.สุดา ศรีสุข', faculty: 'ครุศาสตร์', position: 'รองคณบดี', status: 1, score: 76, grade:'B', upload_path: ''},
      { no: 3, name: 'ผศ.ดร.สุดา ศรีสุข', faculty: 'ครุศาสตร์', position: 'อาจารย์', status: 1, score: 85, grade:'C', upload_path: ''},
      { no: 3, name: 'ผศ.ดร.สุดา ศรีสุข', faculty: 'ครุศาสตร์', position: 'รองคณบดี', status: 1, score: 42, grade:'B', upload_path: ''},
      { no: 3, name: 'ผศ.ดร.สุดา ศรีสุข', faculty: 'ครุศาสตร์', position: 'อาจารย์', status: 1, score: 23, grade:'A', upload_path: ''},
    ];
    
    // เปลี่ยนหน้าตาราง
    pagedData: any[] = [];
    currentPage: number = 1;
    pageSize: number = 15;
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
  
    //อัปโหลดฟอร์ม
    showModal: boolean = false;
    showFormUpload: boolean = false;
    confirmPopup: boolean = false;
  
    openUploadForm() {
      this.showModal = true;
    }
    
    closeUploadForm() {
      this.selectedFiles = [];
      this.selectedGrade = '';
      this.score = undefined
      this.showModal = false;
    }

    grade: string = '';
    score: number | undefined
    openFormUpload(grade: string, score: number) {
      this.showFormUpload = true;
      this.grade = grade;
      this.score = score
    }

    closeFormUpload() {
      this.showFormUpload = false;
    }
    
    // เตรียมไฟล์ที่จะอัปโหลด
    selectedFiles: File[] = [];
  
    onFileSelected(event: Event): void {
      const input = event.target as HTMLInputElement;
  
      if (input.files && input.files.length > 0) {
        const file = input.files[0];
    
        if (file.type !== 'application/pdf') {
          alert('กรุณาเลือกไฟล์ PDF เท่านั้น');
          input.value = '';
          return;
        }
        this.selectedFiles = [file];
        input.value = '';
      }
    }
  
    removeFile(index: number): void {
      this.selectedFiles.splice(index, 1);
    }
  
    // ตรวจข้อมูลในฟอร์ม
    selectedGrade: string = '';
    submit(form: NgForm) {
        if (form.invalid || this.selectedFiles.length === 0) {
            Swal.fire({
                icon: 'error',
                title: 'ข้อมูลไม่ครบถ้วน',
                text: 'กรุณากรอกข้อมูลให้ครบถ้วน และอัปโหลดไฟล์ PDF',
            });
            return;
        }
        else {
            this.openConfirm();
        }
    }
  
    openConfirm() {
      this.confirmPopup = true;
      Swal.fire({
        title: 'คุณแน่ใจหรือไม่?',
        text: "ต้องการอัปโหลดไฟล์หรือไม่",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'บันทึก',
        cancelButtonText: 'ยกเลิก',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
  
          Swal.fire(
            'อัปโหลดแล้ว!',
            'อัปโหลดไฟล์เรียบร้อย',
            'success'
          );
          this.showModal = false;
          this.selectedFiles = [];
          this.selectedGrade = '';
          this.score = undefined
        }
      });
    }

}
