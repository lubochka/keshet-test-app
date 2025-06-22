import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private token: string | null = null;
  private tokenKey = 'token';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<void> {
    return this.http.post<{ token: string }>('http://localhost:3000/api/login', { username, password })
      .pipe(
        tap(res => {
          this.token = res.token;
          sessionStorage.setItem(this.tokenKey, res.token);
        }),
        map(() => void 0)
      );
  }

  getToken(): string | null {
    return this.token || sessionStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout() {
    this.token = null;
    sessionStorage.removeItem(this.tokenKey);
  }
}
