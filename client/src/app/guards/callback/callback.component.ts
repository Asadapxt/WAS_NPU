import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { UserService } from '../../services/users/user.service';

@Component({
  selector: 'app-callback',
  imports: [],
  templateUrl: './callback.component.html',
  styleUrl: './callback.component.css'
})
export class CallbackComponent {

  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private router: Router,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    const token = this.route.snapshot.queryParamMap.get('token');
    if (token) {
      this.auth.setToken(token);

      // เรียก API users
      this.userService.getUsers().subscribe({
        next: (userData) => {
          const status = userData?.register_status;
          
          if (status === 1) {
            this.router.navigate(['/NPU/home']);
          } 
          else {
            this.router.navigate(['/register']);
          }
        },
        error: (err) => {
          console.error('เกิดข้อผิดพลาดในการโหลดข้อมูลผู้ใช้', err);
          alert('ไม่สามารถโหลดข้อมูลผู้ใช้');
          this.router.navigate(['/']);
        }
      });
    } 
    else {
      alert('ไม่พบ token');
      this.router.navigate(['/']);
    }
  }

}
