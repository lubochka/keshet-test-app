import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private token: string | null = null;
  private tokenKey = 'token';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<void> {
    return this.http.post<{ access_token: string }>('http://localhost:3000/api/login', { username, password })
      .pipe(
        tap(res => {
          this.token = res.access_token;
          console.log(res.access_token)
          localStorage.setItem('token', res.access_token);
          console.log(localStorage.getItem('token'))
        }),
        map(() => void 0)
      );
  }

  getToken(): string | null {
      console.log(localStorage.getItem('token'))
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return this.getToken()!==null && this.getToken()!==undefined;
  }

  logout() {
    this.token = null;
    localStorage.removeItem('token')
      console.log(localStorage.getItem('token'))
  }
}
