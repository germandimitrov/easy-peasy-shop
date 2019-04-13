import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/core/services/products.service';
import IProduct from 'src/app/core/interfaces/IProduct';
import { ShoppingCartService } from '../../../core/services/shoppingCart.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products: Array<IProduct>;

  constructor(
    private productService: ProductsService,
    private shoppingCartService: ShoppingCartService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.productService.get(params.filter).subscribe(response => this.products = response);
    });
  }

  ngOnInit() {
  }

  handleOrder(productId: number) {
    this.shoppingCartService.addToCart(productId);
  }


}
