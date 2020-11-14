import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../services/data/firestore.service'
import { Router, NavigationExtras } from '@angular/router';
import { async } from '@angular/core/testing';
@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  users = []
  constructor(private router:Router, private firestoreService: FirestoreService,) { }
search_list= []
  ngOnInit() {
   this.firestoreService.getAllusers().subscribe( data =>{
    this.users = data
    this.search_list = data
    console.log(data)
   })
  }

  goEditPage = (param) =>{
    let navigationExtras: NavigationExtras = {
      queryParams: {
        data: JSON.stringify(param)
      },
      // skipLocationChange: true
    }
    this.router.navigate(['/editlist'], navigationExtras)
  }

  deleteUser = async(id) =>{
    this.firestoreService.presentLoading()
    await this.firestoreService.deleteUser(id)
    this.firestoreService.dismissLoading()
  }

  search (event) {
    
    this.search_list = this.users.filter( data => 
      
 (data['user_city'].toLowerCase().includes(event.target.value) || data['user_state'].toLowerCase().includes(event.target.value))
    )
    
  }
}
