import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarpetasComponent } from './carpetas/carpetas.component';
import { IntroComponent } from './intro/intro.component';
import { PostCreateComponent } from './publicaciones/post-create/post-create.component';
import { PostListComponent } from './publicaciones/post-list/post-list.component';

const routes: Routes = [
  {path: '', component: IntroComponent},
  {path: 'list', component: PostListComponent},
  {path: 'genre', component: CarpetasComponent},
  {path: 'create', component: PostCreateComponent},
  {path: 'edit/:postId', component: PostCreateComponent},
  {path: 'accion', component: PostListComponent},
  {path: 'comedia', component: PostListComponent},
  {path: 'fantasia', component: PostListComponent},
  {path: 'horror', component: PostListComponent},
  {path: 'romance', component: PostListComponent},
  {path: 'sobrenatural', component: PostListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
