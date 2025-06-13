import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-appel',
  imports: [CommonModule],
  templateUrl: './appeal.component.html',
  styleUrl: './appeal.component.css',
})
export class AppealComponent {
  constructor(private titleService: Title) {
    this.titleService.setTitle("ยื่นอุทธรณ์");
  }

  // เปลี่ยนหน้าหัวข้อ
  activeTab: string = 'new-appeal';

  setTab(tab: string) {
    this.activeTab = tab;
  }

  // เลือกอัปโหลดไฟล์
  selectedFiles: File[] = [];

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const newFiles = Array.from(input.files);
      this.selectedFiles = [...this.selectedFiles, ...newFiles];

      // เคลียร์ input เพื่อให้เลือกไฟล์ซ้ำได้
      input.value = '';
    }
  }

  removeFile(index: number): void {
    this.selectedFiles.splice(index, 1);
  }
}
