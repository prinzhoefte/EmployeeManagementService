import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeListComponent } from "./employee-list/employee-list.component";

const routes: Routes = [
    { path: '', redirectTo: '/employeeList', pathMatch: 'full' },
    { path: 'employeeList', component: EmployeeListComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
