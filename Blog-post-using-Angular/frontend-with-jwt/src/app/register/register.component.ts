import { Component, OnInit } from '@angular/core';
import User from '../User';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public user: User = new User();
  public warning: string = '';
  subscribe: any = [];

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit(f: NgForm): void {
    if (
      !this.user.fullName ||
      !this.user.userName ||
      !this.user.password ||
      !this.user.role ||
      !this.user.password2
    ) {
      this.warning = 'Please enter all fields';
      return;
    } else {
      this.subscribe = this.auth.register(this.user).subscribe(
        (success) => {
          // store the returned token
          this.auth.setToken(success.token);
          // redirect to the "login" route
          this.router.navigate(['/login']);
        },
        (err) => {
          this.warning = err.error.message;
        }
      );
    }
  }

  ngOnDestroy(): void {
    if (this.subscribe.length > 0) this.subscribe.unsubscribe();
  }
}
