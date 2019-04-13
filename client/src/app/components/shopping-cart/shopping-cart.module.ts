import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuantityFormComponent } from './quantity-form/quantity-form.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    QuantityFormComponent,
    ShoppingCartComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    QuantityFormComponent,
    ShoppingCartComponent
  ]
})
export class ShoppingCartModule { }
