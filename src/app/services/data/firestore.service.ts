import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage'
import { LoadingController } from '@ionic/angular';
import { async } from '@angular/core/testing';


@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  states = [{
    'name': 'state 1',
    'id': 1
  }, {
    'name': 'state 2',
    'id': 2
  },
  {
    'name': 'state 3',
    'id': 3
  },
  {
    'name': 'state 4',
    'id': 4
  }
  ]
  cities = [{
    'name': 'ciyt 1',
    'id': 1,
    'state_id':1
  }, {
    'name': 'city 2',
    'id': 2,
    'state_id':2
  },
  {
    'name': 'city 3',
    'id': 3,
    'state_id':3
  },
  {
    'name': 'city 4',
    'id': 4,
    'state_id':4
  },
  {
    'name': 'city 5',
    'id': 4,
    'state_id':2
  },
  {
    'name': 'city 5',
    'id': 5,
    'state_id':4
  }
  ]
  
  loader : HTMLIonLoadingElement  = null
  constructor(private firestore: AngularFirestore,
    private firestorage: AngularFireStorage,
    private loadingController: LoadingController
    ) {


   }

  async uploadFile(file){
  const ref = await  this.firestorage.ref('images')
  const child_ref =  await  ref.child(Date.now().toString())
  await  child_ref.put(file)
  return await child_ref.getDownloadURL().toPromise()
  //   const timepstamp = Date.now().toString()
  //   console.log(timepstamp)
  //   var storageRef = await this.firestorage.ref('images')
  //   storageRef.child(timepstamp).put(file)

  //  return  await storageRef.getDownloadURL().toPromise()
    
  // console.log(url)
  // return url;
    
    // .then( data =>{
    //   console.log(data)
    // },err => {
    //   console.log(err)
    // })
    
   }

   createUser =  async (param) =>{
 const res =await    this.firestore.firestore.collection('userList').add(param)
console.log(res)
return res
    
   }

   getAllusers =   () =>{
    let users = []
  return this.firestore.collection('userList').valueChanges({ idField: 'id' })

  }
   updateUserDetails = async (id ,param) =>{
    const res = await    this.firestore.firestore.collection('userList').doc(id).update(param)
    console.log(res)
  }

  deleteUser = async(user_id) =>{
    return  await this.firestore.doc(`userList/${user_id}`).delete();
  }
 
   async presentLoading() {
    this.loader = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
    });
    await this.loader.present();

    // const { role, data } = await loading.onDidDismiss();
    // console.log('Loading dismissed!');
  }

  async dismissLoading() {
    await this.loader.dismiss()
  }

 
}
