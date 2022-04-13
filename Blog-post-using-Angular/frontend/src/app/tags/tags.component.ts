import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css'],
})

//fetches data from api in future
export class TagsComponent implements OnInit {
  tags: Array<string> = [];
  subscription: any = [];

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.subscription = this.postService.getTags().subscribe((data) => {
      this.tags = data;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
