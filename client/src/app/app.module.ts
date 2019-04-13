import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {NgbRating} from '@ng-bootstrap/ng-bootstrap';

// components
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/page/header/header.component';
import { FooterComponent } from './components/page/footer/footer.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ProductComponent } from './components/products/product/product.component';
import { ProfileComponent } from './components/users/profile/profile.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { DetailsComponent } from './components/products/details/details.component';
import { CreateCommentComponent } from './components/comments/create-comment/create-comment.component';
import { ShowCommentComponent } from './components/comments/show-comment/show-comment.component';

// services
import { AuthService } from './services/auth.service';
import { ShoppingCartService } from './services/shoppingCart.service';
import { UserService } from './services/user.service';
import { AddHeaderInterceptor } from './interceptors/AddHeaderInterceptor';
import { CategoriesComponent } from './components/products/categories/categories.component';
import { QuantityFormComponent } from './components/quantity-form/quantity-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    ProductComponent,
    ShoppingCartComponent,
    DetailsComponent,
    CategoriesComponent,
    CreateCommentComponent,
    ShowCommentComponent,
    NgbRating,
    QuantityFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AngularFontAwesomeModule,
  ],
  providers: [
    AuthService,
    UserService,
    ShoppingCartService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AddHeaderInterceptor,
      multi: true,
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
