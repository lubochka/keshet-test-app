import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../core/auth.service';
import { Router } from '@angular/router';
import { HeaderComponent } from '../components/header/header.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
    standalone: true,
  imports: [FormsModule,CommonModule,HeaderComponent],
  
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  
})
export class LoginComponent {
username = '';
  password = '';
  error: string | null = null;

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit() {
    this.error = null;
    this.auth.login(this.username, this.password).subscribe({
      next: () => this.router.navigate(['/invoices']),
      error: err => this.error = 'Login failed: ' + (err.error?.message || err.message)
    });
  }
}
