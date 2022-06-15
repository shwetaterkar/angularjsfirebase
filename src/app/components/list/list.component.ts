import { Component, OnInit } from '@angular/core';
import { List } from 'src/app/models/List';
import {ListService} from 'src/app/services/list.service'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  lists: List[] = [];
  constructor(private _listService: ListService) { }

  ngOnInit(): void {
    this._listService.getLists().subscribe((p: List[])=>{
      //console.log(p);
      this.lists = p;
    });
   
  }

}
