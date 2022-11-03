import {EventEmitter, OnInit, Injectable} from "@angular/core";

import {Recipe} from "./recipe.model";
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list/shopping-list.service";


@Injectable()
export class RecipeService {

  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [

    new Recipe(
      'A Test Recipe',
      'This is simply a test',
      'https://getsmartratsolutions.com/wp-content/uploads/2021/11/thanksgiving-recipe-ideas.jpg',
    [
      new Ingredient('Meat',1),
      new Ingredient('French Fries',20),
    ]),

    new Recipe(
      'A Test Recipe2',
      'This is simply a test2',
      'https://getsmartratsolutions.com/wp-content/uploads/2021/11/thanksgiving-recipe-ideas.jpg',
      [
        new Ingredient('Buns',2),
        new Ingredient('Meat',5),
      ]
    )
  ];

  constructor(private shoppingListService: ShoppingListService) {
  }

  getRecipes(){
    return this.recipes.slice();
  }

  addIngredientsToSL(ingredients:Ingredient[]){
    this.shoppingListService.addIngredients(ingredients);
  }
}
