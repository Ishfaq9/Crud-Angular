import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { IEmployee } from '../../Interfaces/employee';
import { HttpService } from '../../http.service';
import { ActivatedRoute, Router } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { SMSRecipientCategory } from '../../Interfaces/SMSRecipientCategory';
import { SMSRecipient } from '../../Interfaces/SMSRecipient';
import { HttpErrorResponse } from '@angular/common/http';
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

smsRecipientCategory: SMSRecipientCategory = { Id: 0, Name: 'ishfaq', Description: 'ok', IsActive: true, InsertedBy: '', InsertedDateTime: new Date() };
smsRecipient: SMSRecipient = {
  Id: 0, PhoneNumber: '', IsActive: true, SmsRecipientCategoryId: 0, InsertedBy: '', InsertedDateTime: new Date(),
  SMSRecipients: []
};
selectedFile!: File;
mobileNumbers: string[] = [];

handleFileInputChange(files: FileList | null): void {
  if (files) {
    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);
      if (file) {
        const reader = new FileReader();
        
        reader.onload = (event: ProgressEvent<FileReader>) => {
          if (event.target && event.target.result) {
            const fileContent = event.target.result as string;
            const lines = fileContent.split('\n');
            if (lines.length > 0 && lines[0].trim() === 'MobileNumber') {
              const mobileNumbers = lines.slice(1) // Exclude the header
                .map(line => line.trim())
                .filter(line => line !== ''); // Remove empty lines
              console.log(mobileNumbers);
              
              this.mobileNumbers = mobileNumbers;
              this.display.setValue(file.name); // Displaying only the first file name for simplicity
            } else {
              console.log('Header "Mobile Number" not found.');
              alert('Invalid file format. Header "MobileNumber" not found.');
            }
          }
        };
        reader.readAsText(file);
      }
    }
  }
}
onSubmit(): void {
  if (!this.smsRecipientCategory.Name) {
    // Handle error: Name field is required
    console.error('The Name field is required.');
    return; // Prevent form submission
  }

  // Assign the mobileNumbers to the smsRecipient object
  this.smsRecipient.SmsRecipientCategoryId = this.smsRecipientCategory.Id;
  this.smsRecipient.SmsRecipientCategory = this.smsRecipientCategory;
  this.smsRecipient.SMSRecipients = this.mobileNumbers.map(number => ({
    Id: 0, // Initialize with appropriate values
    PhoneNumber: number,
    IsActive: true,
    SmsRecipientCategoryId: this.smsRecipientCategory.Id,
    InsertedBy: '',
    InsertedDateTime: new Date()
  }));
  const dataToSend = {
    smsRecipientCategory: this.smsRecipientCategory,
    smsRecipient: this.smsRecipient
  };
  // Call the service method to create recipient category
  this.httpService.CreateRecipientCategory(dataToSend)
    .subscribe(response => {
      console.log('Response from backend:', response);
      // Handle success or failure based on the response
    }, error => {
      console.error('Error from backend:', error);
      // Handle error
      if (error instanceof HttpErrorResponse && error.error && error.error.errors) {
        console.log('Validation errors:', error.error.errors);
        // Display or handle validation errors here
      }
    });
  
}


employeeForm= this.formBuilder.group({
  name:['',[Validators.required]],
  description:['',[Validators.required]],
  price:[0,[Validators.required]],
  quantity:[0,[Validators.required]]
});
isEdit=false; 

employeeId!:number;
mobileNumbers2!: string[];



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



/* handleFileInputChange(files: FileList | null): void {
  if (files) {
    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);
      if (file) {
        const reader = new FileReader();
        
        reader.onload = (event: ProgressEvent<FileReader>) => {
          if (event.target && event.target.result) {
            const fileContent = event.target.result as string;
            const lines = fileContent.split('\n');
            if (lines.length > 0 && lines[0].trim() === 'MobileNumber') {
              this.mobileNumbers = lines.slice(1) // Exclude the header
                .map(line => line.trim())
                .filter(line => line !== ''); // Remove empty lines
              console.log(this.mobileNumbers);
              this.display.setValue(file.name); // Displaying only the first file name for simplicity
            } else {
              console.log('Header "Mobile Number" not found.');
              alert('Invalid file format. Header "MobileNumber" not found.');
              this.mobileNumbers = [];
            }
          }
        };
        reader.readAsText(file);
      }
    }
  }
}
 */

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


