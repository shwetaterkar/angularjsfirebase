import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ListService } from 'src/app/services/list.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { List } from 'src/app/models/List';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { NONE_TYPE } from '@angular/compiler';
@Component({
  selector: 'app-listform',
  templateUrl: './listform.component.html',
  styleUrls: ['./listform.component.css']
})
export class ListformComponent implements OnInit {
  selectedFile!: File;


  id: string = "";
  list: List = {
    id: "",
    amenities: "",
    bathrooms: "",
    bedrooms: "",
    description: "",
    property_address: "",
    title: "",
    vacancy: "",
    property_type: "",
    created_on: null
  }

  constructor(
    private _listService: ListService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') as string;
    this._listService.getList(this.id).subscribe(p => this.list = p);
    console.log(this.id);
  }

  save(listForm: NgForm) {
    console.log("listform: ", listForm);
    let dateStamp = new Date();
    // listForm[created_on] = dateStamp;
    this._listService.addApart(listForm.value);
    this.router.navigate(["/"]);
  }

  update(listForm: NgForm) {
    this._listService.updateList(listForm.value, this.id);
    this.router.navigate(["/"]);

  }

  delete() {
    if (confirm("Are you sure you want to delete?")) {
      this._listService.deleteList(this.id);
      this.router.navigate(["/"]);
    }
  }
  onFileSelected(event: any){
    this.selectedFile = <File>event.target.files[0];
  }

  onUpload(){
   const fd = new FormData();
   fd.append('image', this.selectedFile, this.selectedFile.name);
   this.http.post('gs://homeawayfromhome-c0bc6.appspot.com', fd)
   .subscribe(res => {
     console.log(res);
   })
  }


}
