import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { RouterLink } from '@angular/router';
import { ApiServicesService } from '../services/api-services.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  allRecipes:any[]=[]
  approvedTestimonials:any[]=[]

  constructor(private api:ApiServicesService){}

 ngOnInit(): void {
   this.getAllRecipes()
   this.getApprovedTestimonials()
 }


  getAllRecipes(){
    this.api.getAllRecipesApi().subscribe({
      next:(result:any)=>{
        // console.log(result)
        this.allRecipes=result.slice(0,3)
        console.log(this.allRecipes)
        
      },
    error:(err:any)=>{
      console.log(err)
    }
    })
  }

  getApprovedTestimonials(){
    this.api.getApprovedTestimonialsApi().subscribe((res:any)=>{
      this.approvedTestimonials = res
      console.log(this.approvedTestimonials)
    })
  }
}
