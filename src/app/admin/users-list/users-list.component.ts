import { Component, OnInit } from '@angular/core';
import { ApiServicesService } from '../../services/api-services.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent implements OnInit {

  allUsers:any = []

  constructor (private api:ApiServicesService){}

  ngOnInit(): void {
    this.getAllUsers()
  }

  getAllUsers(){
    this.api.allUserApi().subscribe((res:any)=>{
      this.allUsers = res
      console.log(this.allUsers)
    })
  }
}
