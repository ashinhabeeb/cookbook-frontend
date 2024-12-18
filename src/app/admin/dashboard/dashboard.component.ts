import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ApiServicesService } from '../../services/api-services.service';
import * as Highcharts from 'highcharts';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    
  }
  selected = new Date()
  isSidebarOpen:boolean = true
  userCount:number = 0
  recipeCount:number = 0
  downloadCount:number = 0
  requestCount:number = 0

  ngOnInit(): void {
    this.getUSerCount()
    this.getRecipeCount()
    this.getDownloadCount()
    this.getRequestCount()
  }

  constructor(private router:Router,private api:ApiServicesService){

    if(localStorage.getItem("chart")){
      let chartData = JSON.parse(localStorage.getItem("chart")||"")
      this.chartOptions = {
        chart:{
          type:'bar'
        },
        title:{
          text:'Analysis of Download Recipes Based on Cuisine',
          align:'left'
        },
        xAxis:{
          type:'category'
        },
        yAxis:{
          title:{
            text:'Total Download Recipe Count'
          }
        },
        legend:{
          enabled:false
        },
        credits:{
          enabled:false
        },
        series:[{
          name:"cuisine",
          colorByPoint:true,
          type:'bar',
          data:chartData
        }]
      }
    }
    
  }

  

  getUSerCount(){
    this.api.allUserApi().subscribe((res:any)=>{
      this.userCount = res.length
    })
  }

  getRecipeCount(){
    this.api.getAllRecipesApi().subscribe((res:any)=>{
      this.recipeCount = res.length
    })
  }

  getDownloadCount(){
    this.api.allDownloadListAPi().subscribe((res:any)=>{
      this.downloadCount = res.map((item:any)=>item.count).reduce((a:any,b:any)=>a+b)
      console.log(res)
      
    })
  }

  getRequestCount(){
    this.api.getAllTestimonials().subscribe((res:any)=>{
      this.requestCount = res.filter((item:any)=>item.status=='pending').length
    })
  }


  menuBtnClick(){
    this.isSidebarOpen = !this.isSidebarOpen
  }

  logoutAdmin(){
    sessionStorage.clear()
    localStorage.clear()
    this.router.navigateByUrl("/")
  }



}
