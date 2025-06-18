import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from '../../services/users/user.service';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

//ตรวจว่า role ไหนเข้าถึง path ไม่ได้
export function roleGuard(blockRoles: string[]): CanActivateFn {
  return (): Observable<boolean> => {
    const userService = inject(UserService);
    const router = inject(Router);

    return userService.currentUser().pipe(
      map(item => {
        if (blockRoles.includes(item.user.role)) {
          console.log('User role is not allowed:', item.user.role);
          router.navigate(['/NPU/home']);
          return false;
        } 
        else {
          return true;
        }
      }),
      catchError((error) => {
        router.navigate(['/login']);
        console.log(error);
        
        return of(false);
      })
    );
  };
}
