import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../services/data/firestore.service'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-editlist',
  templateUrl: './editlist.page.html',
  styleUrls: ['./editlist.page.scss'],
})
export class EditlistPage {



  states = []
  cities = []
  user_city = ""
  user_state = ""

  selected_cites = []

  user_details = null

  

  file: File = null
  imageUrl = null
  uploadFileUrl = null
  public createUserForm: FormGroup;
  constructor(private firestoreService: FirestoreService,
    formBuilder: FormBuilder,
    activateRoute: ActivatedRoute
  ) {
    activateRoute.queryParams.subscribe(data => {
      console.log(data)
      this.user_details = JSON.parse(data['data'])
      console.log(this.user_details)
      this.uploadFileUrl = this.user_details['user_img_url']
      this.states = firestoreService.states
      this.cities = firestoreService.cities
      this.user_city =   this.user_details['user_city']
      this.user_state =   this.user_details['user_state']
      const state_id = this.states.find( data => data.name == this.user_details.user_state)['id']
      console.log(state_id)
      this.selected_cites = this.cities.filter( data => data.state_id ==  state_id)
      this.createUserForm = formBuilder.group({
        userName: [this.user_details.user_name, Validators.required],
        userEmail: [this.user_details.user_email, Validators.required],
        userNumber: [this.user_details.user_number, Validators.required],
        userState:[state_id],
        userCity:[this.user_details.user_city]
      });
    })
    // route.snapshot.paramMap.get('cat_id')
   

  }

  async updateUser() {
    console.log(this.user_details)
    console.log(this.createUserForm.value.userCity)
    this.firestoreService.presentLoading()

    const param = {
      user_name: this.createUserForm.value.userName,
      user_email: this.createUserForm.value.userEmail,
      user_number: this.createUserForm.value.userNumber,
      user_state: this.user_state,
      user_city: this.user_city,
      user_img_url: this.uploadFileUrl
    }
    console.log(param)
    const user = await this.firestoreService.updateUserDetails(this.user_details['id'], param)
    // console.log(user['id'])
    this.firestoreService.dismissLoading()
  }


  getImage(event) {
    this.file = event.target['files'][0]
    const reader = new FileReader()
    reader.readAsDataURL(this.file);
    reader.onload = (_event) => {
      this.uploadFileUrl = reader.result;
    }
  }

  uploadImage = async () => {
    this.firestoreService.presentLoading()
    this.uploadFileUrl = await this.firestoreService.uploadFile(this.file)
    console.log(this.uploadFileUrl)
    this.firestoreService.dismissLoading()
  }

  chooseState = (event) => {
    const state_name = this.states.find(data => data.id == event.target.value)['name']
    this.user_state = state_name
    this.selected_cites = this.cities.filter(data => data.state_id == event.target.value)
  }


  chooseCity = (event) => {
    console.log(event.target.value)
    this.user_city = event.target.value
  }
}

