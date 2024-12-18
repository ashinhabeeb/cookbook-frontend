import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { ApiServicesService } from '../services/api-services.service';

@Component({
  selector: 'app-save-recipes',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './save-recipes.component.html',
  styleUrl: './save-recipes.component.css'
})
export class SaveRecipesComponent implements OnInit{

  allsavedRecipe:any[]=[]

  constructor(private api:ApiServicesService){}

  ngOnInit(): void {
    this.getSavedRecipes()
  }

  getSavedRecipes(){
    this.api.getAllSavedRecipesApi().subscribe({
      next:(res:any)=>{
        console.log(res)
        this.allsavedRecipe=res
      },
      error:(err:any)=>{
        console.log(err)
      }
    })
  }

  removeRecipe(id:string){
    this.api.delteSavedRecipesApi(id).subscribe({
      next:(res:any)=>{
        console.log(res)
        this.getSavedRecipes()
      },
      error:(err:any)=>{
        console.log(err)
      }
    })
  }
}
