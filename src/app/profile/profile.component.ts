import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { ApiServicesService } from '../services/api-services.service';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  profileImage:string="https://www.pngall.com/wp-content/uploads/5/Profile-Avatar-PNG.png"

  constructor(private api:ApiServicesService){}

  ngOnInit(): void {

    const user = JSON.parse(sessionStorage.getItem("existinguser")||"")
    
    if(user.profileImg){
      this.profileImage = user.profileImg
    }
    console.log(user)
  }
  

  

  getFIle(event:any){
    let uploadFile = event.target.files[0]
    // convert file into url
    let fr = new FileReader()
    fr.readAsDataURL(uploadFile)
    fr.onload = (event:any)=>{
      console.log(event.target)
      this.profileImage = event.target.result
    }
  }

  updateProfile(){
    this.api.editUserApi({profileImg:this.profileImage}).subscribe((res:any)=>{
      sessionStorage.setItem("existinguser",JSON.stringify(res))
      this.profileImage = res.profileImg
      alert("profile updated succesfully")
    })
  }

}
