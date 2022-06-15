import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { List } from '../models/List';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private afs: AngularFirestore) { }
  getLists(): Observable<List[]>{
   // return this.afs.collection<List>("list").valueChanges()
   return this.afs.collection<List>("list")
                  .snapshotChanges()
                  .pipe(
                    map((changes : any)=> changes.map((c: any)=>
                    (
                      {
                        id: c.payload.doc.id,
                        ... c.payload.doc.data( )
                      }
                    )
                    ))
                  ); 
  }
  getList(id: string): Observable<List>{
   // return this.afs.doc<List>('lists/${id}')
   return this.afs.collection("list").doc(id)
            .snapshotChanges()
            .pipe(
              map((action: any)=> {
                if(action.payload.exists === false){
                  return new Object as List

                }else{
                  const data = action.payload.data() as List;
                  data.id = action.payload.id;
                  return data;
                }
              })
            )

  }
  addApart(list: List): void {
    this.afs.collection<List>("list").add(list);
  }

  updateList(list: List, listId: string): void{
    this.afs.collection<List>("list").doc(listId).update(list);

  }

  deleteList(listId: string): void{
    //this.afs.doc<List>('list/${listId}').delete();
    this.afs.collection<List>("list").doc(listId).delete();
  }

}
