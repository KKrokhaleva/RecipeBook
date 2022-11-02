import {Component, OnInit} from '@angular/core';
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "./shopping-list.service";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
  providers:[ShoppingListService]
})
export class ShoppingListComponent implements OnInit {

  ingredients: Ingredient[];

  constructor(private shoppingListServices: ShoppingListService) {}

  ngOnInit() {
    this.ingredients = this.shoppingListServices.getIngredients();
    this.shoppingListServices.ingredientsChanged
      .subscribe(
        (ingredients:Ingredient[]) =>{
          this.ingredients= ingredients;
        }
      )
  }

}
