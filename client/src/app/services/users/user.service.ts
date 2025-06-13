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

  getUsers(): Observable<any> {
    const token = this.authService.getToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<any>(`${this.apiUrl}/users`, { headers });
  }

  getUserById(userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users/${userId}`);
  }

  updateUser(user: any) {
    return this.http.put<any>(`${this.apiUrl}/users/${user.id}`, user);
  }

  searchUsers(name: string, faculty: string) {
    let params = new HttpParams();
    if (name) params = params.set('name', name);
    if (faculty) params = params.set('faculty', faculty);

    return this.http.get<any[]>(`${this.apiUrl}/search-users`, { params });
  }
}
