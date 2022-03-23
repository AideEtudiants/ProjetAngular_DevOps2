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


@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})

export class classComponent implements OnInit {
  classList : ClassEntity[];
  private map: L.Map;
  // @ViewChild('map')
  // private mapContainer: ElementRef<HTMLElement>;
  options: any=[];
  data:any=''
  user: User;
  public nbrParticipants : number;
  classActuelle: any;
  userActuel:ClassUser;
  newclasse:ClassEntity = new ClassEntity(null,4,"","","","");
  constructor(protected classService : ClassService,
    protected toastService : ToastrService,
    protected router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,private userService : UserService) { }

  ngOnInit(): void {
    this.getAllclass();
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
        console.log(this.newclasse);
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
      console.log(this.classList)
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
         console.log(this.classActuelle);
         this.classService.nbrParticipants(this.classActuelle.id)
         .subscribe(res=>{
            this.nbrParticipants = res;
            console.log( this.nbrParticipants)
         });
         }) 
         console.log(this.classActuelle)
       //this.userService.getUserById(idUser).subscribe
       const dialogRef = this.dialog.open(ParticiperForm, {
         width: '400px',
         data: this.classActuelle,
        }
       );
      
       dialogRef.afterClosed().subscribe(result => {
         this.classService.addUserToClass(this.userActuel).subscribe()
       });
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
    @Inject(MAT_DIALOG_DATA) public data:ClassEntity
 
  ) {}
  ngOnInit(): void {
    this.classService.getClassById(this.data?.id).subscribe((res:ClassEntity) => {
      this.data = res;
      console.log("2"+this.data);
      this.classService.nbrParticipants(this.data?.id)
      .subscribe(res=>{
         this.nbrParticipants = res;
      });
      this.userService.getNamebyId(this.data?.userId).subscribe(resu=>{
        this.name = resu;
     });
    }) 
  }
  onNoClick(): void {
    this.dialogRef.close();

  }
}
