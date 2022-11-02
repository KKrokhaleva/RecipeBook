import {EventEmitter, OnInit} from "@angular/core";
import {Recipe} from "./recipe.model";
import {Injectable} from "@angular/core";


@Injectable()
export class RecipeService implements OnInit{

  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe(
      'A Test Recipe',
      'This is simply a test',
      'https://getsmartratsolutions.com/wp-content/uploads/2021/11/thanksgiving-recipe-ideas.jpg'),
    new Recipe(
      'A Test Recipe2',
      'This is simply a test2',
      'https://getsmartratsolutions.com/wp-content/uploads/2021/11/thanksgiving-recipe-ideas.jpg')
  ];

  getRecipes(){
    return this.recipes.slice();
  }
  ngOnInit() {
  }

}
