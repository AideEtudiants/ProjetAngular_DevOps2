import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {
  
  constructor(
   public  router :Router,
   public rout:Router,
   public authenticationService :AuthenticationService, 
   ){}
   get currentUser() : any {
     return this.authenticationService.CurrentUserValue;
   }
   get isConnected() :boolean{
    return localStorage.getItem('user') == null ? false : true ;
  }
 
  ngOnInit(): void {
  }
  changementDePage() {
    this.router.navigate(['produits']);
  }
  

  seConnecter(){
    this.rout.navigate(['/usersFrm']);
  }

}
