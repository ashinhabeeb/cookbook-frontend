import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiServicesService } from '../services/api-services.service';


@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [HeaderComponent,ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

  demomail:string='abc@gamil.com'

  constructor(private api: ApiServicesService){}

  testimonialGroup = new FormGroup({
    name: new FormControl("",Validators.required),
    email : new FormControl("",Validators.required),
    message : new FormControl("",Validators.required)
  })

  addTestimonial(){
    console.log(this.testimonialGroup.value)

    const {name,email,message} = this.testimonialGroup.value

    if(!name || !email || !message){
      alert('please full the form completely')
    }

    if(this.testimonialGroup.invalid){
      alert('please full the form completely')
    }

    else{
      this.api.addTestimonialApi(this.testimonialGroup.value).subscribe({
        next:(result:any)=>{
          console.log(result)
          alert('testimonial added successfully')
          this.testimonialGroup.reset()
        },
        error:(err:any)=>{
          console.log(err)
        }
      })
    }
  }
}
