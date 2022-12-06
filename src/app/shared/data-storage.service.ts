import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {RecipeService} from "../recipe/recipe.service";
import {Recipe} from "../recipe/recipe.model";
import {map, tap} from "rxjs";
import {AuthService} from "../auth/auth.service";

@Injectable({providedIn: 'root'})
export class DataStorageService {

  constructor(private http: HttpClient,
              private recipeService: RecipeService,
              private authService: AuthService) {
  }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    return this.http.put(
      'https://recipe-book-9d525-default-rtdb.firebaseio.com/recipes.json',
      recipes
    ).subscribe(response => {
      console.log(response);
    })
  }

  fetchRecipes() {

    return this.http
      .get<Recipe[]>(
        'https://recipe-book-9d525-default-rtdb.firebaseio.com/recipes.json')
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : []
            }
          });
        }),
        tap(recipes => {
          this.recipeService.setRecipes(recipes);
        })
      )
  }
}
