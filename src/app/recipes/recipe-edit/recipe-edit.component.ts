import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormArray, FormControl, FormGroup, NgModelGroup, Validators} from "@angular/forms";
import {recipeService} from "../recipe-service";
import {Recipe} from "../recipes.module";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit{

  index:number;
  editMode:boolean = false;

  recipeForm:FormGroup;

  currRecipe: Recipe;
  constructor(private route: ActivatedRoute,
              private recipeService:recipeService,
              private router:Router) {
  }
  ngOnInit(): void {
    this.route.params.subscribe((params)=>{
        this.index = +params['id'];
        this.editMode = params['id'] != null;
        //console.log(this.editMode);
        this.initForm();
    })
  }

  private initForm(){
    let name = '';
    let imgpath = '';
    let des = '';
    let ingreArr = new FormArray([]);
    if(this.editMode){
      this.currRecipe = this.recipeService.getRecipeById(this.index);
      name = this.currRecipe.name;
      imgpath = this.currRecipe.image;
      des = this.currRecipe.description;
     if(this.currRecipe['ingredients']){
        for(let singleRecipe of this.currRecipe.ingredients){
          ingreArr.push(
              new FormGroup({
            'name': new FormControl(singleRecipe.name, Validators.required),
            'amount': new FormControl(singleRecipe.amount,[Validators.required,
            Validators.pattern(/^[1-9]+[0-9]*$/)]) //only positive number accepted
          }))
        }
       //console.log(ingreArr.length)
     }
    }
      this.recipeForm = new FormGroup({
        'name': new FormControl(name, Validators.required),
        'imgpath':new FormControl(imgpath, Validators.required),
        'des':new FormControl(des,Validators.required),
        "ingredients": ingreArr
      })

    //console.log(this.recipeForm.get('ingredients'))

  }

  OnSubmit(){
    //console.log(this.recipeForm.value);
    let name = this.recipeForm.get('name').value;
    let des = this.recipeForm.get('des').value;
    let img = this.recipeForm.get('imgpath').value;
    let ingredients =  this.recipeForm.get('ingredients').value
    this.currRecipe = new Recipe(name,des, img, ingredients);
    if(this.editMode){
      this.recipeService.updateRecipe( this.index, this.currRecipe);
      this.editMode != this.editMode;
    }else{
      this.recipeService.addNewRecipe(this.currRecipe);
    }
    this.recipeForm.reset();
    //go to recipe detail page 0/eit/
    this.router.navigate(['../'],{relativeTo:this.route});

  }

  get controls() {
    // a getter!
    //console.log((<FormArray>this.recipeForm.get('ingredients')).controls);
    //console.log(this.recipeForm.value)
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onAddIngredient(){
    let ingreArr = <FormArray>this.recipeForm.get('ingredients');
    ingreArr.push(new FormGroup({
      'name': new FormControl('', Validators.required),
      'amount':new FormControl('',[Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/)])
    }));
  }

  onCancel(){
    this.recipeForm.reset();
    this.router.navigate(['../'], {relativeTo:this.route})
  }

  onCancelIngredient(ingreIdx: number){
    let ingreArr = <FormArray>this.recipeForm.get('ingredients');
    ingreArr.removeAt(ingreIdx);
  }

}
