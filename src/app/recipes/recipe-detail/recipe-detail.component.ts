import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from "../recipes.module";
import {recipeService} from "../recipe-service";
import {shoppingService} from "../../shopping-list/shopping-list-service";
import {Ingredient} from "../../shared/ingredient.module";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit{
  @Input()
  recipe:Recipe;

  idx: number;

  constructor(private shoppingService: shoppingService,

              private recipeService: recipeService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params)=>{
      //const currId = ;
      this.idx = +params['id'];
      console.log(this.idx)
      this.recipe = this.recipeService.getRecipeById(this.idx);
    })
  }

  onAddToShoppingList(){
    for(let ingredient of this.recipe.ingredients){
      this.shoppingService.addNewItem(ingredient);
    }
    // this.len = this.recipe.ingredients.length;
    // for(let i = 0; i < this.len; i++){
    //   this.shoppingService.addNewItem(this.recipe.ingredients[i]);
    // }

  }

  OnEditRecipe(){
    //跳转另一个地址
    // this.router.navigate(['edit'], {relativeTo:this.route});
    //
    this.router.navigate(['../',this.idx,'edit'], {relativeTo:this.route});
  }

  OnDeleteRecipe(){
    this.recipeService.deleteRecipe(this.idx);
    this.router.navigate(['../'], {relativeTo:this.route});
  }






}
