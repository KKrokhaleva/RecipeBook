import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";

import {headerComponent} from "./header/header.component";
import {RecipeComponent} from "./recipe/recipe.component";
import {RecipeListComponent} from "./recipe/recipe-list/recipe-list.component";
import {RecipeBookComponent} from "./recipe/recipe-book/recipe-book.component";
import {RecipeItemComponent} from "./recipe/recipe-list/recipe-item/recipe-item.component";
import {RecipeDetailComponent} from "./recipe/recipe-detail/recipe-detail.component";
import {ShoppingListComponent} from "./shopping-list/shopping-list.component";
import {RecipeStartComponent} from "./recipe/recipe-start/recipe-start.component";
import {RecipeEditComponent} from "./recipe/recipe-edit/recipe-edit.component";
import {RecipeResolverService} from "./recipe/recipeResolver.service";


const appRoutes: Routes = [
  {path: '', component: RecipeComponent, pathMatch: 'full'},
  {path:'', redirectTo: '/somewhere-else', pathMatch: 'full'},
  {
    path:'recipes' ,
    component: RecipeComponent ,
    resolve: [RecipeResolverService],
    children:[
      {path: '', component: RecipeStartComponent},
      {path: 'new', component: RecipeEditComponent},
      {
        path: ':id',
        component: RecipeDetailComponent,
        resolve: [RecipeResolverService]
      },
      {
        path: ':id/edit',
        component: RecipeEditComponent,
        resolve: [RecipeResolverService]
      }
    ]
  },
  {path:'shopping-list' ,component: ShoppingListComponent},
  {path: '**' , redirectTo:'/recipes'},
];

@NgModule({
  imports:[RouterModule.forRoot(appRoutes)],
  exports:[RouterModule]
})


export class AppRoutingModule{

}
