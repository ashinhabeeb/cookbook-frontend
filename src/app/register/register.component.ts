import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApiServicesService } from '../services/api-services.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  
    registerForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.pattern('[a-zA-z]*')]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')])
  })

  constructor(private api:ApiServicesService, private router:Router){}

  register(){
    console.log(this.registerForm.value)
    if(this.registerForm.invalid){
      // alert('please fill the form completely')
      Swal.fire({
        title:'Oops',
        text:'please fill the form completely',
        icon:'info'
      })

    }
    else{
      this.api.registerApi(this.registerForm.value).subscribe({
        next:(res:any)=>{
          console.log(res)
          // alert(`welcome ${res.username}`)
          Swal.fire({
            title:'WoW',
            text:`welcome ${res.username}`,
            icon:'success'
          })
          this.registerForm.reset()
          this.router.navigateByUrl('/login')
        },
        error:(err:any)=>{
          console.log(err)
          if(err.status==406){
            // alert(err.error)
            Swal.fire({
              title:'Oops',
              text:err.error,
              icon:'error'
            })
            this.registerForm.reset()
          }
          else{
            // alert('something went wrong')
            Swal.fire({
              title:'Oops',
              text:'something went wrong',
              icon:'error'
            })
          }
        }
      })
    }
  }
}
