import { Component, OnInit } from '@angular/core';
import RegisterModel from '../../../models/RegisterModel';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  authSubscription: Subscription;
  model: RegisterModel;
  hasError: boolean;

  constructor(private auth: AuthService, private router: Router, private authService: AuthService) {
    this.model = new RegisterModel('', '', '');
  }

  ngOnInit() {
  }

  handleSubmit() {
    this.authSubscription = this.auth.register(this.model).subscribe(
      (response) => {
        const { user, token } = response;
        this.authService.authenticate(user, token);
        this.router.navigate(['/']);
      },
      (e) => {
        this.hasError = true;
        console.log(e.error);
      }
    );
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

}
