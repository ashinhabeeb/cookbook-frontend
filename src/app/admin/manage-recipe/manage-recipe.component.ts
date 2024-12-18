import { Component, Input, input, OnInit } from '@angular/core';
import { RecipeModel } from '../model/recipeModel';
import { ApiServicesService } from '../../services/api-services.service';
import { Router } from '@angular/router';
import { subscribeOn } from 'rxjs';

@Component({
  selector: 'app-manage-recipe',
  templateUrl: './manage-recipe.component.html',
  styleUrl: './manage-recipe.component.css'
})
export class ManageRecipeComponent implements OnInit {

  @Input() id !: string

  ingredients: any = []
  instructions: any = []
  mealArray:any = []


  recipeDetails: RecipeModel = {}

  ngOnInit(): void {
    this.getAllRecipes()
  }

  constructor(private api:ApiServicesService, private router:Router){}

  getAllRecipes(){
    this.api.getAllRecipesApi().subscribe((res:any)=>{
      if(this.id){
        this.recipeDetails = res.find((item:any)=>item._id==this.id)
        this.ingredients = this.recipeDetails.ingredients
        this.instructions = this.recipeDetails.instructions
        this.mealArray = this.recipeDetails.mealType
      }
    })
  }

 
  addIngredients(ingredientsInput: any) {
    if (ingredientsInput.value) {
      this.ingredients.push(ingredientsInput.value)
      ingredientsInput.value = ""
      console.log(this.ingredients)
    }
  }

  removeIngredients(value:string){
    this.ingredients = this.ingredients.filter((item:string)=>item!=value)
  }

  addInstructions(instructionInput:any) {
    if (instructionInput.value) {
      this.instructions.push(instructionInput.value)
      instructionInput.value = ""
      console.log(this.instructions)
    }
  }

  removeInstructions(value:string){
    this.instructions = this.instructions.filter((item:string)=>item!=value)
  }

  selectMealType(event:any){
    if(event.target.checked){
      !this.mealArray.includes(event.target.name) &&
      this.mealArray.push(event.target.name)
    }else{
      this.mealArray = this.mealArray.filter((item:any)=>item!=event.target.name)
    }
    console.log(this.mealArray)
  }

  removeMealType(meal:string){
    this.mealArray = this.mealArray.filter((item:string)=>item!=meal)
  }

  addRecipe() {
    console.log(this.recipeDetails)


    // 1.add ingredients ,instruction and mealArray to recipeDetails
    this.recipeDetails.ingredients = this.ingredients
    this.recipeDetails.instructions = this.instructions
    this.recipeDetails.mealType = this.mealArray

    const {name,ingredients,instructions,prepTimeMinutes,cookTimeMinutes,servings,cuisine,difficulty,caloriesPerServing,image,mealType} = this.recipeDetails


    if(name && ingredients!.length>0 && instructions!.length>0 && prepTimeMinutes && cookTimeMinutes && servings && cuisine && difficulty && caloriesPerServing && image && mealType!.length>0){
      this.api.addRecipeApi(this.recipeDetails).subscribe({
        next:(res:any)=>{
          alert("recipe successfully added to the collection")
          this.recipeDetails = {}
          this.ingredients = []
          this.instructions = []
          this.mealArray = []
          this.router.navigateByUrl("/admin/recipe-list")
        },
        error:(reason:any)=>{
          alert(reason.error)
          this.recipeDetails.name = ""
        }
      })
    }
    else{
      alert("please fill the form completely")
    }
    
  }

  editRecipe() {
    console.log(this.recipeDetails)


    // 1.add ingredients ,instruction and mealArray to recipeDetails
    this.recipeDetails.ingredients = this.ingredients
    this.recipeDetails.instructions = this.instructions
    this.recipeDetails.mealType = this.mealArray

    const {name,ingredients,instructions,prepTimeMinutes,cookTimeMinutes,servings,cuisine,difficulty,caloriesPerServing,image,mealType} = this.recipeDetails


    if(name && ingredients!.length>0 && instructions!.length>0 && prepTimeMinutes && cookTimeMinutes && servings && cuisine && difficulty && caloriesPerServing && image && mealType!.length>0){
      this.api.updateRecipeApi(this.id,this.recipeDetails).subscribe((res:any)=>{
          alert("recipe successfully updated")
          this.recipeDetails = {}
          this.ingredients = []
          this.instructions = []
          this.mealArray = []
          this.router.navigateByUrl("/admin/recipe-list")
        
      })
    }
    else{
      alert("please fill the form completely")
    }
    
  }

}
