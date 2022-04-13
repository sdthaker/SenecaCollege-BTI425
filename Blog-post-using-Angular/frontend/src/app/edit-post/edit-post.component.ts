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

  formSubmit() {
    this.tags.split(',').map((tag) => tag.trim());
    this.updateSubscription = this.postService
      .updatePostById(this.blogPost._id, this.blogPost)
      .subscribe((data) => {
        this.router.navigate(['admin']);
      });
  }

  deletePost() {
    this.deleteSubscription = this.postService
      .deletePostById(this.blogPost._id)
      .subscribe((data) => {
        this.router.navigate(['admin']);
      });
  }

  ngOnDestroy() {
    this.updateSubscription.unsubscribe();
    this.deleteSubscription.unsubscribe();
  }
}
