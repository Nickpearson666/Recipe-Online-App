import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {HeaderComponent} from "./header/hearder.component";
import {RecipesComponent} from "./recipes/recipes.component";
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DropdownDirective} from "./shared/dropdown.directive";
import {shoppingService} from "./shopping-list/shopping-list-service";
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {RouterLink} from "@angular/router";
import {AppRouting} from "./app-routing";
import {RecipeEditComponent} from "./recipes/recipe-edit/recipe-edit.component";
import {recipeService} from "./recipes/recipe-service";
import {HttpClient, HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    DropdownDirective,
    PageNotFoundComponent,
    RecipeEditComponent
  ],
    imports: [
        BrowserModule,
        FormsModule,
        RouterLink,
        AppRouting,
        ReactiveFormsModule,
        HttpClientModule
    ],
  providers: [shoppingService, recipeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
