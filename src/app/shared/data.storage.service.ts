import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {recipeService} from "../recipes/recipe-service";
import {map, Subject, Subscription, tap} from "rxjs";
import {Recipe} from "../recipes/recipes.module";

@Injectable({providedIn:"root"})
export class DataStorageService{

  constructor(private http: HttpClient,
              private recipeService: recipeService) {}

  storeRecipes(){
    const recipes = this.recipeService.getRecipes();
    this.http.put('https://ng-complete-guide-e0c25-default-rtdb.firebaseio.com/recipes.json',
      recipes)
      .subscribe((response)=>{
        console.log('Response: '+ response);
      });
  }

  fetchRecipes(){
    return this.http.get<Recipe[]>('https://ng-complete-guide-e0c25-default-rtdb.firebaseio.com/recipes.json').
      pipe(map(recipeList=>{
        return recipeList.map((recipe)=>  {
         return {...recipe,
           ingredients: recipe.ingredients? recipe.ingredients:[]};

        })
    }), tap(recipeList=>{
      this.recipeService.setRecipes(recipeList);
      console.log("response: ")
      console.log(recipeList)
    })
    );
  }


}
