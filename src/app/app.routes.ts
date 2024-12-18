import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { RecipesComponent } from './recipes/recipes.component';
import { SaveRecipesComponent } from './save-recipes/save-recipes.component';
import { ViewRecipesComponent } from './view-recipes/view-recipes.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProfileComponent } from './profile/profile.component';
import { authGuard } from './auth.guard';


export const routes: Routes = [

    //lazy loaded admin modules : http://localhost:4200/admin

    {path:'admin',canActivate:[authGuard],loadChildren:()=>import('./admin/admin.module').then(m=>m.AdminModule)},



    {path:'', component:HomeComponent},
    {path:'login',component:LoginComponent},
    {path:'register',component:RegisterComponent},
    {path:'about',component:AboutComponent},
    {path:'contact',component:ContactComponent},
    {path:'recipes',component:RecipesComponent},
    {path:'saved-recipes',canActivate:[authGuard],component:SaveRecipesComponent},
    {path:'view-recipe/:id',canActivate:[authGuard],component:ViewRecipesComponent},
    {path:'profile',canActivate:[authGuard],component:ProfileComponent},
    {path:'**',component:PageNotFoundComponent}
    
];
