import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(public fireservices:AngularFirestore) { }

  createUser(Record: any)
  {
    return this.fireservices.collection('user').add(Record);
  }

  deleteUser(record: any) {
    return this.fireservices.collection('user').doc(record.username).delete();
  }

  getUsers() {
    return this.fireservices.collection('user').get();
  }

  
}
