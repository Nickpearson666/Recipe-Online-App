import {Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {shoppingService} from "../shopping-list-service";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";
import {Ingredient} from "../../shared/ingredient.module";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy{
  @ViewChild("nameInput")

  nameInputRef:ElementRef;

  // @ViewChild("amountInput")
  //
  @ViewChild("ingredient") currIngredient:NgForm;
  amountInput:ElementRef;

  ingredientEdit:Subscription;
  editMode:boolean= false;
  editInx:number;

  name:string = "";
  amount:number = 0;

  ingredient : Ingredient;

  constructor(private shoppingService: shoppingService) {
  }

  ngOnInit(){
        this.ingredientEdit = this.shoppingService.ingredientEdit.subscribe((idx)=>{
          this.editMode = true;
          this.editInx = idx;
          this.ingredient = this.shoppingService.getIngredientById(this.editInx);
          this.currIngredient.setValue({
            'name':this.ingredient.name,
            'amount':this.ingredient.amount
          })
        })
    }




// @Output()
//
// newIngredientEvent = new EventEmitter<{name:string, amount:number}>();

onAddClick(){
  this.name = this.nameInputRef.nativeElement.value;
  this.amount = this.amountInput.nativeElement.value;
  this.shoppingService.addNewItem({name :this.name,  amount:this.amount});
  // this.newIngredientEvent.emit({name :this.name,  amount:this.amount});
}

  Onsubmit(){
    // this.ingredient.name = this.currIngredient.value.name;
    // this.ingredient.amount = this.currIngredient.value.amount;
    this.ingredient = {'name':this.currIngredient.value.name,
      'amount':this.currIngredient.value.amount};

    if(this.editMode){
      this.shoppingService.updateItem(this.editInx, this.ingredient);
      this.editMode = !this.editMode;
    }else{
      this.shoppingService.addNewItem(this.ingredient);
    }
    this.currIngredient.reset();
  }

  ngOnDestroy() {
    this.ingredientEdit.unsubscribe();
  }

  onClear(){
    this.currIngredient.reset();
    this.editMode = false;
  }

  onDelete(){

      this.shoppingService.deleteItem(this.editInx);
      this.currIngredient.reset();
      this.editMode = false;
  }
}
