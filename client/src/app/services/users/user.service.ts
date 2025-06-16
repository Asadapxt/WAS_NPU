import { HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient, private authService: AuthService) {}

  createUser(user: any) {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.post<any>(`${this.apiUrl}/user`, user, { headers });
  }

  getUsers(): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<any>(`${this.apiUrl}/users`, { headers });
  }

  getSSOUser(): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<any>(`${this.apiUrl}/sso-user`, { headers });
  }

  getUserById(userId: string): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<any>(`${this.apiUrl}/users/${userId}`, { headers });
  }

  updateUser(user: any) {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.put<any>(`${this.apiUrl}/users/${user.id}`, user, { headers });
  }

  checkMasterId(masterId: number) {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.post<{ exists: boolean }>(`${this.apiUrl}/user/check-master-id`, { master_id: masterId}, { headers });
  }

  searchUsers(name: string, faculty: string) {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    let params = new HttpParams();
    if (name) params = params.set('name', name);
    if (faculty) params = params.set('faculty', faculty);

    return this.http.get<any[]>(`${this.apiUrl}/search-users`, { params, headers });
  }
}
