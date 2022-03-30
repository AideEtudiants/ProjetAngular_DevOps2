import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/Entity/UserEntity';
import { UserService } from 'src/app/services/user/user-service.service';


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {

  user: User;

  constructor(
    private route: ActivatedRoute,
      private router: Router,
        private userService: UserService) {
    this.user = new User();
  }

  onSubmit() {
    this.userService.save(this.user)
      .subscribe((data : any)=>{
        this.router.navigate(['/produit']);
      },
      (err : HttpErrorResponse)=>{
      });

  }

  gotoUserList() {
    this.router.navigate(['/users']);
  }
}
