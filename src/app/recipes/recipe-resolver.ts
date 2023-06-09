import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Recipe} from "./recipes.module";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {DataStorageService} from "../shared/data.storage.service";
import {recipeService} from "./recipe-service";

@Injectable({providedIn:'root'})
export class RecipeResolver implements Resolve<Recipe[]>{

  constructor(private dataStoreService: DataStorageService,
              private recipeService: recipeService) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipe[]> | Promise<Recipe[]> | Recipe[] {
    //在resolve中无需返回subscribe 在配置文件配置后， 每次页面加载后， angular自动执行 每次页面加载后
    if(this.recipeService.getRecipes().length > 0){
      return this.recipeService.getRecipes();
    }
    return this.dataStoreService.fetchRecipes();
  }

}
