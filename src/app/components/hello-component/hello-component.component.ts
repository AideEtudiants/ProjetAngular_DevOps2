import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HelloService } from '../../services/hello/hello-service.service';

@Component({
  selector: 'app-hello-component',
  templateUrl: './hello-component.component.html',
  styleUrls: ['./hello-component.component.css']
})
export class HelloComponent implements OnInit {
  hello : string='' ; 
  constructor(private service : HelloService) { }

  ngOnInit(): void {
    this.service.getMessage().subscribe((data :string )=>{
       this.hello = data;
  
    },
    (error:HttpErrorResponse)=>{
      alert(error.message)
    }
    );  
  }

}
