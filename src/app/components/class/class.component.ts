import { Component, OnInit, Inject} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import {  Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ClassService } from '../../services/class/classService.service';
import { ClassEntity } from '../../Entity/classEntity';
import { NewclasseComponent } from '../newclasse/newclasse.component';
import {ClassUser} from "../../Entity/ClassUser";
import { UserService } from '../../services/user/user-service.service';
import { User } from '../../Entity/UserEntity';
import { CartService } from '../../services/cart/cart.service';
import { AuthenticationService } from '../../services/user/user.service';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})

export class ClassComponent implements OnInit {
  classList : ClassEntity[];
  options: any=[];
  public totalItem : number ;
  data:any=''
  user: User;
  public name : string;
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
        this.newclasse = result;
        this.newclasse.userId = this. currentUser.id;
        this.classService.addClass(this.newclasse).subscribe({
        next :()=>{
          this.getAllclass();
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
    this.router.navigate(['/localisationCours']);
  }

  ParticiperCours(idUser:number,idClass:number,): void {
    this.classService.getClassById(idClass).subscribe((data:ClassEntity) => {
        this.classActuelle = data;
       
        const dialogRef = this.dialog.open(ParticiperForm, {
          width: '400px',
          data: this.classActuelle,
        }
        );
        dialogRef.afterClosed().subscribe(() => {
        let userClass = new ClassUser(idUser,idClass);
        this.classService.addUserToClass(userClass).subscribe();
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
    this.classService.getClassById(this.data?.id).subscribe((classes:ClassEntity) => {
      this.data = classes;
      this.userService.getUserById(classes.userId).subscribe(result => {
        this.name = result.firstName+ " " + result.lastName.toUpperCase();
      });
      this.classService.nbrParticipants(this.data?.id)
      .subscribe((res : number) =>{
         this.nbrParticipants = res;
      });

    }) 
  }
  onNoClick(): void {
    this.dialogRef.close();

  }
}
