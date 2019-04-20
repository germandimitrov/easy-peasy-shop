import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DetailsComponent } from './details/details.component';
import { ProductComponent } from './product/product.component';
import { CategoriesComponent } from './categories/categories.component';
import { CommentsModule } from '../comments/comments.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    ProductComponent,
    DetailsComponent,
    CategoriesComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    CommentsModule,
    SharedModule,
    NgbPaginationModule
  ],
  exports: [
    ProductComponent,
    DetailsComponent,
    CategoriesComponent,
  ]
})
export class ProductsModule { }
