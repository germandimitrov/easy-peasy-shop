import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { CategoryService } from './services/category.service';
import { CommentService } from './services/comment.service';
import { OrderService } from './services/order.service';
import { ProductsService } from './services/products.service';
import { ShoppingCartService } from './services/shoppingCart.service';
import { UserService } from './services/user.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AddHeaderInterceptor } from './interceptors/AddHeaderInterceptor';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AddHeaderInterceptor,
      multi: true,
    }
  ]
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        AuthService,
        CategoryService,
        CommentService,
        OrderService,
        ProductsService,
        ShoppingCartService,
        UserService,
      ]
    }
  }
}
