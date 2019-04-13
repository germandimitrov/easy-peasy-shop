import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { ProductCreateComponent } from './components/product-create/product-create.component';
import { CategoryCreateComponent } from './components/category-create/category-create.component';

import { CategoryService } from '../services/category.service';
import { ProductsService } from '../services/products.service';
import { AddHeaderInterceptor } from '../interceptors/AddHeaderInterceptor';
import { EditProductComponent } from './components/edit-product/edit-product.component';

@NgModule({
  declarations: [ProductCreateComponent, CategoryCreateComponent, EditProductComponent],
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
    ProductCreateComponent
  ]
})
export class AdminModule { }
