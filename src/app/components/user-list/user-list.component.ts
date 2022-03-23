import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Entity/UserEntity';
import { UserService } from 'src/app/services/user/user-service.service';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User[];

  constructor(private userService: UserService) {
  }

  ngOnInit() {  //Pour stocker tous les donnee de BE(bdd) a une list
    this.userService.findAll().subscribe(data => {
      this.users = data;
    });
  }
}
