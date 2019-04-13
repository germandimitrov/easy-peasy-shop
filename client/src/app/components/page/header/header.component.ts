import { Component, OnInit } from '@angular/core';
import {AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { ShoppingCartService } from '../../../services/shoppingCart.service';
import IShoppingCartItem from 'src/app/interfaces/IShoppingCartItem';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isShow = false;
  orderedProductsCount = 0;

  constructor(private authService: AuthService, private router: Router, private shoppingCartService: ShoppingCartService) {}

  ngOnInit() {
    this.shoppingCartService.shoppingCartData.subscribe(orderedProducts => {
      this.orderedProductsCount = orderedProducts.length;
    });
  }

  toggleMenu() {
    this.isShow = !this.isShow;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

}
