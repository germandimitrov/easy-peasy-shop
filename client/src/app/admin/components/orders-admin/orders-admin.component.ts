import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/core/services/order.service';
import { Subscription, Observable } from 'rxjs';


enum Status {
  Unprocessed = 1,
  Processed = 2
}

@Component({
  selector: 'app-orders-admin',
  templateUrl: './orders-admin.component.html',
  styleUrls: ['./orders-admin.component.css']
})
export class OrdersAdminComponent implements OnInit {

  ordersSubscription: Subscription;
  orders$: Observable<any[]>;
  orderStatus = Status;

  constructor(private orederService: OrderService) { }

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.orders$ = this.orederService.get();
  }

  processOrder(orderId: number) {
    this.orederService.updateStatus(orderId, {status: this.orderStatus.Processed}).subscribe(_ => this.loadOrders());
  }
}
