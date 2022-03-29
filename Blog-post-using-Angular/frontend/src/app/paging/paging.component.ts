import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { BlogPost } from '../BlogPost';

@Component({
  selector: 'app-paging',
  templateUrl: './paging.component.html',
  styleUrls: ['./paging.component.css'],
})
export class PagingComponent implements OnInit {
  @Input('page') page: number = 1;

  constructor() {}

  ngOnInit(): void {}

  @Output() newPage = new EventEmitter<number>();

  goLeft() {
    if (this.page > 1) {
      this.newPage.emit(this.page - 1);
    }
  }

  //change this logic
  goRight() {
    this.newPage.emit(this.page + 1);
  }
}
