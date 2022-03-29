import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BlogPost } from './BlogPost';
const perPage: Number = 6;

@Injectable({
  providedIn: 'root',
})
export class PostService {
  blogPosts: BlogPost = new BlogPost();
  constructor(private http: HttpClient) {}

  getAllPosts(): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(
      `https://blog-post-app-backend.herokuapp.com/api/posts?page=1&perPage=${Number.MAX_SAFE_INTEGER}`
    );
  }

  newPost(data: BlogPost): Observable<any> {
    return this.http.post<any>(
      `http://blog-post-app-backend.herokuapp.com/api/posts`,
      data
    );
  }

  updatePostById(id: string, data: BlogPost) {
    return this.http.put<any>(
      `https://blog-post-app-backend.herokuapp.com/api/posts/${id}`,
      data
    );
  }

  deletePostById(id: string): Observable<any> {
    return this.http.delete<any>(
      `https://blog-post-app-backend.herokuapp.com/api/posts/${id}`
    );
  }

  getPosts(
    page: Number,
    tag: String,
    category: String
  ): Observable<BlogPost[]> {
    tag = tag.replace(/[#]/g, '');

    return this.http.get<BlogPost[]>(
      `https://blog-post-app-backend.herokuapp.com/api/posts?page=${page}&perPage=${perPage} ${
        tag ? `&tag=${tag}` : ''
      } ${category ? `&category=${category}` : ''}`
    );
  }

  getPostbyId(id: String): Observable<BlogPost> {
    return this.http.get<BlogPost>(
      `https://blog-post-app-backend.herokuapp.com/api/posts/${id}`
    );
  }

  getCategories(): Observable<any> {
    return this.http.get<any>(
      `https://blog-post-app-backend.herokuapp.com/api/categories`
    );
  }

  getTags(): Observable<string[]> {
    return this.http.get<string[]>(
      `https://blog-post-app-backend.herokuapp.com/api/tags`
    );
  }
}
