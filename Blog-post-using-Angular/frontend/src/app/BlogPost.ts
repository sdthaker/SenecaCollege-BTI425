import { Comment } from './Comment';

export class BlogPost {
  _id!: string;
  title: string = '';
  postDate: string = '';
  featuredImage: string = '';
  post: string = '';
  postedBy: string = '';
  comments: Array<Comment> = new Array<Comment>();
  category: string = '';
  tags: Array<string> = new Array<string>();
  isPrivate: Boolean = false;
  views: number = 0;
}
