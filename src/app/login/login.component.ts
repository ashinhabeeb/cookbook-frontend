import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ApiServicesService } from '../services/api-services.service';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')])
  })

  constructor (private api:ApiServicesService , private router:Router){}

  login(){
    console.log(this.loginForm.value)
    if(this.loginForm.invalid){
      Swal.fire({
        title:'oops',
        text:'plaes fill the form completely',
        icon:'warning'
      })
    }
    else{
      this.api.loginApi(this.loginForm.value).subscribe({
        next:(res:any)=>{
          console.log(res)
          Swal.fire({
            title:'WoW',
            text:'Login Successfull',
            icon:'success'
          })
          this.loginForm.reset()
          sessionStorage.setItem('existinguser',JSON.stringify(res.existinguser))
          sessionStorage.setItem('token',res.token)
          // get chart data
          this.api.getChartData()
          if(res.existinguser.role=='admin'){
            this.router.navigateByUrl('/admin')
          }
          else{
            this.router.navigateByUrl('/')
          }
        },
        error:(err:any)=>{
          if(err.status==404 || err.status==406){
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
}
