import { Component } from '@angular/core';
import { FirestoreService } from '../services/data/firestore.service'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {



  user_city =""
  user_state =""

  states = []
  cities = []

  selected_cites= []

  
  file: File = null
  imageUrl = null
  uploadFileUrl = null
  public createUserForm: FormGroup;
  constructor(private firestoreService: FirestoreService,
    formBuilder: FormBuilder
  ) {

    this.states  =  firestoreService.states
    this.cities = firestoreService.cities
    this.createUserForm = formBuilder.group({
      userName: ['', Validators.required],
      userEmail: ['', Validators.required],
      userNumber: ['', Validators.required],
     
    });
  }

  async createUser() {
    console.log(this.createUserForm.value.userCity)
    this.firestoreService.presentLoading()

    const param ={
      user_name: this.createUserForm.value.userName,
      user_email : this.createUserForm.value.userEmail,
      user_number : this.createUserForm.value.userNumber,
       user_state : this.user_state,
       user_city : this.user_city,
       user_img_url:this.uploadFileUrl
    }
    console.log(param)
  const user  = await this.firestoreService.createUser(param)
 console.log(user['id'])
      this.firestoreService.dismissLoading()
  }


  getImage(event) {
    this.file = event.target['files'][0]
    const reader = new FileReader()
    reader.readAsDataURL(this.file);
    reader.onload = (_event) => {
      this.imageUrl = reader.result;
    }
  }

  uploadImage = async () => {
    this.firestoreService.presentLoading()
    this.uploadFileUrl = await this.firestoreService.uploadFile(this.file)
    console.log(this.uploadFileUrl)
    this.firestoreService.dismissLoading()
  }

  chooseState = (event) =>{
const state_name = this.states.find( data => data.id == event.target.value)['name']
this.user_state = state_name
this.selected_cites = this.cities.filter( data => data.state_id ==  event.target.value)
  }


  chooseCity = (event) =>{
    console.log(event.target.value)
    this.user_city = event.target.value
  }
}
