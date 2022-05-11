import { Component, OnInit } from '@angular/core';

export interface Adresse {
  lat:number;
  lng:number;
}
const adresse : Adresse[]= [
  {lat: 48.88510403963977,lng:2.104852108775351},
  {lat:48.90402319860365, lng:2.2135600651649536},
  {lat:48.849493421570386, lng:2.3439694650462357},
  {lat:48.80302515642947, lng:2.28861459088588},
  {lat:48.83378402314114, lng:2.4722627046535917},
  {lat:48.69894774547896, lng:2.1579826063956884},
  {lat:48.833725400927484, lng:2.3758946524826183},
  {lat:48.86069062739783, lng:2.352924405792517},
  {lat:48.884981573072594, lng:2.109562890262513},
]

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  title:string = 'Localisation de tous les cours';
  lat:number = 48.88510403963977
  lng:number = 2.104852108775351
  data=adresse

  constructor() { }

  ngOnInit(): void {
    
  }
 
}
