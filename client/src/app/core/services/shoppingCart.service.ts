import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private dataSource;
  public shoppingCartData;
  private orderedProducts = JSON.parse(localStorage.getItem('cart')) || [];

  constructor() {
    this.dataSource = new BehaviorSubject(this.orderedProducts);
    this.shoppingCartData = this.dataSource.asObservable();
  }

  addToCart(productId: number): void {
    this.orderedProducts.push(productId);
    this.orderedProducts = Array.from(new Set(this.orderedProducts));
    this._updateLocalStorage();
    this.dataSource.next(this.orderedProducts);
  }

  removeFromCart(productId: number): void {
    const index = this.orderedProducts.indexOf(productId);
    this.orderedProducts.splice(index, 1);
    this._updateLocalStorage();
    this.dataSource.next(this.orderedProducts);
  }

  emptyCart() {
    this.orderedProducts = [];
    this.dataSource.next(this.orderedProducts);
    this._updateLocalStorage();
  }

  _updateLocalStorage(): void {
    localStorage.removeItem('cart');
    localStorage.setItem('cart', JSON.stringify(this.orderedProducts));
  }

}
