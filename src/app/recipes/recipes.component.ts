import {Component, OnDestroy, OnInit} from "@angular/core";
import {Recipe} from "./recipes.module";
import {recipeService} from "./recipe-service";
import {Subscription} from "rxjs";

@Component({
  selector:"app-recipes",
  templateUrl:"./recipes.component.html",
  //把recipeService放到这里是不对的，如果当前页面跳转到shoppinglist
  //会把当前的recipeService destroy 导致数据丢失 ，需要把这个放到更高一级的地方 providers:[recipeService]
})
export class RecipesComponent implements OnInit, OnDestroy{

  recipe:Recipe;


  recipeSelected :Subscription;

  constructor(private recipeService:recipeService) {
  }


  // 使用自定义事件类型，将数据进行自下而上绑定
  ngOnInit(): void {
        this.recipeSelected = this.recipeService.recipeSelected.subscribe((recipe:Recipe)=>{
          this.recipe = recipe;
        });
  }

  ngOnDestroy(): void {
    this.recipeSelected.unsubscribe();
  }





  getRecipe(recipe: Recipe){
    console.log(recipe.name);
    this.recipe = recipe;
    // this.recipeService.getRecipe(recipe);
    // this.recipe = this.recipeService.recipe;
  }
}
