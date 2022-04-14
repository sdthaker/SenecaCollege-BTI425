import { Component, Input, OnInit } from '@angular/core';
import { BlogPost } from '../BlogPost';
import { PostService } from '../post.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-data',
  templateUrl: './post-data.component.html',
  styleUrls: ['./post-data.component.css'],
})
export class PostDataComponent implements OnInit {
  querySub: any;
  commentName: string = '';
  commentText: string = '';
  post: BlogPost = new BlogPost();

  constructor(
    private route: ActivatedRoute,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.querySub = this.route.params.subscribe((params) => {
      this.postService
        .getPostbyId(params['id'])
        .subscribe((post) => (this.post = post));
    });
  }

  ngOnDestroy(): void {
    if (this.querySub.length > 0) this.querySub.unsubscribe();
  }

  submitComment(): void {
    this.post?.comments.push({
      author: this.commentName,
      comment: this.commentText,
      date: new Date().toLocaleDateString(),
    });
    this.postService
      .updatePostById(this.post._id, this.post)
      .subscribe((data) => {
        this.commentName = '';
        this.commentText = '';
      });
  }
}
