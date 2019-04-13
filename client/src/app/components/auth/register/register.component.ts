import { Component, OnInit } from '@angular/core';
import RegisterModel from '../../../models/RegisterModel';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  model: RegisterModel;
  hasError: boolean;

  constructor(private auth: AuthService) {
    this.model = new RegisterModel('', '', '', 0);
  }

  ngOnInit() {
  }

  handleSubmit() {
    this.auth.register(this.model).subscribe(
      res => console.log(res),
      e => {
        this.hasError = true;
        console.log(e.error);
      }
    );
  }

}
