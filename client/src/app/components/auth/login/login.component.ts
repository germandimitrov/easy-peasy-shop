import { Component, OnInit } from '@angular/core';
import LoginModel from '../../../models/LoginModel';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: LoginModel;

  constructor(private authService: AuthService, private router: Router) {
    this.model = new LoginModel('', '');
  }

  ngOnInit() {
  }

  handleSubmit() {
    this.authService.login(this.model).subscribe(response => {
      const { user, token } = response;
      this.authService.authenticate(user, token);
      this.router.navigate(['/']);
    }, error => console.log(error));
  }

}
