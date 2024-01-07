import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from '../models/Employee';
import { BaseEmployeeComponent } from '../base-employee/base-employee.component';

@Component({
    selector: 'app-add-employee',
    templateUrl: './add-employee.component.html',
    styleUrls: ['../app.component.css']
})
export class AddEmployeeComponent extends BaseEmployeeComponent {
    override ngOnInit() {
        this.employeeService.getSkillSetItems().subscribe(
            data => {
                this.skillSetItems = data;
            },
            error => {
                console.error('Error fetching skill set items', error);
            }
        );
    }

    public onSubmit(form: NgForm) {
        if (form.valid) {
            if (this.checkValidity(form) === false) {
                return;
            }

            let employee: Employee = {
                lastName: form.value.lastName,
                firstName: form.value.firstName,
                street: form.value.street,
                postcode: form.value.postcode,
                city: form.value.city,
                phone: form.value.phone,
                skillSet: form.value.skillSet
            };

            this.employeeService.createEmployee(employee).subscribe(
                response => {
                    this.router.navigate(['/']);
                },
                error => {
                    console.error('Error creating employee', error);
                }
            );
        }
    }
}
