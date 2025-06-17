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
    // console.log('token:', token);
    

    if (token) {
      this.auth.setToken(token);

      this.userService.getSSOUser().subscribe({
        next: (res) => {
          const userData = res.sso_user.data.user;
          // console.log(userData);

          // ตรวจสอบ master_id ว่ามีในฐานข้อมูลไหม
          this.userService.checkMasterId(userData.id).subscribe({
            next: (res) => {
              if (!res.exists) {
                // console.log('ยังไม่มี master_id นี้ในระบบ', res.exists);
                this.router.navigate(['/register']);
              } 
              else 
              {
                // console.log('มี master_id นี้แล้ว');
                this.router.navigate(['/NPU/home']);
              }
            },
            error: (err) => {
              console.error('เกิดข้อผิดพลาดในการเช็ค master_id:', err);
            }
          });
        },
        error: (err) => {
          console.error('โหลดข้อมูล SSO ไม่สำเร็จ:', err);
        }
      });
    }
  }

}
