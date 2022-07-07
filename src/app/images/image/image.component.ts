import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';
// import {finalize} from "rxjs/operators"

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {
 imgSrc: string | undefined;
  formTemplate = new FormGroup({
    caption : new FormControl(''),
    category: new FormControl(''),
    imageUrl : new FormControl('')
  })
  isSubmitted: boolean | undefined ;
  selectedImage:any = null;
  constructor(private storage:AngularFireStorage) { }
  
  ngOnInit(): void {
    this.resetForm();
  }

  showPreview(event: any){
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL = (event.target.files[0]);
      this.selectedImage = event.target.files[0];
    }
    else {
      this.imgSrc = '/assets/img/image_placeholder.png';
      this.selectedImage = null;
    }
  }
  onSubmit(formValue: any){
    this.isSubmitted = true;
    if(this.formTemplate.valid){
      var filePath = `${formValue.category}/${this.selectedImage.name}_${new Date().getTime()}`;
      
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath,this.selectedImage).snapshotChanges().pipe(
        finalize(()=>{
          fileRef.getDownloadURL().subscribe((url)=>{
            console.log("url: ", url);
            formValue['imageUrl']=url;
            this.resetForm();
          })
        })
      ).subscribe(); 
      
    }
  }
get formControls(){
  return this.formTemplate['controls'];
}

resetForm(){
  this.formTemplate.reset();
  this.formTemplate.setValue({
    caption:'',
    imageUrl:'',
    category:'Animal'
  });
  this.imgSrc ='assets/img/image_placeholder.png';
  this.selectedImage = null;
  this.isSubmitted = false;

}

}

export class MainModule { }