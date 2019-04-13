import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private dataSource;
  public shoppingCartData;
  private orderedProducts = JSON.parse(localStorage.getItem('cart')) || [];
  private quantity = 0;

  constructor() {
    this.dataSource = new BehaviorSubject(this.orderedProducts);
    this.shoppingCartData = this.dataSource.asObservable();
  }

  addToCart(productId: number): void {
    const productIndex = this.orderedProducts.findIndex(p => p.productId === productId);
    if (productIndex > -1) {
      this.orderedProducts[productIndex].quantity += 1;
    } else {
      this.orderedProducts.push({ productId, quantity: this.quantity += 1 });
    }
    // SHOULD BE CHANGED
    this._updateLocalStorage();
    this.dataSource.next(this.orderedProducts);
  }

  removeFromCart(productId: number): void {
    const productIndex = this.orderedProducts.findIndex(p => p.productId === productId);
    this.orderedProducts.splice(productIndex, 1);
    this.dataSource.next(this.orderedProducts);
    this._updateLocalStorage();
  }

  _updateLocalStorage(): void {
    localStorage.removeItem('cart');
    localStorage.setItem('cart', JSON.stringify(this.orderedProducts));
  }

}
