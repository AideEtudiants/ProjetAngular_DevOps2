import { Component, OnInit } from '@angular/core';

export interface Adresse {
  lat:number;
  lng:number;
}
const adresse : Adresse[]= [
  {lat: 48.88510403963977,lng:2.104852108775351},
  {lat:48.90402319860365, lng:2.2135600651649536},
  {lat:48.849493421570386, lng:2.3439694650462357}
]

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    
  }
  title = 'My first AGM project';
  lat= 48.88510403963977
  lng=2.104852108775351
  data=adresse
}
