import { Component, Input, OnInit } from '@angular/core';
import { BlogPost } from '../BlogPost';

@Component({
  selector: 'app-post-data',
  templateUrl: './post-data.component.html',
  styleUrls: ['./post-data.component.css'],
})
export class PostDataComponent implements OnInit {
  @Input() post: BlogPost;
  constructor() {
    this.post = new BlogPost();
  }

  ngOnInit(): void {}
}
