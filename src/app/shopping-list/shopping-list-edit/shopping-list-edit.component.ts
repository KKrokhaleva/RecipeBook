import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list.service";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.scss']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild('form', {static: false}) shoppingListForm : NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editItem: Ingredient;

  constructor(private shoppingListServices: ShoppingListService) {
  }

  ngOnInit(): void {
    this.subscription = this.shoppingListServices.startedEditing
      .subscribe(
        (index: number) => {
          this.editedItemIndex = index;
          this.editMode= true;
          this.editItem = this.shoppingListServices.getIngredient(index);
          this.shoppingListForm.setValue({
            name: this.editItem.name,
            amount: this.editItem.amount
          })
        }
      );
  }

  onSubmit(form:NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if(this.editMode){
      this.shoppingListServices.updateIngredient(this.editedItemIndex, newIngredient)
    } else {
      this.shoppingListServices.addIngredient(newIngredient);
    }
    this.editMode= false;
    this.shoppingListForm.reset();
  }

  onClear(){
    this.shoppingListForm.reset();
    this.editMode= false;
  }

  onDelete () {
      this.onClear();
      this.shoppingListServices.deleteIngredient(this.editedItemIndex);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
