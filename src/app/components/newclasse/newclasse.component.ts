import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClassEntity } from 'src/app/Entity/classEntity';

@Component({
  selector: 'app-newclasse',
  templateUrl: './newclasse.component.html',
  styleUrls: ['./newclasse.component.css']
})
export class NewclasseComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<NewclasseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ClassEntity,) { }

  ngOnInit(): void {
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }


}
