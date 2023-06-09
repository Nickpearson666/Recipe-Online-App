import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Recipe} from "../recipes.module";
import {recipeService} from "../recipe-service";
import {Subscription} from "rxjs";
import {DataStorageService} from "../../shared/data.storage.service";
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit, OnDestroy{
    recipeArr:Recipe[] = [];

    recipeChanged: Subscription;

  @Output()
    selectRecipeEvent = new EventEmitter<Recipe>();
    constructor(private recipeService:recipeService,
                private dataStoreService: DataStorageService) {
    }

    ngOnInit() {
      this.recipeArr = this.recipeService.getRecipes();
      this.recipeChanged = this.recipeService.recipeChanged.subscribe(()=>{
        this.recipeArr = this.recipeService.getRecipes();
      });
    }

    onSelectedRecipe(recipe:Recipe){
    this.selectRecipeEvent.emit(recipe);
    }

  ngOnDestroy(): void {
      this.recipeChanged.unsubscribe();
  }
}
