import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { IEmployee } from '../../Interfaces/employee';
import { HttpService } from '../../http.service';
import { ActivatedRoute, Router } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [MatInputModule,MatButtonModule,FormsModule,ReactiveFormsModule,MatCardModule,MatIcon],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css'
})
export class EmployeeFormComponent {
formBuilder = inject(FormBuilder);
httpService =inject(HttpService);
router =inject(Router);
route=inject(ActivatedRoute);
display = new FormControl();

employeeForm= this.formBuilder.group({
  name:['',[Validators.required]],
  description:['',[Validators.required]],
  price:[0,[Validators.required]],
  quantity:[0,[Validators.required]]
});
isEdit=false; 

employeeId!:number;
  mobileNumbers!: string[];



ngOnInit(){
this.employeeId = this.route.snapshot.params['id'];

if(this.employeeId){
  this.isEdit=true;
  this.httpService.getEmployee(this.employeeId).subscribe(result=>{
console.log(result);
this.employeeForm.patchValue(result);
  });
}
}

handleFileInputChange(files: FileList | null): void {
  if (files) {
    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);
      if (file) {
        this.display.setValue(file.name); // Displaying only the first file name for simplicity
        this.readFile(file);
      }
    }
  }
}

readFile(file: File): void {
  const reader = new FileReader();

  reader.onload = (event: ProgressEvent<FileReader>) => {
    if (event.target && event.target.result) {
      const fileContent = event.target.result as string;
      //console.log(fileContent);
      const lines = fileContent.split('\n');
      if (lines.length > 0 && lines[0].trim() === 'MobileNumber') {
        this.mobileNumbers = lines.slice(1) // Exclude the header
                                    .map(line => line.trim())
                                    .filter(line => line !== ''); // Remove empty lines
        console.log(this.mobileNumbers);
      } else {
        console.log('Header "Mobile Number" not found.');
        // Handle case where header is not found
        this.mobileNumbers = [];
      }

    }
  };

  reader.readAsText(file);
}

save(){
  const employee:IEmployee={
    
    name: this.employeeForm.value.name!,
    description: this.employeeForm.value.description!,
    price: this.employeeForm.value.price!,
    quantity: this.employeeForm.value.quantity!

  };
  if(this.isEdit){
    this.httpService.updateEmployee(this.employeeId,employee).subscribe(()=>{
      console.log("update");
    this.router.navigateByUrl("/employee-list");
     });
  }
  else{
  
     this.httpService.createEmployee(employee).subscribe(()=>{
      console.log("sucesss");
    this.router.navigateByUrl("/employee-list");
     });
  }

}
}


