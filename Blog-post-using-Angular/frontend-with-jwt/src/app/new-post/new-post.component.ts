import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Router } from '@angular/router';
import { BlogPost } from '../BlogPost';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css'],
})
export class NewPostComponent implements OnInit {
  blogPost: BlogPost = new BlogPost();
  tags: string = '';
  subscription: any = [];
  errorMessage: string = '';

  constructor(private postService: PostService, private router: Router) {}

  ngOnInit(): void {}

  formSubmit() {
    this.blogPost.tags = this.tags.split(',').map((tag) => tag.trim());
    this.blogPost.isPrivate = false;
    this.blogPost.postDate = new Date().toLocaleDateString();
    this.blogPost.postedBy = 'BTI425 Student';
    this.blogPost.views = 0;

    this.subscription = this.postService.newPost(this.blogPost).subscribe(
      (data) => {
        console.log(data);
        this.router.navigate(['admin']);
      },
      (err) => {
        this.errorMessage =
          'You didnt pass token with request or your token is expired! Try logging in again.';
      }
    );
  }

  ngOnDestroy() {
    if (this.subscription.length > 0) this.subscription.unsubscribe();
  }
}
