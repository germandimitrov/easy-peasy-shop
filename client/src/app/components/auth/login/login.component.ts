import { Component, OnInit, OnDestroy } from '@angular/core';
import LoginModel from '../../../models/LoginModel';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit, OnDestroy {

  authSubscription: Subscription;
  model: LoginModel;

  constructor(private authService: AuthService, private router: Router) {
    this.model = new LoginModel('', '');
  }

  ngOnInit() {
  }

  handleSubmit() {
    this.authSubscription = this.authService.login(this.model).subscribe(response => {
      const { user, token } = response;
      this.authService.authenticate(user, token);
      this.router.navigate(['/']);
    }, error => console.log(error));
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

}
