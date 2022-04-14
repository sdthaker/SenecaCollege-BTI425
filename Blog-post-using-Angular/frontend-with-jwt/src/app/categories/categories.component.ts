import { Component, Input, OnInit } from '@angular/core';
import { PostService } from '../post.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})

//fetches data from api in future
export class CategoriesComponent implements OnInit {
  categories: Array<any> = [];
  subscription: any = [];
  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.subscription = this.postService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  ngOnDestroy() {
    if (this.subscription.length > 0) this.subscription.unsubscribe();
  }
}
