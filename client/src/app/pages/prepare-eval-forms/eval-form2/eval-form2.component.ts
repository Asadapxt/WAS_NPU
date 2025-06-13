import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { THSarabunNewNormal } from '../../../utils/THSarabunNew';
import { THSarabunNewBold } from '../../../utils/THSarabunNew-bold';
import { jsPDF } from 'jspdf'
import { autoTable } from 'jspdf-autotable'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-eval-form2',
  imports: [CommonModule, FormsModule],
  templateUrl: './eval-form2.component.html',
  styleUrl: './eval-form2.component.css'
})
export class EvalForm2Component {
  constructor(private titleService: Title) {
    this.titleService.setTitle(
      'จัดทำแบบรายงานผลการปฏิบัติราชการของพนักงานในมหาวิทยาลัยนครพนม (ป-ว 02)'
    );
  }

  autoResize(textArea: HTMLTextAreaElement) {
    textArea.style.height = 'auto';
    textArea.style.height = textArea.scrollHeight + 'px';
  }

  examplePdf() {
    const pdfUrl = 'files/ตัวอย่างการจัดทำแบบ ป-ว 02.pdf';
    window.open(pdfUrl, '_blank');
  }

  username: string = 'ผศ.ดร.อัษฎา ปรีชาเจริญกิจ';

  confirm_active: boolean = false;
  toggle_confirmAct() {
    this.confirm_active = !this.confirm_active;
    console.log(this.confirm_active);  
  }

  //#region ฟังก์ชัน PDF
  @ViewChild('table1', { static: false }) table1!: ElementRef;
  previewPdf(): void {
    const doc = new jsPDF({
      orientation: 'landscape', // portrait แนวตั้ง, landscape แนวนอน
      unit: 'mm',
      format: 'a4'
    });

    // โหลดฟอนต์
    doc.addFileToVFS('THSarabunNew.ttf', THSarabunNewNormal);
    doc.addFont('THSarabunNew.ttf', 'THSarabunNew', 'normal');

    doc.addFileToVFS('THSarabunNew-Bold.ttf', THSarabunNewBold);
    doc.addFont('THSarabunNew-Bold.ttf', 'THSarabunNew', 'bold');

    // ตั้งค่า (มิลลิเมตร)
    const marginLeft = 25;
    const marginTop = 20;
    const lineSpacing = 14; // ~1.5 เท่าของฟอนต์ 16 pt
    let y = marginTop;
    const pageWidth = doc.internal.pageSize.getWidth();
    const centerX = pageWidth / 2;

    // หัวเอกสาร
    doc.setFont('THSarabunNew', 'bold');
    doc.setFontSize(16);
    doc.text('แบบ ป-ว 02', pageWidth - marginLeft/2 , marginTop, { align: 'right' });
    y += lineSpacing/2;
    
    doc.text('แบบรายงานผลการปฏิบัติราชการของพนักงานในมหาวิทยาลัยนครพนม ประเภทวิชาการ', centerX, y, { align: 'center' });
    y += lineSpacing/2;

    doc.text('ปีงบประมาณ .............', centerX, y, { align: 'center' });
    y += lineSpacing/2;

    doc.text('ตั้งแต่วันที่ 1 ตุลาคม พ.ศ. 2568 ถึงวันที่ 30 กันยายน พ.ศ. 2569', centerX, y, { align: 'center' });
    y += lineSpacing;

    doc.text('ครั้งที่ 1 วันที่ 1 ตุลาคม พ.ศ. 2568 ถึงวันที่ 30 กันยายน พ.ศ. 2569', marginLeft * 2, y);
    y += lineSpacing/2;

    doc.text('ครั้งที่ 2 วันที่ 1 ตุลาคม พ.ศ. 2568 ถึงวันที่ 30 กันยายน พ.ศ. 2569', marginLeft * 2, y);
    y += lineSpacing*2;

    // เนื้อหา
    doc.text('(นาย /นาง /นางสาว) ชาญวิช สุวรรณพงศ์', marginLeft, y);
    y += lineSpacing/2;

    doc.text('ตำแหน่ง ผู้ช่วยศาสตราจารย์', marginLeft, y);
    y += lineSpacing/2;

    doc.text('หลักสูตร วิศวกรรมศาสตรบัณฑิต สาขาวิชาวิศวกรรมคอมพิวเตอร์', marginLeft, y);
    y += lineSpacing/2;

    doc.text('ภาควิชา .............................................', marginLeft, y);
    y += lineSpacing*4;

    doc.text('คณะ วิศวกรรมศาสตร์', centerX, y, { align: 'center' });
    y += lineSpacing/2;

    doc.text('มหาวิทยาลัยนครพนม', centerX, y, { align: 'center' });
    y += lineSpacing/2;

    doc.addPage();
    y = marginTop;

    doc.text('ส่วนที่ 1 ข้อมูลทั่วไป', marginLeft, y);
    y += lineSpacing/2;

    doc.text('1.1 ข้อมูลการลาในรอบการประเมิน', marginLeft+12, y);
    y += lineSpacing/2;

    doc.text('ขาดราชการ - วัน', marginLeft+24, y);
    y += lineSpacing/2;

    doc.text('มาปฏิบัติราชการสาย - วัน', marginLeft+24, y);
    y += lineSpacing/2;

    doc.text('ลาป่วย - วัน', marginLeft+24, y);
    y += lineSpacing/2;

    doc.text('ลากิจ - วัน', marginLeft+24, y);
    y += lineSpacing/2;

    doc.text('ลาพักผ่อน - วัน', marginLeft+24, y);
    y += lineSpacing;

    doc.text('1.2 ข้อมูลการได้รับรางวัล การยกย่องเชิดชู ในรอบการประเมิน', marginLeft+12, y);
    y += lineSpacing/2;

    doc.addPage();
    y = marginTop;

    doc.text('ส่วนที่ 2 ข้อมูลภาระงานตามข้อตกลง (TOR)', marginLeft, y);
    y += lineSpacing/2;


    // แสดง PDF
    const pdfBlob = doc.output('blob');
    const pdfUrl = URL.createObjectURL(pdfBlob);
    window.open(pdfUrl);
  }

  // #region ดึงเวลาปัจจุบัน
  date = new Date();
  day = this.date.getDate();
  month = this.date.getMonth() + 1;
  year = new Date().getFullYear() + 543;

  users = [
    { name: 'อัษฎา ปรีชาเจริญกิจ', faculty: 'วิศวกรรมศาสตร์', field_study: 'วิศวกรรมคอมพิวตอร์', position: 'ผู้ช่วยศาสตราจารย์'},
  ];

  // #region ตัวแปรเก็บค่า
  awards: string[] = [];
  order_Univers: string[] = [];
  order_Faculty: string[] = [];
  order_files: File[] = [];
  teachFiles: File[] = [];
  researchFiles: File[] = [];
  acadSvcFiles: File[] = [];
  research_extFiles: File[] = [];


  // #region ฟังก์ชันเพิ่ม
  addAward() {
    this.awards.push('');
    console.log(this.awards);
  }

  addOrder_Univers() {
    this.order_Univers.push('');
    console.log(this.order_Univers);
  }

  addOrder_Faculty() {
    this.order_Faculty.push('');
    console.log(this.order_Faculty);
  }

  add_teachFile(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const newFiles = Array.from(input.files);
      this.teachFiles = [...this.teachFiles, ...newFiles];

      input.value = '';
    }
  }

  add_researchFile(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const newFiles = Array.from(input.files);
      this.researchFiles = [...this.researchFiles, ...newFiles];

      input.value = '';
    }
  }

  add_acadFile(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const newFiles = Array.from(input.files);
      this.acadSvcFiles = [...this.acadSvcFiles, ...newFiles];

      input.value = '';
    }
  }

  add_research_extFile(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const newFiles = Array.from(input.files);
      this.research_extFiles = [...this.research_extFiles, ...newFiles];

      input.value = '';
    }
  }

  add_OrderFile(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const newFiles = Array.from(input.files);
      this.order_files = [...this.order_files, ...newFiles];

      input.value = '';
    }
  }
  
  trackByIndex(index: number, item: string): number { return index; }

  // #region ฟังก์ชันลบ
  rm_Award(index: number) {this.awards.splice(index, 1);}
  rm_OrderUnivers(index: number) {this.order_Univers.splice(index, 1);}
  rm_OrderFaclty(index: number) {this.order_Faculty.splice(index, 1);}
  rm_OrderFile(index: number) {this.order_files.splice(index, 1);}
  rm_teach(index: number): void { this.teachFiles.splice(index, 1); }
  rm_research(index: number): void { this.researchFiles.splice(index, 1); }
  rm_acad(index: number): void { this.acadSvcFiles.splice(index, 1); }
  rm_researchExt(index: number): void { this.research_extFiles.splice(index, 1); }

  // #region ฟังก์ชันบันทึก
  onSubmit() {
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
            Swal.fire(
              'บันทึกแล้ว!',
              'แก้ไขข้อมูลเรียบร้อย',
              'success'
            ).then(() => {
              window.location.reload();
            });
          }
      });
      console.log();
    }
  
}
