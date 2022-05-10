import { Component, OnInit, Inject, ViewChild, ElementRef} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { RechercheService } from 'src/app/services/rechercheService.service';
import { ActivatedRoute, Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ClassService } from 'src/app/services/class/classService.service';
import { ClassEntity } from 'src/app/Entity/classEntity';
import { NewclasseComponent } from '../newclasse/newclasse.component';
import {ClassUser} from "../../Entity/ClassUser";
import { GoogleMap } from '@angular/google-maps';
import { UserService } from 'src/app/services/user/user-service.service';
import { User } from 'src/app/Entity/UserEntity';
import { CartService } from 'src/app/services/cart/cart.service';
import { AuthenticationService } from 'src/app/services/user/user.service';


@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})

export class classComponent implements OnInit {
  classList : ClassEntity[];
  options: any=[];
  public totalItem : number ;
  data:any=''
  user: User;
  public nbrParticipants : number;
  classActuelle: any;
  newclasse:ClassEntity = new ClassEntity(null,this.currentUser.id,"","","","");
  constructor(protected classService : ClassService,
    protected toastService : ToastrService,
    protected router: Router,
    public dialog: MatDialog,private userService : UserService,protected cartService : CartService, protected authenticationService :AuthenticationService,
    ) { }
    get currentUser() : any {
      return this.authenticationService?.CurrentUserValue;
    }

  ngOnInit(): void {
    this.getAllclass();
    this.totalProductInCart();
  }

  totalProductInCart(){
    this.cartService.getProducts(this.currentUser.id)
     .subscribe(res=>{
       this.totalItem = res?.length;
      })
  }
AjoutClass(){
  const dialogRef = this.dialog.open(NewclasseComponent, {
  width: '800px',
    data: {},
  });

  dialogRef.afterClosed().subscribe(result => {

    if(result!=null){
        this.getAllclass();
        this.newclasse = result;
        this.classService.addClass(this.newclasse).subscribe({
          next :(data)=>{
              this.toastService.success('Le class a ete ajouter')
          },
          error :()=>  this.toastService.error('Erreur lors de lajout')
  
      });
     this.router.navigate(['/cours']);
    }
});
}

getAllclass(){
  this.classService.getAllClass()
  .subscribe ((data :ClassEntity [] )=>{
      this.classList = data;
      },
  (error:HttpErrorResponse)=>{
      alert(error.message)
      this.toastService.error('Erreur')
      }
  );
}
  voirCart(){
    const dialogRef = this.dialog.open(GoogleMap);
  }

  ParticiperCours(idUser:number,idClass:number): void {
    this.classService.getClassById(idClass).subscribe((data:ClassEntity) => {
        this.classActuelle = data;
        this.userService.getUserById(idUser).subscribe
        const dialogRef = this.dialog.open(ParticiperForm, {
          width: '400px',
          data: this.classActuelle,
        }
        );
        dialogRef.afterClosed().subscribe(result => {
        let userClass = new ClassUser(idUser,idClass);
        this.classService.addUserToClass(userClass).subscribe()
      });
    })         
  }
}

@Component({
  selector: 'ParticiperForm',
  templateUrl: 'ParticiperForm.html',
})
export class ParticiperForm implements OnInit{
  public nbrParticipants : number;
  public name : string;
  constructor(
    public dialogRef: MatDialogRef<ParticiperForm>,
    public classService : ClassService,
    public userService : UserService,
    protected cartService : CartService,
    @Inject(MAT_DIALOG_DATA) public data:ClassEntity,
 
    public authenticationService :AuthenticationService,
   
    ){}
    get currentUser() : any {
      return this.authenticationService?.CurrentUserValue;
    }
  ngOnInit(): void {
    this.name = this.currentUser.firstName +" "+ this.currentUser.lastName.toUpperCase();
    this.classService.getClassById(this.data?.id).subscribe((res:ClassEntity) => {
      this.data = res;
      this.classService.nbrParticipants(this.data?.id)
      .subscribe(res=>{
         this.nbrParticipants = res;
      });

    }) 
  }
  onNoClick(): void {
    this.dialogRef.close();

  }
}
