import { Component, OnInit, inject } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student } from '../../Interfaces/student';
@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [MatFormFieldModule],
  templateUrl: './student-form.component.html',
  styleUrl: './student-form.component.css'
})
export class StudentFormComponent implements OnInit {
  formbuilder = inject(FormBuilder)
  students!: Student[];
  

  studentform = this.formbuilder.group({
    name: ['',Validators.required],
    age: [0,Validators.required],
    email: ['',Validators.email],
    sdepartment: ['',Validators.required],
    status: ['',Validators]
  });

  ngOnInit(): void {
    
  }

 

}
