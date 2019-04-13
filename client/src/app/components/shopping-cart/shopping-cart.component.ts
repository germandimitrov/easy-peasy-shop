import { Component, OnInit, OnDestroy , ViewChild} from '@angular/core';
import { ShoppingCartService } from '../../services/shoppingCart.service';
import IShoppingCartItem from 'src/app/interfaces/IShoppingCartItem';
import { ProductsService } from 'src/app/services/products.service';
import { Subscription } from 'rxjs';
import IProduct from 'src/app/interfaces/IProduct';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { OrderService } from 'src/app/services/order.service';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {

  orderedProducts: Array<IShoppingCartItem>;
  private subscription: Subscription;
  products: Array<IProduct>;
  @ViewChild('qtyForm') qtyForm: NgForm;
  totalPrice: number = 0;

  constructor(private productService: ProductsService, private shoppingCartService: ShoppingCartService, private orderService: OrderService) {
  }

  ngOnInit() {
    this.subscription = this.shoppingCartService.shoppingCartData.subscribe(orderedProducts => {
      this.orderedProducts = orderedProducts as any;
      if (this.orderedProducts.length) {
        const productIds = this.orderedProducts.map(p => p.productId);
        this.productService.getShoppingCartProducts(productIds).subscribe(response => {
          this.products = <IProduct[]>response.map(p => ({...p, totalPrice: Number(p.price) }) );
          this.calculateTotalPrice();
        });
      }
    });
  }

  handleRemoveFromCart(productId: number): void {
    this.shoppingCartService.removeFromCart(productId);
    const productIndex = this.products.findIndex(p => p.id === productId);
    this.products.splice(productIndex, 1);
  }

  getQuantity(quantity: number, product: IProduct): void {
    this.products[product.id].orderedQuantity = quantity;
    this.calculateProductTotalPrice(quantity, product);
    this.calculateTotalPrice();
  }

  calculateProductTotalPrice(quantity: number, product: IProduct): void {
    this.products.forEach(p => {
      if (p.id === product.id) {
        p.totalPrice = product.price * quantity;
      }
    });
  }

  calculateTotalPrice(): void {
    let res = this.products.reduce((total, product) => {
      return total + product.totalPrice;
    }, 0);
    this.totalPrice = res;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
