import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IEmployee } from './Interfaces/employee';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
apiurl="https://localhost:44379";
  http= inject(HttpClient);
  constructor() { }
  getAllEmployee(){
    return this.http.get<IEmployee [] >(this.apiurl+ "/api/Brand/GetAll/GetAll") 
  }

  createEmployee(employee:IEmployee){

    return this.http.post(this.apiurl+"/api/Brand/Addnew/Addnew",employee);
  }

  getEmployee(employeeId:number){
    return this.http.get<IEmployee >(this.apiurl+"/api/Brand/Edit/"+employeeId);
  }

  updateEmployee(employeeId:number,employee:IEmployee){
    return this.http.put(this.apiurl+"/api/Brand/Update?id="+employeeId,employee);
  }

  deleteEmployee(employeeId:number){
    return this.http.delete<IEmployee>(this.apiurl+"/api/Brand/Delete/"+employeeId);
  }
}
