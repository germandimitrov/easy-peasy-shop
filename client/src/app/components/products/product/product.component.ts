import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductsService } from 'src/app/core/services/products.service';
import IProduct from 'src/app/core/interfaces/IProduct';
import { ShoppingCartService } from '../../../core/services/shoppingCart.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnDestroy {

  products: Array<IProduct>;
  productSubscription: Subscription;
  page: number = 1;
  pageSize = 5;

  constructor(
    private productService: ProductsService,
    private shoppingCartService: ShoppingCartService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.productSubscription = this.productService.get(params).subscribe(response => this.products = response);
    });
  }

  ngOnInit() {
  }

  handleOrder(productId: number) {
    this.shoppingCartService.addToCart(productId);
  }

  ngOnDestroy() {
    if (this.productSubscription) {
      this.productSubscription.unsubscribe();
    }
  }


}
