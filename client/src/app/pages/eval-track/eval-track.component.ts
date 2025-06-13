import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-eval-track',
  imports: [CommonModule],
  templateUrl: './eval-track.component.html',
  styleUrl: './eval-track.component.css'
})
export class EvalTrackComponent {
  constructor(private titleService: Title) {
    this.titleService.setTitle("ติดตามผลการประเมิน");
  }

  year = new Date().getFullYear()+543;
  decreaseYear() {
    this.year--;
  }
  increaseYear() {
    this.year++;
  }

  datas: any = {
    2568: [
      { round: 0, status: 0, grade: 'A', score: 80 },
      { round: 1, status: 1, grade: 'B', score: 70 },
      { round: 2, status: 1, grade: 'C', score: 60 },
    ],
    2567: [
      { round: 0, status: 0, grade: 'D', score: 80 },
      { round: 1, status: 1, grade: 'B', score: 70 },
      { round: 2, status: 1, grade: 'F', score: 58 },
    ],
  }

  checkData(year: number) {
    
    if (this.datas[year] && this.datas[year].length > 0) {
      return 1;
    }
    else {
      return 0;
    }
  }

  getData(year: number) {
    return this.datas[year] || [];
  }
}
