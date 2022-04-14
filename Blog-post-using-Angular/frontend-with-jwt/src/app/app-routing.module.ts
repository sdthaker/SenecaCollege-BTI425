import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogComponent } from './blog/blog.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NewPostComponent } from './new-post/new-post.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PostComponent } from './post/post.component';
import { PostsTableComponent } from './posts-table/posts-table.component';
import { RegisterComponent } from './register/register.component';
import { GuardAuthService } from './guard-auth.service';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: 'blog',
    component: BlogComponent,
  },
  {
    path: 'post',
    component: PostComponent,
  },
  {
    path: 'post/:id',
    component: PostComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'admin',
    component: PostsTableComponent,
    canActivate: [GuardAuthService],
  },
  {
    path: 'admin/post/:id',
    component: EditPostComponent,
    canActivate: [GuardAuthService],
  },
  {
    path: 'admin/newPost',
    component: NewPostComponent,
    canActivate: [GuardAuthService],
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
