import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { CommentService } from 'src/app/core/services/comment.service';
import IComment from 'src/app/core/interfaces/IComment';
import { NgForm } from '@angular/forms';
import {NgbRating} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.css']
})
export class CreateCommentComponent implements OnInit {

  comment: string;
  rating: number;
  @Input() productId: number;
  @Output() newComment = new EventEmitter();

  constructor(private ratingConfig: NgbRatingConfig, private commentService: CommentService) {
    ratingConfig.max = 5;
  }

  ngOnInit() {
  }

  handleSubmit(form: NgForm) {
    const comment = form.value.comment;

    this.commentService.create({
      content: comment,
      rating: this.rating
    }, this.productId).subscribe(comment => {
      this.newComment.emit(comment);
      this.rating = 0;
      form.reset();
    });

  }

}
