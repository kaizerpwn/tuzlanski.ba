import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    this.errorMessage = null;

    if (this.loginForm.valid) {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;

      this.usersService.login(email, password).subscribe(
        (response: any) => {
          if (response.message === 'Uspješno ste se prijavili.') {
            this.router.navigate(['/admin']);
            this.authService.login();
          } else {
            this.errorMessage =
              response.message || 'Prijava nije uspjela. Pokušajte ponovo.';
          }
        },
        (error) => {
          console.error('Login failed', error);
          this.errorMessage = 'Došlo je do greške. Molimo pokušajte ponovo.';
        }
      );
    } else {
      this.errorMessage =
        'Molimo popunite formu ispravno prije nego što nastavite.';
    }
  }
}
