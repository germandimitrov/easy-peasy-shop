import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-orders-user',
  templateUrl: './orders-user.component.html',
  styleUrls: ['./orders-user.component.css']
})
export class OrdersUserComponent implements OnInit {

  orders$: Observable<any[]>;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.orders$ = this.userService.getUserOrders();
  }

}
