import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Router, RouterOutlet, RouterModule, NavigationEnd } from '@angular/router';
import { NgClass, CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { UserService } from '../../services/users/user.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterOutlet, RouterModule, NgClass, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  // Detect route changes
  constructor(private router: Router, private userService: UserService) {
    this.router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        console.log('Route changed to:', event.urlAfterRedirects);
        this.sidebarActive = false;
      });
  }

  ngOnInit() {
    this.userService.currentUser().subscribe({
      next: (res) => {
        // console.log('role', res.user.role);
        this.role = res.user.role;
      }
    })
  }

  //Detect click event

  @ViewChild('sidebar') sidebar!: ElementRef;
  @ViewChild('toggleButton') toggleButton!: ElementRef;
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
  sidebarActive: boolean = false;  
  role: string = '';

  onToggleSidebar() {
    this.sidebarActive = !this.sidebarActive;
    console.log('Sidebar toggled:', this.sidebarActive);
  }
}
