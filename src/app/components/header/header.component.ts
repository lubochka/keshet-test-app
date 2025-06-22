import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../core/auth.service';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  auth = inject(AuthService);
  get isLoggedIn() { return this.auth.isLoggedIn(); }

  onLogout() {
    this.auth.logout();
    // Optionally, redirect to login or homepage:
    // window.location.href = '/login';
  }
}
