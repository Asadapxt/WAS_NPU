import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Router, RouterOutlet, RouterModule, NavigationEnd } from '@angular/router';
import { NgClass } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  imports: [RouterOutlet, RouterModule, NgClass],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  //Detect click event
  sidebarActive: boolean = false;

  @ViewChild('sidebar') sidebar!: ElementRef;
  @ViewChild('toggleButton') toggleButton!: ElementRef;

  onToggleSidebar() {
    this.sidebarActive = !this.sidebarActive;
    console.log('Sidebar toggled:', this.sidebarActive);
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
        const clickedInsideSidebar = this.sidebar?.nativeElement?.contains(
            event.target
        );
        const clickedToggleButton = this.toggleButton?.nativeElement?.contains(
            event.target
        );

        if (!clickedInsideSidebar && !clickedToggleButton) {
            this.sidebarActive = false;
            // console.log('Click outside — sidebar closed.');
        }
    }
  
    // Detect route changes
    constructor(private router: Router) {
      this.router.events
        .pipe(filter((event: any) => event instanceof NavigationEnd))
        .subscribe((event: NavigationEnd) => {
          console.log('Route changed to:', event.urlAfterRedirects);
          this.sidebarActive = false;
        });
    }
}
