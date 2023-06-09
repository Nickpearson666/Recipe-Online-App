import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {HeaderComponent} from "./header/hearder.component";
import {RecipesComponent} from "./recipes/recipes.component";
import {ShoppingListComponent} from "./shopping-list/shopping-list.component";
import {RecipeItemComponent} from "./recipes/recipe-list/recipe-item/recipe-item.component";
import {RecipeDetailComponent} from "./recipes/recipe-detail/recipe-detail.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {RecipeEditComponent} from "./recipes/recipe-edit/recipe-edit.component";
import {RecipeResolver} from "./recipes/recipe-resolver";

const appRouter:Routes = [
  {path:'', redirectTo:'/recipe', pathMatch:"full"},
  {path:'recipe', component:RecipesComponent,
  children:
    [ {path:'', component: PageNotFoundComponent},
      {path:'new', component:RecipeEditComponent},
      {path:':id', component:RecipeDetailComponent, resolve:[RecipeResolver]},
      {path:':id/edit', component:RecipeEditComponent}
    ]},
  {path:'shoppinglist', component:ShoppingListComponent}
]
@NgModule({
  //ngmodule--->将一个普通的class转化为anguler module
  imports:[RouterModule.forRoot(appRouter)],
  exports:[RouterModule]
})
export class AppRouting{

}
