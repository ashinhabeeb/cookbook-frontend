import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeModel } from '../admin/model/recipeModel';
import { subscribeOn } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServicesService {

  serverUrl: string = 'http://localhost:4009'

  constructor(private http: HttpClient) { }

  //api to get all recipes
  getAllRecipesApi() {
    return this.http.get(`${this.serverUrl}/all-recipe`)
  }

  //api to add testimonials
  addTestimonialApi(reqBody: any) {
    return this.http.post(`${this.serverUrl}/add-testimonial`, reqBody)
  }

  // api to register a user
  registerApi(reqBody: any) {
    return this.http.post(`${this.serverUrl}/register`, reqBody)
  }

  //api to login a user
  loginApi(reqBody: any) {
    return this.http.post(`${this.serverUrl}/login`, reqBody)
  }

  appendToken() {
    let headers = new HttpHeaders()
    const token = sessionStorage.getItem("token")
    if (token) {
      headers = headers.append("Authorization", `Bearer ${token}`)
    }
    return { headers }
  }

  //api to view recipe
  viewRecipeApi(id: string) {
    return this.http.get(`${this.serverUrl}/view-recipe/${id}`, this.appendToken())
  }

  //api to download recipe
  downloadRecipeApi(recipeId: String, recipeDetails: any) {
    return this.http.post(`${this.serverUrl}/download-recipe/${recipeId}`, recipeDetails, this.appendToken())
  }

  //api to add saved recipes
  savedRecipesApi(reqBody: any) {
    return this.http.post(`${this.serverUrl}/save-recipe`, reqBody, this.appendToken())
  }

  //api to get all saved-recipes
  getAllSavedRecipesApi() {
    return this.http.get(`${this.serverUrl}/get-allsaved-recipes`, this.appendToken())
  }

  //api to delete saved recipe
  delteSavedRecipesApi(recipeId: string) {
    return this.http.delete(`${this.serverUrl}/delete-saved-recipe/${recipeId}`, this.appendToken())
  }

  // api to edit user

  editUserApi(reqBody: any) {
    return this.http.post(`${this.serverUrl}/user/edit`, reqBody, this.appendToken())
  }

  // api to get all users in dashboard
  allUserApi() {
    return this.http.get(`${this.serverUrl}/all-users`, this.appendToken())
  }

  // api to get all download list
  allDownloadListAPi() {
    return this.http.get(`${this.serverUrl}/download-list`, this.appendToken())
  }

  // get all testimonials
  getAllTestimonials() {
    return this.http.get(`${this.serverUrl}/all-testimonials`, this.appendToken())
  }

  // api to edit testimonial status
  editTestimonialApi(testimonialId: String, status: String) {
    return this.http.get(`${this.serverUrl}/edit-testimonial/${testimonialId}?status=${status}`, this.appendToken())
  }

  // api to get approved testimonials
  getApprovedTestimonialsApi() {
    return this.http.get(`${this.serverUrl}/approved-testimonials`)
  }

  // api to add new Recipe
  addRecipeApi(reqBody: any) {
    return this.http.post(`${this.serverUrl}/add-recipe`, reqBody, this.appendToken())
  }

  // api to update/edit recipe
  updateRecipeApi(id: string, reqBody: RecipeModel) {
    return this.http.put(`${this.serverUrl}/recipe/edit/${id}`, reqBody, this.appendToken())
  }

  // api to delete recipe
  deleteRecipeApi(id: string) {
    return this.http.delete(`${this.serverUrl}/recipe/delete/${id}`, this.appendToken())
  }

  // get chart data
  getChartData() {
    this.allDownloadListAPi().subscribe((res: any) => {
      console.log(res)
      let downloadArrayList: any = []
      let output: any = {}

      res.forEach((item: any) => {
        let cuisine = item.recipecuisine
        let currentCount = item.count
        if (output.hasOwnProperty(cuisine)) {
          output[cuisine] += currentCount
        }
        else {
          output[cuisine] = currentCount
        }
      })
      console.log(output)
      for (let cuisine in output) {
        downloadArrayList.push({ name: cuisine, y: output[cuisine] })
      }
      console.log(downloadArrayList)
      localStorage.setItem("chart",JSON.stringify(downloadArrayList))
    })

  }
}
