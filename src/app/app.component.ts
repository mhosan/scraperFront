import { Component, OnInit  } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  https: any;
  constructor(private http: HttpClient) { }
  
  title = 'app';

  ngOnInit() {
    console.log('AppComponent.ngOnInit()');

    this.http.get('https://api.countapi.xyz/hit/visits')
    .subscribe(data => {
      console.log(data["value"]);
    }, error => {
      console.log(error);
    });
  }
  resetearContador() {
    this.http.get('https://api.countapi.xyz/hit/nonexisting')
    .subscribe(data => {
      console.log(data["value"]);
    }, error => {
      console.log(error);
    });
  }

}
