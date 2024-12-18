import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(allRecipes: any[], searchKey:string): any[] {

    let result:any[]=[]

    //logic
    if(!allRecipes || searchKey==""){
      return allRecipes
    }

    result=allRecipes.filter((item)=>item.name.toLowerCase().trim().includes(searchKey.toLowerCase().trim()))


    return result;
  }

}
