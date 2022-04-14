import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { BlogPost } from '../BlogPost';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css'],
})
export class EditPostComponent implements OnInit {
  blogPost: BlogPost = new BlogPost();
  tags: String = '';
  updateSubscription: any = [];
  deleteSubscription: any = [];
  errorMessage: string = '';

  constructor(
    private router: Router,
    private postService: PostService,
    private activateRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.postService
      .getPostbyId(this.activateRoute.snapshot.params['id'])
      .subscribe((data) => {
        this.blogPost = data;
        this.tags = this.blogPost.tags.toString();
      });
    //this.activateRoute.params.subscribe((params) => {
    // this.postService.getPostbyId(params['id']).subscribe((data) => {
    //   this.blogPost = data;
    //   this.tags = this.blogPost.tags.toString();
    // });
    //});
  }

  logout() {
    localStorage.removeItem('access_token');
    this.router.navigate(['/login']);
  }

  formSubmit() {
    this.tags.split(',').map((tag) => tag.trim());
    this.updateSubscription = this.postService
      .updatePostById(this.blogPost._id, this.blogPost)
      .subscribe(
        (data) => {
          this.router.navigate(['admin']);
        },
        (err) => {
          this.errorMessage =
            'You didnt pass token with request or your token is expired! Try logging in again.';
        }
      );
  }

  deletePost() {
    this.deleteSubscription = this.postService
      .deletePostById(this.blogPost._id)
      .subscribe(
        (data) => {
          this.router.navigate(['admin']);
        },
        (err) => {
          this.errorMessage =
            'You didnt pass token with request or your token is expired! Try logging in again.';
        }
      );
  }

  ngOnDestroy() {
    if (this.updateSubscription.length > 0)
      this.updateSubscription.unsubscribe();
    if (this.deleteSubscription.length > 0)
      this.deleteSubscription.unsubscribe();
  }
}
