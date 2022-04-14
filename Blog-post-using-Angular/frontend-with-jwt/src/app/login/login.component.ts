import { Component, OnInit } from '@angular/core';
import User from '../User';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import e from 'express';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public user: User = new User();
  public warning: string = '';
  subscribe: any = [];

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit(f: NgForm): void {
    if (!this.user.password || !this.user.userName) {
      this.warning =
        'Please enter your ' + (this.user.password ? 'username' : 'password');
      return;
    } else {
      this.subscribe = this.auth.login(this.user).subscribe(
        (success) => {
          // store the returned token
          this.auth.setToken(success.token);
          // redirect to the "admin" route
          this.router.navigate(['/admin']);
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
