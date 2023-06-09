import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from "../shared/ingredient.module";
import {shoppingService} from "./shopping-list-service";
import {Subject, Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent  implements OnInit, OnDestroy{

  ingredients: Ingredient[] = [];
  private ingredientChanged:Subscription;

  constructor(private shoppingService: shoppingService) {

  }

  ngOnInit(): void {
    this.ingredients = this.shoppingService.getIngredients();
    this.ingredientChanged = this.shoppingService.ingredientChanged.subscribe((ingredients: Ingredient[])=>{
      this.ingredients = ingredients;
    })
  }
  addNewItem(ingredient: Ingredient){
    console.log("name: "+ ingredient.name);
    this.shoppingService.addNewItem(new Ingredient(ingredient.name, ingredient.amount));
  }

  ngOnDestroy(): void {
    this.ingredientChanged.unsubscribe();
  }

  OnEdit(index:number){
    this.shoppingService.ingredientEdit.next(index);
  }


}
