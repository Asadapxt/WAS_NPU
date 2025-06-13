import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Teaching, Research, Academic_service, Research_ext  } from '../../../models/eval-form/eval-form1';
import { THSarabunNewNormal } from '../../../utils/THSarabunNew';
import { THSarabunNewBold } from '../../../utils/THSarabunNew-bold';
import { jsPDF } from 'jspdf'
import { autoTable } from 'jspdf-autotable'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-eval-form1',
  imports: [CommonModule, FormsModule],
  templateUrl: './eval-form1.component.html',
  styleUrl: './eval-form1.component.css',
})
export class EvalForm1Component {
  constructor(private titleService: Title) {
    this.titleService.setTitle(
      'จัดทำแบบกำหนดข้อตกลงการปฏิบัติงานของอาจารย์ในมหาวิทยาลัยนครพนม (ป-ว 01)'
    );
  }

  date = new Date();
  day = this.date.getDate();
  month = this.date.getMonth() + 1;
  year = new Date().getFullYear() + 543;

  //#region ฟังก์ชัน PDF
  downloadPdf() {
    const pdfUrl = 'files/เกณฑ์ในการประเมินภาระงาน.pdf';
    window.open(pdfUrl, '_blank');
  }

  examplePdf() {
    const pdfUrl = 'files/ตัวอย่างการจัดทำแบบ ป-ว 01.pdf';
    window.open(pdfUrl, '_blank');
  }

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
    doc.setFontSize(14);
    doc.text('แบบ ป-ว 01', pageWidth - marginLeft/2 , marginTop, { align: 'right' });
    y += lineSpacing/2;
    
    doc.text('แบบกำหนดข้อตกลงการปฏิบัติงานของพนักงานมหาวิทยาลัย ประเภทวิชาการ', centerX, y, { align: 'center' });
    y += lineSpacing/2;

    doc.text('(Term of Reference: TOR)', centerX, y, { align: 'center' });
    y += lineSpacing/2;

    doc.text('ชื่อผู้รับการประเมิน ดร.ชาญวิช สุวรรณพงศ์ ตำแหน่ง/ระดับ ผู้ช่วยศาสตราจารย์', centerX, y, { align: 'center' });
    y += lineSpacing/2;

    doc.text('สังกัด คณะวิศวกรรมศาสตร์ ตั้งแต่วันที่ 1 ตุลาคม พ.ศ. 2567 ถึงวันที่ 30 กันยายน พ.ศ. 2568', centerX, y, { align: 'center' });
    y += lineSpacing;

    // เนื้อหา
    doc.text('คำชี้แจง', marginLeft, y);
    doc.setFont('THSarabunNew', 'normal');
    doc.text('การกำหนดข้อตกลงการปฏิบัติงานของอาจารย์ในมหาวิทยาลัยนครพนม ดังนี้', marginLeft+12, y);
    y += lineSpacing/2;

    doc.text('1. อาจารย์ที่ดำรงตำแหน่งประเภทผู้บริหาร ให้นำภาระงานตามตำแหน่งภาพแทนภาระงานที่ 4 ด้านได้ ดังนี้', marginLeft+24, y);
    y += lineSpacing/2;

    doc.text('(1) ตำแหน่งอธิการบดี รองอธิการบดี คณบดีหรือผู้อำนวยการ ให้มีภาระงานบริหารทดแทนภาระงานตามข้อ 5 ได้ร้อยละ 100 ', marginLeft+36, y);
    y += lineSpacing/2;
    
    doc.text('(2) ผู้ช่วยอธิการบดี รองคณบดี หรือรองหัวหน้าหน่วยงานที่เรียกชื่ออย่างอื่นที่มีฐานะเทียบเท่าคณะ ให้มีภาระงานบริหารทดแทนภาระงานตามข้อ 5 ได้ร้อยละ 50 และให้มี', marginLeft+36, y);
    y += lineSpacing/2;

    doc.text('ภาระงานตามข้อ 5 (1) ถึง ข้อ 5 (4) อีกร้อยละ 50', marginLeft, y);
    y += lineSpacing/2;

    doc.text('2. พนักงานมหาวิทยาลัย สามารถนำภาระงานทั้ง 4 ด้าน มาแทนกันได้ โดยต้องมีภาระงานรวมไม่น้อยกว่าร้อยละ 270 ชั่วโมงภาระงานต่อปีการศึกษา', marginLeft+24, y);
    y += lineSpacing/2;

    doc.setFont('THSarabunNew', 'bold');
    doc.text('---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------', marginLeft, y);
    y += lineSpacing/2;

    doc.text('ส่วนที่ 1 ผลสัมฤทธิ์ของงาน', marginLeft, y);
    y += lineSpacing/2;

    // แสดง PDF
    const pdfBlob = doc.output('blob');
    const pdfUrl = URL.createObjectURL(pdfBlob);
    window.open(pdfUrl);
  }

  confirm_active: boolean = false;
  toggle_confirmAct() {
    this.confirm_active = !this.confirm_active;
    console.log(this.confirm_active);  
  }

  autoResize(textArea: HTMLTextAreaElement) {
    textArea.style.height = 'auto';
    textArea.style.height = textArea.scrollHeight + 'px';
  }

  username: string = 'ผศ.ดร.อัษฎา ปรีชาเจริญกิจ';


  //#region ตรวจการคลิกนอกพื้นที่

  @ViewChild('dropdownCheck') dropdownCheck!: ElementRef;
  @ViewChild('firstDropdownCheck') firstDropdownCheck!: ElementRef;
  @ViewChild('secondDropdownCheck') secondDropdownCheck!: ElementRef;
  @ViewChild('thirdDropdownCheck') thirdDropdownCheck!: ElementRef;
  @ViewChild('fourthDropdownCheck') fourthDropdownCheck!: ElementRef;
  @ViewChild('firstSelect') firstSelect!: ElementRef;
  @ViewChild('secondSelect') secondSelect!: ElementRef;
  @ViewChild('thirdSelect') thirdSelect!: ElementRef;
  @ViewChild('fourthSelect') fourthSelect!: ElementRef;
  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    const dropdownChecked = this.dropdownCheck?.nativeElement?.contains(event.target);
    const firstDropdownChecked = this.firstDropdownCheck?.nativeElement?.contains(event.target);
    const secondDropdownChecked = this.secondDropdownCheck?.nativeElement?.contains(event.target);
    const thirdDropdownChecked = this.thirdDropdownCheck?.nativeElement?.contains(event.target);
    const fourthDropdownChecked = this.fourthDropdownCheck?.nativeElement?.contains(event.target);
    const firstSelected = this.firstSelect?.nativeElement?.contains(event.target);
    const secondSelected = this.secondSelect?.nativeElement?.contains(event.target);
    const thirdSelected = this.thirdSelect?.nativeElement?.contains(event.target);
    const fourthSelected = this.fourthSelect?.nativeElement?.contains(event.target);

    if (!dropdownChecked) { this.dropdownOpen = false; }
    if (!firstDropdownChecked) { this.firstTypeDropdown = false; }
    if (!secondDropdownChecked) { this.secondTypeDropdown = false; }
    if (!thirdDropdownChecked) { this.thirdTypeDropdown = false; }
    if (!fourthDropdownChecked) { this.fourthTypeDropdown = false; }
    if (!firstSelected) { this.firstSelectDropdown = false; }
    if (!secondSelected) { this.secondSelectDropdown = false; }
    if (!thirdSelected) { this.thirdSelectDropdown = false; }
    if (!fourthSelected) { this.fourthSelectDropdown = false; }
  }

  //*************************************************************************************************************
  // First type = Teaching load
  // Second Type = Research workload
  // Third Type = Academic service workload
  // Fourth Type = Research work supported by external funding sources
  //*************************************************************************************************************

  // #region เมนูเลือกภาระงาน
  selectedWorkload: string = '';
  selectWorkload(value: string) {
    this.selectedWorkload = value;
    this.dropdownOpen = false;
    this.addWorkload();
  }

  // #region เพิ่มตารางภาระงาน
  selectedType: string = '';
  selectType(value: string) {
    this.selectedType = value;
    if (this.selectedType.includes('1.')) {
      this.addFirstType();
      this.firstTypeDropdown = false;
    } 
    else if (this.selectedType.includes('2.')) {
      this.addSecondType();
      this.secondTypeDropdown = false;
    } 
    else if (this.selectedType.includes('3.')) {
      this.addThirdType();
      this.thirdTypeDropdown = false;
    }
    else if (this.selectedType.includes('4.')) {
      this.addFourthType();
      this.fourthTypeDropdown = false;
    }
  }

  //#region เช็คสถานะ Dropdown
  dropdownOpen: boolean = false;
  firstTypeDropdown: boolean = false;
  secondTypeDropdown: boolean = false;
  thirdTypeDropdown: boolean = false;
  fourthTypeDropdown: boolean = false;
  firstSelectDropdown: boolean = false;
  secondSelectDropdown: boolean = false;
  thirdSelectDropdown: boolean = false;
  fourthSelectDropdown: boolean = false;

  toggleDropdownByKey(key: 'dropdownOpen' | 'firstTypeDropdown' | 'secondTypeDropdown' | 'thirdTypeDropdown' | 'fourthTypeDropdown' | 'firstSelectDropdown' | 'secondSelectDropdown' | 'thirdSelectDropdown' | 'fourthSelectDropdown') {
    this[key] = !this[key];
    console.log(`${key}:`, this[key]);
  }

  //#region ฟังก์ชันเพิ่ม
  addedWorkloads: string[] = [];
  replace_types: { type: string, replace_type: string[] }[] = [];
  replace_hours: { type: string, replace_hour: number }[] = [];

  teaching: Teaching[] = [];
  research: Research[] = [];
  acadSvc: Academic_service[] = [];
  research_ext: Research_ext[] = [];

  firstSelected: number[] = [];
  secondSelected: number[] = [];
  thirdSelected: number[] = [];
  fourthSelected: number[] = [];

  addWorkload() {
    if (this.selectedWorkload && !this.addedWorkloads.includes(this.selectedWorkload)) {
      this.addedWorkloads.push(this.selectedWorkload);
    }
    this.addedWorkloads.sort((a, b) => parseInt(a) - parseInt(b));
  }

  addReplaceType(workload_type: string, replace_type_id: number) {
    const label = this.getLabelById(replace_type_id);
    if (!label) return;

    const found = this.replace_types.find(thisType => thisType.type === workload_type);

    if (found) {
      if (!found.replace_type.includes(label)) {
        found.replace_type.push(label);
      }
    } 
    else {
      this.replace_types.push({
        type: workload_type,
        replace_type: [label]
      });
    }
    console.log(this.replace_types);
  }

  addFirstType() {
    this.teaching.push({ type: this.selectedType, lecture_hour: 0, practical_hour: 0});
    console.log(this.teaching);
  }

  addSecondType() {
    this.research.push({ type: this.selectedType, workload_hour: 0});
    console.log(this.research);
  }

  addThirdType() {
    this.acadSvc.push({ type: this.selectedType, workload_hour: 0 });
    console.log(this.acadSvc);
  }

  addFourthType() {
    this.research_ext.push({ type: this.selectedType, grant: 0, workload_hour: 0 });
    console.log(this.research_ext);
  }

  addFirstSelect(id: number) {
    if (!this.firstSelected.includes(id)) this.firstSelected.push(id);
  }

  addSecondSelect(id: number) {
    if (!this.secondSelected.includes(id)) this.secondSelected.push(id);
  }

  addThirdSelect(id: number) {
    if (!this.thirdSelected.includes(id)) this.thirdSelected.push(id);
  }

  addFourthSelect(id: number) {
    if (!this.fourthSelected.includes(id)) this.fourthSelected.push(id);
  }

  //#region ฟังก์ชันลบ
  deleteWorkload(index: number, type: string) {
    this.addedWorkloads.splice(index, 1);
    console.log(type);
    console.log(index);

    if (type == '1') {
      this.teaching = [];
    } 
    else if (type == '2') {
      this.research = [];
    } 
    else if (type == '3') {
      this.acadSvc = [];
    }
    else if (type == '4') {
      this.research_ext = [];
    }
  }
  deleteReplaceType(workload_type: string, replace_type_id: number) {
    const label = this.getLabelById(replace_type_id);
    if (!label) return;

    const found = this.replace_types.find(thisType => thisType.type === workload_type);

    if (found) {
      found.replace_type = found.replace_type.filter(l => l !== label);

      if (found.replace_type.length === 0) {
        this.replace_types = this.replace_types.filter(t => t !== found);
      }
    }
    console.log(this.replace_types);
  }
  deleteFirstType(index: number) { this.teaching.splice(index, 1); }
  deleteSecondType(index: number) { this.research.splice(index, 1); }
  deleteThirdType(index: number) { this.acadSvc.splice(index, 1); }
  deleteFourthType(index: number) { this.research_ext.splice(index, 1); }
  deleteFirstSelect(index: number) {this.firstSelected.splice(index, 1);}
  deleteSecondSelect(index: number) {this.secondSelected.splice(index, 1);}
  deleteThirdSelect(index: number) {this.thirdSelected.splice(index, 1);}
  deleteFourthSelect(index: number) {this.fourthSelected.splice(index, 1);}

  //#region ฟังก์ชันดึงข้อมูล
  get first_totalHour(): number {
    return this.teaching.reduce((sum, item) => sum + item.lecture_hour + item.practical_hour, 0);
  }

  get second_totalHour(): number {
    return this.research.reduce((sum, item) => sum + item.workload_hour, 0);
  }

  get third_totalHour(): number {
    return this.acadSvc.reduce((sum, item) => sum + item.workload_hour, 0);
  }

  get fourth_totalHour(): number {
    return this.research_ext.reduce((sum, item) => sum + item.workload_hour, 0);
  }

  getReplaceHour(type: string): { type: string, replace_hour: number } {
    const selectedMap: { [key: string]: number[] } = {
      '1': this.firstSelected,
      '2': this.secondSelected,
      '3': this.thirdSelected,
      '4': this.fourthSelected
    };

    // ถ้าไม่ได้เลือกภาระงานทดแทน
    if (!selectedMap[type] || selectedMap[type].length === 0) {
      return { type, replace_hour: 0 };
    }

    let found = this.replace_hours.find(r => r.type === type);

    if (!found) {
      found = { type, replace_hour: 0 };
      this.replace_hours.push(found);
    }

    return found;
  }

  //ตรวจสอบเมื่อคลิกนอกพื้นที่ Input
  validateReplaceHour(type: string) {
    const obj = this.getReplaceHour(type);
    if (!obj) return;

    if((type == '1' || type == '2') && obj.replace_hour > 270) {
      obj.replace_hour = 270;
    }
    else if (type == '3' && obj.replace_hour > 150) {
      obj.replace_hour = 150;
    } 
    else if (type == '4' && obj.replace_hour > 80) {
      obj.replace_hour = 80;
    } 
    else if (obj.replace_hour < 0 || obj.replace_hour == null) {
      obj.replace_hour = 0;
    }
  }

  checkTotal(type: string, hour: number): number {
    switch (type) {
      case '1':
      case '2':
        return hour >= 270 ? 270 : hour;
      case '3':
        return hour >= 150 ? 150 : hour;
      case '4':
        return hour >= 80 ? 80 : hour;
      default:
        return hour;
    }
  }

  //#region เลือกหมวดหมู่ภาระงานทดแทน
  workloadOptions = [
    { id: 1, label: 'งานสอน' },
    { id: 2, label: 'งานวิจัย' },
    { id: 3, label: 'งานบริการวิชาการ' },
    { id: 4, label: 'งานวิจัยที่ได้รับการสนับสนุนจากแหล่งทุนภายนอกมหาวิทยาลัย' },
  ];

  filterWorkloadOptions(type: number) {
    switch (type) {
      case 1: 
        return this.workloadOptions.filter(w => w.id !== 1);
      case 2:
        return this.workloadOptions.filter(w => w.id !== 2);
      case 3:
        return this.workloadOptions.filter(w => w.id !== 3);
      case 4:
        return this.workloadOptions.filter(w => w.id !== 4);
      default:
        return this.workloadOptions;
    }
  }

  getLabelById(id: number): string | undefined {
    return this.workloadOptions.find(w => w.id === id)?.label;
  }

  // #region ฟังก์ชันยืนยันการส่งข้อมูล
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