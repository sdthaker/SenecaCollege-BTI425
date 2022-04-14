import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Router } from '@angular/router';
import { BlogPost } from '../BlogPost';

@Component({
  selector: 'app-posts-table',
  templateUrl: './posts-table.component.html',
  styleUrls: ['./posts-table.component.css'],
})
export class PostsTableComponent implements OnInit {
  blogPosts: Array<BlogPost> = [];
  subscription: any = [];

  constructor(private router: Router, private postService: PostService) {}

  ngOnInit(): void {
    this.subscription = this.postService.getAllPosts().subscribe((data) => {
      this.blogPosts = data;
    });
  }

  logout() {
    localStorage.removeItem('access_token');
    this.router.navigate(['/login']);
  }

  rowClicked(e: any, id: any) {
    this.router.navigate(['/admin/post', id]);
  }

  ngOnDestroy() {
    if (this.subscription.length > 0) this.subscription.unsubscribe();
  }
}
