import { Injectable} from "@angular/core";

import {Recipe} from "./recipe.model";
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list/shopping-list.service";
import {Subject} from "rxjs";


@Injectable()
export class RecipeService {
recipesChanged = new Subject<Recipe[]>();

  // private recipes: Recipe[] = [
  //
  //   new Recipe(
  //     'A Test Recipe',
  //     'This is simply a test',
  //     'https://getsmartratsolutions.com/wp-content/uploads/2021/11/thanksgiving-recipe-ideas.jpg',
  //   [
  //     new Ingredient('Meat',1),
  //     new Ingredient('French Fries',20),
  //   ]),
  //
  //   new Recipe(
  //     'A Test Recipe2',
  //     'This is simply a test2',
  //     'https://getsmartratsolutions.com/wp-content/uploads/2021/11/thanksgiving-recipe-ideas.jpg',
  //     [
  //       new Ingredient('Buns',2),
  //       new Ingredient('Meat',5),
  //     ]
  //   )
  // ];

  private recipes: Recipe[] =[];

  constructor(private shoppingListService: ShoppingListService) {
  }

  getRecipes(){
    return this.recipes.slice();
  }

  getRecipe(id: number){
    return this.recipes[id];
  }

  addIngredientsToSL(ingredients:Ingredient[]){
    this.shoppingListService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index:number){
    this.recipes.splice(index,1);
    this.recipesChanged.next(this.recipes.slice());
  }

  setRecipes (recipes : Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }
}
