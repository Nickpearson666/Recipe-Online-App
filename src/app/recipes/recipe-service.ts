import {Recipe} from "./recipes.module";
import {EventEmitter, Injectable, OnInit} from "@angular/core";
import {Ingredient} from "../shared/ingredient.module";
import {Subject} from "rxjs";
import {DataStorageService} from "../shared/data.storage.service";

@Injectable()
export class recipeService{
  // public recipeArr:Recipe[] = [new Recipe("Tasty",
  //   "Test",
  //   "https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_1280.jpg",
  //   [new Ingredient('Meat', 1), new Ingredient('Apple', 2)]),
  //   new Recipe("Another Recipe Test", "Test",
  //     "https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_1280.jpg",
  //     [new Ingredient('Meat', 1), new Ingredient('Apple', 2)])];

  private recipeArr:Recipe[] = [];


  //这个数据是自下而上
  // recipeSelected = new EventEmitter<Recipe>();



  recipeSelected = new Subject<Recipe>();

  recipeChanged = new Subject();


  setRecipes(recipeList: Recipe[]){
    this.recipeArr = recipeList;
    this.recipeChanged.next(recipeList.slice());
  }

  getRecipes(){
    //copy a new arr
    return this.recipeArr.slice();
  }

  getRecipeById(id:number){
    return this.recipeArr[id];
  }

  addNewRecipe(recipe: Recipe){
    this.recipeArr.push(recipe);
    this.recipeChanged.next(null);
  }

  updateRecipe(idx: number,recipe: Recipe){
    this.recipeArr[idx] = recipe;
    this.recipeChanged.next(null);
  }

  deleteRecipe(idx: number){
    this.recipeArr.splice(idx, 1);
    this.recipeChanged.next(null);
  }


}
