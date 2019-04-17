import { Component, OnInit, OnDestroy } from '@angular/core';
import IUser from 'src/app/core/interfaces/IUser';
import { UserService } from 'src/app/core/services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  user: IUser;
  authSubscription: Subscription;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.authSubscription = this.userService.get().subscribe(response => {
      this.user = response;
    });
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

}
