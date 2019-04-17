import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { Observable } from 'rxjs';
import IUser from 'src/app/core/interfaces/IUser';
import IOrder from 'src/app/core/interfaces/IOrder';

@Component({
  selector: 'app-orders-user',
  templateUrl: './orders-user.component.html',
  styleUrls: ['./orders-user.component.css']
})
export class OrdersUserComponent implements OnInit {

  orders$: Observable<IOrder[]>;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.orders$ = this.userService.getUserOrders();
  }

}
