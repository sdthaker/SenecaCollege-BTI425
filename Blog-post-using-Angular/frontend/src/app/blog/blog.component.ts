import { Component, OnInit } from '@angular/core';
import { BlogPost } from '../BlogPost';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../post.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
})

//fetches data from api in future
export class BlogComponent implements OnInit {
  blogPosts: Array<BlogPost> = new Array();
  totalLength: number = 0;
  constructor(
    private route: ActivatedRoute,
    private postService: PostService
  ) {}

  page: number = 1;
  tag: string = '';
  category: string = '';
  querySub: any = [];

  ngOnInit(): void {
    this.querySub = this.route.queryParams.subscribe((params) => {
      if (params['tag']) {
        this.tag = params['tag'];
        this.category = '';
      } else {
        this.tag = '';
      }
      if (params['category']) {
        this.category = params['category'];
        this.tag = '';
      } else {
        this.category = '';
      }
      this.getPage(+params['page'] || 1);
    });
  }

  getPage(page: number) {
    this.postService
      .getPosts(page, this.tag, this.category)
      .subscribe((data) => {
        (this.blogPosts = data),
          (this.page = page),
          (this.totalLength = data.length);
      });
  }

  ngOnDestroy() {
    this.querySub.unsubscribe();
  }
}
