import { Component, OnInit, OnDestroy , ViewChild} from '@angular/core';
import { ShoppingCartService } from '../../../core/services/shoppingCart.service';
import IShoppingCartItem from 'src/app/core/interfaces/IShoppingCartItem';
import { ProductsService } from 'src/app/core/services/products.service';
import { Subscription } from 'rxjs';
import IProduct from 'src/app/core/interfaces/IProduct';
import { NgForm } from '@angular/forms';
import { OrderService } from 'src/app/core/services/order.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  private productSerivceSubscription: Subscription;
  private orderServiceSubscription: Subscription;

  orderedProducts: Array<number>;
  products: Array<IProduct>;
  @ViewChild('qtyForm') qtyForm: NgForm;
  totalPrice = 0;

  constructor(
    private productService: ProductsService,
    private shoppingCartService: ShoppingCartService,
    private orderService: OrderService,
    ) {
  }

  ngOnInit() {
    this.subscription = this.shoppingCartService.shoppingCartData.subscribe(orderedProducts => {
      this.orderedProducts = orderedProducts as any;
      if (this.orderedProducts.length) {
        this.productSerivceSubscription = this.productService.getShoppingCartProducts(this.orderedProducts).subscribe(response => {
          this.products = response.map(product => {
            return {
              ...product,
              orderedQuantity: 1,
              totalPrice: Number(product.price)
            };
          }) as IProduct[];
          this.calculateTotalPrice();
        });
      }
    });
  }

  handleRemoveFromCart(productId: number): void {
    this.shoppingCartService.removeFromCart(productId);
    const index = this.orderedProducts.indexOf(productId);
    this.products.splice(index, 1);
  }

  getQuantity(quantity: number, product: IProduct): void {
    this.calculateProductTotalPrice(quantity, product);
    this.calculateTotalPrice();
  }

  calculateProductTotalPrice(quantity: number, product: IProduct): void {
    this.products.forEach(p => {
      if (p.id === product.id) {
        p.totalPrice = product.price * quantity;
        p.orderedQuantity = quantity;
      }
    });
  }

  calculateTotalPrice(): void {
    const res = this.products.reduce((total, product) => {
      return total + product.totalPrice;
    }, 0);
    this.totalPrice = res;
  }

  checkout() {
    this.orderServiceSubscription = this.orderService.create(this.products).subscribe();
    this.shoppingCartService.emptyCart();
    this.products = [];
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    if (this.productSerivceSubscription) { this.productSerivceSubscription.unsubscribe(); }
    if (this.orderServiceSubscription) { this.orderServiceSubscription.unsubscribe(); }
  }

}
