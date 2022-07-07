import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { ListformComponent } from './components/listform/listform.component';
import { ImageListComponent } from './images/image-list/image-list.component';
import { ImageComponent } from './images/image/image.component';
import { ImagesComponent } from './images/images.component';

const routes: Routes = [
  {path: "", component:ListComponent},
  {path: "list/new", component: ListformComponent},
  {path: "list/:id", component: ListformComponent},
  {path:'image', component: ImagesComponent, children:[
    {path:'upload', component: ImageComponent}, 
    {path:'list', component:ImageListComponent}
  ]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
