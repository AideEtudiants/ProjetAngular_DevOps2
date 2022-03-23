import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {
  
  constructor(
   public  router :Router,
   public rout:Router
  ) { }

  ngOnInit(): void {
  }
  changementDePage() {
    this.router.navigate(['produits']);
  }
  

  seConnecter(){
    this.rout.navigate(['/usersFrm']);
  }

}
