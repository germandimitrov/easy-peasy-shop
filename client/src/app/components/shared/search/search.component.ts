import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import IProduct from 'src/app/core/interfaces/IProduct';
import { Router, Params, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  productSubscription: Subscription;
  @Input() show: boolean;
  search: string;
  products: IProduct[];

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.show = false;
  }

  handleSearch(search: string) {
    const queryParams: Params = { search };
    this.router.navigate(
      ['.'],
      {
        relativeTo: this.route,
        queryParams: queryParams,
      });
  }
}
