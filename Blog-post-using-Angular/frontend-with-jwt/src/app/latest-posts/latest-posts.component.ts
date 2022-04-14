import { Component, Input, OnInit } from '@angular/core';
import { BlogPost } from '../BlogPost';
import { PostService } from '../post.service';

@Component({
  selector: 'app-latest-posts',
  templateUrl: './latest-posts.component.html',
  styleUrls: ['./latest-posts.component.css'],
})
export class LatestPostsComponent implements OnInit {
  posts: Array<BlogPost>;
  subscription: any = [];

  constructor(private postService: PostService) {
    this.posts = new Array<BlogPost>();
  }

  ngOnInit(): void {
    this.subscription = this.postService
      .getPosts(1, '', '')
      .subscribe((data) => {
        this.posts = data.slice(0, 3);
      });
  }

  ngOnDestroy() {
    if (this.subscription.length > 0) this.subscription.unsubscribe();
  }
}
