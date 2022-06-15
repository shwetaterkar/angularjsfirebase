import { Component, OnInit } from '@angular/core';
import { CrudService } from '../service/crud.service'
// import 'rxjs/add/operator/toPromise';
import {FirebaseTSApp} from 'firebasets/firebasetsApp/firebaseTSApp';
import {FirebaseTSFirestore} from 'firebasets/firebasetsFirestore/firebaseTSFirestore'
import * as firebase from 'firebase/compat';
import { config } from 'rxjs';

@Component({
  selector: 'app-main-app',
  templateUrl: './main-app.component.html',
  styleUrls: ['./main-app.component.css']
})
export class MainAppComponent implements OnInit {

  dataRef!: USER;
  successMessage: string = '';
  username: string = '';

  subscription: any;

  userRecords: any = [];
  users: any = [];
  user: USER[] = [];
  tmp: any =[];

  private firestore!: FirebaseTSFirestore;
  dataRef1: any;
  constructor(
    private crudService: CrudService
  ) {
    const firebaseConfig = {
      apiKey: "AIzaSyBgXEeC09U9J6lir4Wdez5yNxq7SB76lZ4",
      authDomain: "homeawayfromhome-c0bc6.firebaseapp.com",
      databaseURL: "https://homeawayfromhome-c0bc6-default-rtdb.firebaseio.com",
      projectId: "homeawayfromhome-c0bc6",
      storageBucket: "homeawayfromhome-c0bc6.appspot.com",
      messagingSenderId: "843386431667",
      appId: "1:843386431667:web:a80162e1f2d333f1bae8c6"
    };
    FirebaseTSApp.init(firebaseConfig);
    
    this.firestore = new FirebaseTSFirestore();
    this.firestore.getDocument(
      {path: ["user","14mAnK6Wjkc1GknGLns"],
        onComplete: (result: any) => {
          this.dataRef=<USER>result.data();
          alert(this.dataRef.username)
        },
        onFail: (err: any) => {
          alert("FAILED")
        }}
      
    )
  };



  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.subscription = this.crudService.getUsers()
      .subscribe((resp: any)=> {
        this.userRecords = resp.docs;
        console.log("userRecords: ", this.userRecords);
        console.log("users: ", this.users);
        console.log(resp);
        this.tmp = resp;

      });
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  resetForm() {
    this.username = '';
  }
  title = 'homeawayfromhome';

  createRecord() {
    let Record: any = {};
    Record['username'] = this.username;

    this.crudService.createUser(Record).then((res: any) => {
      this.resetForm();
      alert("User is created!");
      console.log(res);
    }).catch((error: any) => {
      console.log(Error);
    });
  }

  deleteRecord() {
    let Record: any = {};
    Record['username'] = this.username;

    this.crudService.deleteUser(Record).then((res: any) => {
      this.resetForm();
      alert("User is deleted!");
      console.log(res);
    }).catch((error: any) => {
      console.log(Error);
    });
  }

  updateRecord() {

  }

  
}

export interface USER{
  username: string;
 }
function connections(connections: any): any {
  throw new Error('Function not implemented.');
}

function path(path: any, arg1: never[], onComplete: any, arg3: (result: any) => void, onFail: any, arg5: (err: any) => void) {
  throw new Error('Function not implemented.');
}

function onComplete(path: (path: any, arg1: never[], onComplete: any, arg3: (result: any) => void, onFail: any, arg5: (err: any) => void) => void, arg1: never[], onComplete: any, arg3: (result: any) => void, fail: (e?: any) => void, arg5: (err: any) => void) {
  throw new Error('Function not implemented.');
}

