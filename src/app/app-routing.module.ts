import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { ListformComponent } from './components/listform/listform.component';

const routes: Routes = [
  {path: "", component:ListComponent},
  {path: "list/new", component: ListformComponent},
  {path: "list/:id", component: ListformComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
