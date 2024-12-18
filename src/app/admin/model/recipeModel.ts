

export class RecipeModel {

    name?:string
    ingredients?:Array<string>
     instructions?:Array<string>
     prepTimeMinutes?:number
     cookTimeMinutes?:number
     servings?:number
     cuisine?:string
     difficulty?:string
     caloriesPerServing?:number
     image?:string
     mealType?:Array<string>
}