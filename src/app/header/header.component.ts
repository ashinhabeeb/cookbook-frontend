import { Component, OnInit } from '@angular/core';
import { Route, Router, RouterLink } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

isLogin:boolean = false
name:string =""

constructor(private router:Router){}

  ngOnInit(): void {
    if(sessionStorage.getItem("token")){
      this.isLogin=true
      this.name = JSON.parse(sessionStorage.getItem('existinguser')||"").username
    }
    console.log(this.isLogin)
  }

  logout(){
    sessionStorage.clear()
    localStorage.clear()
    this.router.navigateByUrl('/')

  }
}
