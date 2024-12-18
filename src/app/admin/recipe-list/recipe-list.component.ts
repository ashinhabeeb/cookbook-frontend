import { Component, OnInit } from '@angular/core';
import { ApiServicesService } from '../../services/api-services.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent implements OnInit {

  allRecipes:any=[]
  searchRecipe:string=""

  ngOnInit(): void {
    this.getAllRecipes()
  }

  constructor(private api:ApiServicesService){}

  getAllRecipes(){
    this.api.getAllRecipesApi().subscribe((res:any)=>{
      this.allRecipes=res
      console.log(this.allRecipes)
    })
  }

  deleteRecipe(id:string){
    this.api.deleteRecipeApi(id).subscribe((res:any)=>{
      this.getAllRecipes()
    })
  }
}
