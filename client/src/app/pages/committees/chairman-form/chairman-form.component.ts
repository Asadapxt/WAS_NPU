import { Component, ViewChild, ElementRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { THSarabunNewNormal } from '../../../utils/THSarabunNew';
import { THSarabunNewBold } from '../../../utils/THSarabunNew-bold';
import { jsPDF } from 'jspdf'
import { autoTable } from 'jspdf-autotable'

@Component({
  selector: 'app-chairman-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './chairman-form.component.html',
  styleUrl: './chairman-form.component.css'
})
export class ChairmanFormComponent {
  constructor(private titleService: Title) {
    this.titleService.setTitle("ลงคะแนนการประเมิน");
  }

  year = new Date().getFullYear() + 543;

  users = [
    { name: 'ดร.อัษฎา ปรีชาเจริญกิจ', faculty: 'วิศวกรรมศาสตร์', position: 'ผู้ช่วยศาสตราจารย์', status: 1},
  ];

    //#region ฟังก์ชัน PDF
  @ViewChild('table1', { static: false }) table1!: ElementRef;
  previewPdf(): void {
    const doc = new jsPDF({
      orientation: 'portrait', // portrait แนวตั้ง, landscape แนวนอน
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
    doc.text('แบบ ป-ว 03', pageWidth - marginLeft/2 , marginTop, { align: 'right' });
    y += lineSpacing/2;
    
    doc.text('แบบสรุปประเมินผลการปฏิบัติงานของพนักงานมหาวิทยาลัย ประเภทวิชาการ', centerX, y, { align: 'center' });
    y += lineSpacing/2;

    doc.text('โดยคณะกรรมการประเมินผลการปฏิบัติงาน', centerX, y, { align: 'center' });
    y += lineSpacing/2;

    doc.text('****************************', centerX, y, { align: 'center' });
    y += lineSpacing;

    doc.text('ส่วนที่ 1 ข้อมูลของผู้รับการประเมิน', marginLeft, y);
    y += lineSpacing;

    doc.setFont('THSarabunNew', 'normal');
    doc.text('ครั้งที่ 1 วันที่ 1 ตุลาคม พ.ศ. 2568 ถึงวันที่ 30 กันยายน พ.ศ. 2569', marginLeft+12, y);
    y += lineSpacing/2;

    doc.text('ครั้งที่ 2 วันที่ 1 ตุลาคม พ.ศ. 2568 ถึงวันที่ 30 กันยายน พ.ศ. 2569', marginLeft+12, y);
    y += lineSpacing;

    // เนื้อหา
    doc.text('ชื่อผู้รับการประเมิน ดร.ชาญวิช สุวรรณพงศ์ ตำแหน่ง/ระดับ ผู้ช่วยศาสตราจารย์ สังกัด คณะวิศวกรรมศาสตร์', marginLeft, y);
    y += lineSpacing/2;

    // ข้อมูลตาราง
    const headers = [['สรุปภาระงาน', 'คะแนนเต็ม', 'คะแนนประเมิน']];
    const body = [
      ['1. ผลสัมฤทธิ์ของงาน', '', ''],
      ['1.1 ภาระงานสอน ', '35', ''],
      ['1.2 ภาระงานวิจัย', '35', ''],
      ['1.3 ภาระงานบริการวิชาการ', '20', ''],
      ['คะแนนผลสัมฤทธิ์', '100', ''],
      ['ผลประเมินผลสัมฤทธิ์ (ผลรวมคะแนนผลสัมฤทธิ์ ÷ ด้วย 2)', '50', ''],
      ['2. การประเมินการมีส่วนร่วมระดับหน่วยงานและมหาวิทยาลัย', '10', ''],
      ['ผลประเมินการมีส่วนร่วมระดับหน่วยงานและมหาวิทยาลัย', '10', ''],
      ['รวมคะแนนทั้งสิ้น (1+2)', '10', ''],
    ];

    autoTable(doc, {
      head: headers,
      body: body,
      startY: y,
      styles: {
        font: 'THSarabunNew',
        fontSize: 14,
        cellPadding: 3,
        halign: 'left',
        valign: 'middle',
        lineColor: [0, 0, 0],
        lineWidth: 0.2,
        textColor: [0, 0, 0],
      },
      headStyles: {
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0],
        fontStyle: 'bold',
        halign: 'center',
      },
      alternateRowStyles: {
        fillColor: [255, 255, 255],
      },
      margin: { left: 20, right: 20 },
      columnStyles: {
        0: { cellWidth: pageWidth * 0.60 - 12 }, // 60% ของตาราง
        1: { cellWidth: pageWidth * 0.20 - 12 },
        2: { cellWidth: pageWidth * 0.20 - 12 }
      },
      didParseCell: function (data) {
        // ทำให้คอลัมน์ index 1 เป็นตัวหนา
        if (data.row.index === 0 || data.row.index === 6) {
          data.cell.styles.fontStyle = 'bold';
        }
        if (data.column.index > 0) {
          data.cell.styles.halign = 'center';
          data.cell.styles.fontStyle = 'bold';
        }
        if (data.row.index >= 4 && data.row.index < 6) {
          data.cell.styles.halign = 'center';
        }
        if (data.row.index > 6) {
          data.cell.styles.halign = 'center';
        }
        
      }
    });


    // แสดง PDF
    const pdfBlob = doc.output('blob');
    const pdfUrl = URL.createObjectURL(pdfBlob);
    window.open(pdfUrl);
  }
}
