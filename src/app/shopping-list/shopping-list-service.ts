import {Ingredient} from "../shared/ingredient.module";
import {EventEmitter} from "@angular/core";
import {Subject} from "rxjs";

export class shoppingService{
  private ingredients: Ingredient[] = [
    new Ingredient("Apple", 5),
    new Ingredient("Banana", 5)
  ];

  ingredientEdit = new Subject<number>();

  // ingredientChanged = new EventEmitter<Ingredient[]>();
  ingredientChanged = new Subject<Ingredient[]>();

  getIngredients(){
    return this.ingredients.slice();
  }

  getIngredientById(idx: number){
    return this.ingredients[idx];
  }

  addNewItem(ingredient: Ingredient){
    console.log("name: "+ ingredient.name);
    this.ingredients.push(ingredient);
    //对于数组可以选择一次性加入这些元素，避免多次触发事件
    // this.ingredients.push(...ingredient);
    //重新获取最新的数组
    //this.ingredientChanged.emit(this.ingredients.slice());
    //使用subject触发事件
    this.ingredientChanged.next(this.ingredients.slice());
  }

  updateItem(int: number, ingredient: Ingredient){
    this.ingredients[int] = ingredient;
    this.ingredientChanged.next(this.ingredients.slice());
  }

  deleteItem(int: number){
    this.ingredients.splice(int, 1);
    this.ingredientChanged.next(this.ingredients.slice());
  }
}
