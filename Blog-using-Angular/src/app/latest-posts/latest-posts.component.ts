import { Component, Input, OnInit } from '@angular/core';
import { BlogPost } from '../BlogPost';

@Component({
  selector: 'app-latest-posts',
  templateUrl: './latest-posts.component.html',
  styleUrls: ['./latest-posts.component.css'],
})
export class LatestPostsComponent implements OnInit {
  @Input() posts: Array<BlogPost>;

  constructor() {
    this.posts = new Array<BlogPost>();
  }

  ngOnInit(): void {}
}
