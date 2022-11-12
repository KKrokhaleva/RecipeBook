import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "./shopping-list.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],

})
export class ShoppingListComponent implements OnInit,OnDestroy {

  ingredients: Ingredient[];
  private subscription: Subscription;

  constructor(private shoppingListServices: ShoppingListService) {}

  ngOnInit() {
    this.ingredients = this.shoppingListServices.getIngredients();
    this.subscription = this.shoppingListServices.ingredientsChanged
      .subscribe(
        (ingredients:Ingredient[]) =>{
          this.ingredients= ingredients;
        }
      );
  }

  onEditItem(index:number){
this.shoppingListServices.startedEditing.next(index);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
