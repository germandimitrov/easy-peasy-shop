import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import IComment from 'src/app/interfaces/IComment';

@Component({
  selector: 'app-show-comment',
  templateUrl: './show-comment.component.html',
  styleUrls: ['./show-comment.component.css']
})
export class ShowCommentComponent implements OnInit {

  @Input() comment: IComment;
  stars: any;


  constructor() {
  }

  ngOnInit() {
    // ★ ☆
    let starRating = '';
    for (let index = 0; index < 5; index++) {
      if (this.comment.rating > index) {
        starRating += '★';
      } else {
        starRating += '☆';
      }
    }
    this.stars = starRating.replace('undefined', '');
  }

}
