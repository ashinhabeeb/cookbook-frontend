import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DownloadListComponent } from './download-list/download-list.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RequestListComponent } from './request-list/request-list.component';
import { ManageRecipeComponent } from './manage-recipe/manage-recipe.component';
import { UsersListComponent } from './users-list/users-list.component';

const routes: Routes = [
  {path:"",component:DashboardComponent,title:"admin dashboard"},
  {path:"download-list",component:DownloadListComponent,title:"recipe download-list"},
  {path:"recipe-list",component:RecipeListComponent,title:"recipe list"},
  {path:"request-list",component:RequestListComponent,title:"Client Request list"},
  {path:"user-list",component:UsersListComponent,title:"User-list"},
  {path:"recipe/add",component:ManageRecipeComponent,title:"Add Recipe Page"},
  {path:"recipe/:id/edit",component:ManageRecipeComponent,title:"Edit-Recipe-Page"}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
