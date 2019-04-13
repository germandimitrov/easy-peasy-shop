import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// components
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ProfileComponent } from './components/users/profile/profile.component';

import { CoreModule } from './core/core.module';
import { SharedModule } from './components/shared/shared.module';
import { ProductsModule } from './components/products/products.module';
import { ShoppingCartModule } from './components/shopping-cart/shopping-cart.module';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    CoreModule,
    SharedModule,
    ProductsModule,
    ShoppingCartModule,
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
