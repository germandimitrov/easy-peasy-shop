import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import IProduct from '../interfaces/IProduct';
import { Observable } from 'rxjs';
import IOrder from '../interfaces/IOrder';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {

  }

  get(): Observable<IOrder[]> {
    return this.http.get<any[]>(this.apiUrl + 'orders');
  }

  create(orderedProducts: IProduct[]) {
    console.log(orderedProducts);
    return this.http.post(this.apiUrl + 'orders', orderedProducts);
  }

  updateStatus(orderId: number, status: object) {
    return this.http.put(this.apiUrl + 'orders/' + orderId + '/status', status);
  }

}
