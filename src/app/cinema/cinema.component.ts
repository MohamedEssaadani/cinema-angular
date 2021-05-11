import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styleUrls: ['./cinema.component.css']
})
export class CinemaComponent implements OnInit {

 public queryResult: any;

private url = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get(this.url+"/villes")
      .subscribe(data=>{
       this.queryResult = data;
      }, error =>{
        console.log(error);
      })
  }

}
