import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { HttpService } from '../../http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { SMSRecipientCategory } from '../../Interfaces/SMSRecipientCategory';
import { SMSRecipient } from '../../Interfaces/SMSRecipient';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-upload-number',
  standalone: true,
  imports: [MatInputModule, MatButtonModule, FormsModule, ReactiveFormsModule, MatCardModule, MatIcon],
  templateUrl: './upload-number.component.html',
  styleUrl: './upload-number.component.css'
})
export class UploadNumberComponent {
  formBuilder = inject(FormBuilder);
  httpService = inject(HttpService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  display = new FormControl();

  smsRecipientCategory: SMSRecipientCategory = {
    Id: 0, Name: '', Description: '', IsActive: true, InsertedBy: '', InsertedDateTime: new Date(),
    SmsRecipients: []
  };

  smsRecipient: SMSRecipient = {
    Id: 0, PhoneNumber: '', IsActive: true, SmsRecipientCategoryId: this.smsRecipientCategory.Id,
    InsertedBy: '', InsertedDateTime: new Date()
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
                const mobileNumbers = lines.slice(1)
                  .map(line => line.trim())
                  .filter(line => line !== ''); // Remove empty lines
                console.log(mobileNumbers);

                this.mobileNumbers = mobileNumbers;
                this.display.setValue(file.name); 
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
    this.smsRecipientCategory.SmsRecipients = this.mobileNumbers.map(number => ({
      Id: 0,
      PhoneNumber: number,
      IsActive: true,
      SmsRecipientCategoryId: this.smsRecipientCategory.Id,
      InsertedBy: '',
      InsertedDateTime: new Date()
    }));

    this.httpService.CreateRecipientCategory(this.smsRecipientCategory)
      .subscribe(response => {
        console.log('Response from backend:', response);
        alert("Members Improted Successfully");
        this.router.navigateByUrl("/create-employee");
      }, error => {
        console.error('Error from backend:', error);
      });
  }

}
