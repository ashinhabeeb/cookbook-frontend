import { Component, OnInit } from '@angular/core';
import { ApiServicesService } from '../services/api-services.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-view-recipes',
  standalone: true,
  imports: [HeaderComponent,RouterLink],
  templateUrl: './view-recipes.component.html',
  styleUrl: './view-recipes.component.css'
})
export class ViewRecipesComponent implements OnInit {

  Recipe:any = {}
  Relrecipes:any=[]
  constructor(private api:ApiServicesService, private Aroute:ActivatedRoute){}

 

  ngOnInit(): void {
    this.Aroute.params.subscribe((res:any)=>{
      const {id} = res
       this.getRecipe(id)
       this.relatedRecipe()
    })
   
  }

  getRecipe(id:string){
    this.api.viewRecipeApi(id).subscribe({
      next:(res:any)=>{
        console.log(res)
        this.Recipe=res
      },
      error:(err:any)=>{
        console.log(err)
      }
    })
  }

  relatedRecipe(){
    this.api.getAllRecipesApi().subscribe((res:any)=>{
      console.log(res)
      for(let x of this.Recipe.mealType){
        let p = res.filter((item:any)=>item.mealType.includes(x))
        console.log(p)
        this.Relrecipes = p.slice(0,4)
      }
    })
  }

  downloadRecipe(){

    const recipeDetails={
      name:this.Recipe.name,
      cuisine:this.Recipe.cuisine,
      image:this.Recipe.image
    }
    console.log(recipeDetails)
    this.api.downloadRecipeApi(this.Recipe._id,recipeDetails).subscribe({
      next:(res:any)=>{
        console.log(res)
        // call get chart data
        this.api.getChartData()
        this.generatePdf()

      },
      error:(err:any)=>{
        console.log(err)
        
        Swal.fire({
          title:"oops",
          text:"download Failed",
          icon:"error"
        })
      }
    })
  }

  generatePdf(){
    //1.create instance for the jspdf
    const pdf = new jsPDF()
    //2. heading
    pdf.setFontSize(16)
    pdf.setTextColor("green")
    pdf.text(this.Recipe.name,70,10)
    //3.body
    pdf.setFontSize(12)
    pdf.setTextColor('black')
    pdf.text(`Cuisine : ${this.Recipe.cuisine}`,10,20)
    pdf.text(`Servings : ${this.Recipe.Servings}`,10,30)
    pdf.text(`Mode of Cooking : ${this.Recipe.difficulty}`,10,40)
    pdf.text(`Preparation Time : ${this.Recipe.prepTimeMinutes}`,10,50)
    pdf.text(`Cooking Time : ${this.Recipe.cookTimeMinutes}`,10,60)
    pdf.text(`Calories Per Servings : ${this.Recipe.caloriesPerServing}`,10,70)

    //table  - ingredients, instructions
    let head = [["ingredients","instructions"]]
    let body = []
    body.push([this.Recipe.ingredients,this.Recipe.instructions])
    //to create table
    autoTable(pdf,{head,body,startY:100})
    //to open that pdf in new tab
    pdf.output('dataurlnewwindow')
    //download the pdf with given name
    pdf.save(`${this.Recipe.name}-recipe-download.pdf`)
  }

  savedRecipe(){
    const {_id, name, cuisine, image} = this.Recipe


    this.api.savedRecipesApi({id:_id,name,cuisine,image}).subscribe({
      next:(res:any)=>{
        console.log(res)
        Swal.fire({
          title:'wow',
          text:'recipe saved successfully',
          icon:'success'
        })
      },
      error:(err:any)=>{
        console.log(err)

        if(err.status==406){
          Swal.fire({
            title:'oops',
            text:err.error,
            icon:'warning'
          })
        }
        else{
          Swal.fire({
            title:'oops',
            text:'something went wrong',
            icon:'error'
          })
        }
      }
    })
  }
}
