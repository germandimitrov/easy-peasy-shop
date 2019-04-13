import { Component, OnInit } from '@angular/core';
import IUser from 'src/app/core/interfaces/IUser';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: IUser;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.get().subscribe(response => {
      this.user = response;
      console.log(this.user);
    });
  }

}
