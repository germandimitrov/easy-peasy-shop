import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { HeadingComponent } from './heading/heading.component';
import { SearchComponent } from './search/search.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    HeadingComponent,
    SearchComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    AngularFontAwesomeModule,
    FormsModule
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    HeadingComponent,
    SearchComponent
  ]
})
export class SharedModule { }
