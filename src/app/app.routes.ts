import { Routes } from '@angular/router';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import { EmployeeMasterComponent } from './components/employee-master/employee-master.component';
import { StudentFormComponent } from './components/student-form/student-form.component';

export const routes: Routes = [
    {
        path:"",
        component:EmployeeListComponent
    },
    {
        path:"employee-list",
        component:EmployeeListComponent
    },
    {
        path:"create-employee",
        component:EmployeeFormComponent
    },
    {
        path:"employee/:id",
        component:EmployeeFormComponent
    },
    {
        path:"create-master",
        component:EmployeeMasterComponent
    },
    {
        path:"student-form",
        component:StudentFormComponent
    },
];
