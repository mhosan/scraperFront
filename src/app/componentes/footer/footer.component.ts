import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  public visitas: number;
  constructor(private http: HttpClient) { }
  ngOnInit(): void {
    console.log('AppComponent.ngOnInit()');

    this.http.get('https://api.countapi.xyz/hit/argengis.dx.am/visits')
    .subscribe(data => {
      console.log(data["value"]);
      this.visitas = data["value"];
    }, error => {
      console.log(error);
    });
  }

}
