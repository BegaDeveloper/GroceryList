import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  //GET METHOD
  getList() {
    return this.http.get('http://localhost:3000/posts').pipe(
      map((res) => {
        return res;
      })
    );
  }

  //POST METHOD
  postList(data: any) {
    return this.http.post('http://localhost:3000/posts', data).pipe(
      map((res) => {
        return res;
      })
    );
  }

  //EDIT METHOD
  editList(data: any, id: number) {
    return this.http.put('http://localhost:3000/posts/' + id, data).pipe(
      map((res) => {
        return res;
      })
    );
  }

  //DELETE METHOD
  deleteList(id: number) {
    return this.http.delete('http://localhost:3000/posts/' + id).pipe(
      map((res) => {
        return res;
      })
    );
  }
}
