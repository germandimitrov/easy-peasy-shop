import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { ProductCreateComponent } from './components/product-create/product-create.component';
import { CategoryCreateComponent } from './components/category-create/category-create.component';

import { CategoryService } from '../core/services/category.service';
import { ProductsService } from '../core/services/products.service';
import { AddHeaderInterceptor } from '../core/interceptors/AddHeaderInterceptor';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { OrdersAdminComponent } from './components/orders-admin/orders-admin.component';

@NgModule({
  declarations: [
    ProductCreateComponent,
    CategoryCreateComponent,
    EditProductComponent,
    OrdersAdminComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgMultiSelectDropDownModule.forRoot(),
  ],
  providers: [
    ProductsService,
    CategoryService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AddHeaderInterceptor,
      multi: true,
    }

  ],
  exports: [
    ProductCreateComponent,
    OrdersAdminComponent
  ]
})
export class AdminModule { }
