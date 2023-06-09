import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Recipe} from "../../recipes.module";
import {recipeService} from "../../recipe-service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit{
@Input()
recipe:Recipe ;
@Input()
idx:number = 0;
// @Output()
// selectRecipeEvent = new EventEmitter<void>();
constructor(private recipeService:recipeService,
            private route: ActivatedRoute,
            private router: Router) {

}
  ngOnInit(): void {
  // this.route.params.subscribe((params)=>{
  //   const currId = +this.route.params['id'];
  //   this.idx = currId;
  //   console.log("currId"+this.idx);
  // })
  }
  OnSelect(){
    // this.selectRecipeEvent.emit();
    // this.recipeService.getRecipe(this.recipe);
    //this.recipeService.recipeSelected.emit(this.recipe);
    this.router.navigate([this.idx],{relativeTo:this.route});
  }


}
