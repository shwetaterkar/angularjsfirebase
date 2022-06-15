import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ListService } from 'src/app/services/list.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { List } from 'src/app/models/List';
@Component({
  selector: 'app-listform',
  templateUrl: './listform.component.html',
  styleUrls: ['./listform.component.css']
})
export class ListformComponent implements OnInit {

  id: string = "";
  list: List = {
    id: "",
    apartment:"",
    vacancy:"",
    location:""
    }
  constructor(
    private _listService: ListService, 
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') as string;
    this._listService.getList(this.id).subscribe(p => this.list = p);
    console.log(this.id);
  }

  save(listForm: NgForm){
   this._listService.addApart(listForm.value);
    this.router.navigate(["/"]);
  }

  update(listForm: NgForm){
    this._listService.updateList(listForm.value, this.id);
    this.router.navigate(["/"]);

  }

  delete(){
    if(confirm("Are you sure you want to delete?")){
      this._listService.deleteList(this.id);
      this.router.navigate(["/"]);
    }
  }
 
  
}
