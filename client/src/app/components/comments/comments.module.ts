import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbRating } from '@ng-bootstrap/ng-bootstrap';
import { CreateCommentComponent } from './create-comment/create-comment.component';
import { ShowCommentComponent } from './show-comment/show-comment.component';


@NgModule({
  declarations: [
    NgbRating,
    CreateCommentComponent,
    ShowCommentComponent,
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    NgbRating,
    CreateCommentComponent,
    ShowCommentComponent,
  ]
})
export class CommentsModule { }
