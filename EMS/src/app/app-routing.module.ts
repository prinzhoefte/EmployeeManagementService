import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeListComponent } from "./employee-list/employee-list.component";
import { AddEmployeeComponent } from "./add-employee/add-employee.component";
import { ProfileComponent } from "./profile/profile.component";

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: EmployeeListComponent },
    { path: 'addEmployee', component: AddEmployeeComponent },
    { path: 'profile', component: ProfileComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
