import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/user/user.service';

@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.css']
})
export class UserloginComponent implements OnInit {
  isLoginError : boolean = false;
  constructor(private userService : AuthenticationService,private router : Router) { }
  ngOnInit() {
  }

    OnSubmit(userName : string,password : string ){
     this.userService.login(userName,password).subscribe((data : any)=>{
      this.router.navigate(['/']);
    },
    (err : HttpErrorResponse)=>{
      console.log(err)
      this.isLoginError = true;
    });
  }
}
