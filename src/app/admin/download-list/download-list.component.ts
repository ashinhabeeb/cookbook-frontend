import { Component, OnInit } from '@angular/core';
import { ApiServicesService } from '../../services/api-services.service';


@Component({
  selector: 'app-download-list',
  templateUrl: './download-list.component.html',
  styleUrl: './download-list.component.css'
})
export class DownloadListComponent implements OnInit{

  allDownloadList:any=[]

  constructor (private api:ApiServicesService){}

  ngOnInit(): void {
    this.getAllDownloadList()
  }

getAllDownloadList(){
  this.api.allDownloadListAPi().subscribe((res:any)=>{
    this.allDownloadList = res
    console.log(this.allDownloadList)
  })
}

}
