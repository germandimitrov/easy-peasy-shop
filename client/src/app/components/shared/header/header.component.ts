import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ShoppingCartService } from '../../../core/services/shoppingCart.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isShow = false;
  orderedProductsCount = 0;
  shoppingCartSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private shoppingCartService: ShoppingCartService
  ) {}

  ngOnInit() {
    this.shoppingCartSubscription = this.shoppingCartService.shoppingCartData.subscribe(orderedProducts => {
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

  ngOnDestroy() {
    if (this.shoppingCartSubscription) {
      this.shoppingCartSubscription.unsubscribe();
    }
  }

}
