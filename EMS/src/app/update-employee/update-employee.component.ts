import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EmployeeUpdate } from '../models/Employee';
import { BaseEmployeeComponent } from '../base-employee/base-employee.component';

@Component({
    selector: 'app-update-employee',
    templateUrl: './update-employee.component.html',
    styleUrls: ['../app.component.css']
})
export class UpdateEmployeeComponent extends BaseEmployeeComponent {
    onSubmit(form: NgForm): void {
        if (form.valid) {
            if (this.checkValidity(form) === false) {
                return;
            }

            const skillSet = form.value.skillSet.map((skill: any) => skill.id);
            
            const updateEmployee: EmployeeUpdate = {
                ...form.value,
                skillSet
            };

            this.employeeService.updateEmployee(updateEmployee, this.id).subscribe(
                response => {
                    this.router.navigate(['/']);
                },
                error => console.error('Error updating employee', error)
            );
        }
    }
}
