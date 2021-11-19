import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GroceryModel } from 'src/app/groceryList.model';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  modalForm: FormGroup;
  items: any;
  groceryModel: GroceryModel = new GroceryModel();

  constructor(private fb: FormBuilder, private http: HttpService) {}

  ngOnInit(): void {
    this.modalForm = this.fb.group({
      title: [''],
      items: [''],
    });

    this.getGroceries();
  }

  //Get List of groceries
  getGroceries() {
    this.http.getList().subscribe((res) => {
      this.items = res;
    });
  }

  //Post groceries
  postGroceries() {
    this.groceryModel.title = this.modalForm.value.title;
    this.groceryModel.items = this.modalForm.value.items;

    this.http.postList(this.groceryModel).subscribe((res) => {
      console.log(res);
      let cnl = document.getElementById('cancle');
      cnl?.click();
      this.modalForm.reset();
      this.getGroceries();
    });
  }

  //Edit Grocery List
  editGroceries(items: any) {
    this.groceryModel.id = items.id;
    this.modalForm.controls['title'].setValue(items.title);
    this.modalForm.controls['items'].setValue(items.items);
  }

  //Update List
  updateList() {
    this.groceryModel.title = this.modalForm.value.title;
    this.groceryModel.items = this.modalForm.value.items;
    this.http
      .editList(this.groceryModel, this.groceryModel.id)
      .subscribe((res) => {
        alert('Grocery List Added');
        let cnl = document.getElementById('cancle');
        cnl?.click();
        this.modalForm.reset();
        this.getGroceries();
      });
  }

  //Delete Grocery List
  deleteGrocery(items: any) {
    this.http.deleteList(items.id).subscribe((res) => {
      alert('List Deleted');
      this.getGroceries();
    });
  }
}
