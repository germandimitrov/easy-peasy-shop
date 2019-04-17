import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService } from 'src/app/core/services/order.service';
import { Subscription, Observable } from 'rxjs';
import IOrder from 'src/app/core/interfaces/IOrder';


enum Status {
  Unprocessed = 1,
  Processed = 2
}

@Component({
  selector: 'app-orders-admin',
  templateUrl: './orders-admin.component.html',
  styleUrls: ['./orders-admin.component.css']
})

export class OrdersAdminComponent implements OnInit, OnDestroy {

  ordersSubscription: Subscription;
  orders$: Observable<IOrder[]>;
  orderStatus = Status;

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.orders$ = this.orderService.get();
  }

  processOrder(orderId: number) {
    this.ordersSubscription = this.orderService.updateStatus(orderId, {status: this.orderStatus.Processed}).subscribe(_ => this.loadOrders());
  }

  ngOnDestroy() {
    if (this.ordersSubscription) {
      this.ordersSubscription.unsubscribe();
    }
  }
}
