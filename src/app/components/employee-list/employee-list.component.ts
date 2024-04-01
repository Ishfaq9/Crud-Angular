import { Component, inject } from '@angular/core';
import { IEmployee } from '../../Interfaces/employee';
import { HttpService } from '../../http.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, RouterLink],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})

export class EmployeeListComponent {
  router=inject(Router)
  employeeList: IEmployee[] = [];
  httpService = inject(HttpService);
  displayedColumns: string[] = ['id', 'name', 'description', 'price', 'quantity', 'Action'];
  ngOnInit() {
    this.GetEmployeeList();
  }
GetEmployeeList(){
  this.httpService.getAllEmployee().subscribe(result => {
    this.employeeList = result;
  });
}

  edit(id:number){
    console.log(id);
    this.router.navigateByUrl("/employee/"+id);
  }

  Delete(id:number){
  this.httpService.deleteEmployee(id).subscribe(result=>{
    console.log("deleted");
    this.GetEmployeeList();
  })
  }

}
