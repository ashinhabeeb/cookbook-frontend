import { Component, OnInit } from '@angular/core';
import { ApiServicesService } from '../../services/api-services.service';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrl: './request-list.component.css'
})
export class RequestListComponent implements OnInit {

  allTestimonials:any=[]

  constructor(private api:ApiServicesService){}

  ngOnInit(): void {
    this.getAllTestimonilas()
  }

  getAllTestimonilas(){
    this.api.getAllTestimonials().subscribe((res:any)=>{
      this.allTestimonials=res
      console.log(this.allTestimonials)
    })


  }

  editTestimonial(id:string,status:String){
    this.api.editTestimonialApi(id,status).subscribe((res:any)=>{
      this.getAllTestimonilas()
    })
  }
}
