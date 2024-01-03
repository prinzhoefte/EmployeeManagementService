import { Component } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee } from '../models/Employee';

@Component({
    selector: 'app-add-employee',
    templateUrl: './add-employee.component.html',
    styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent {
    constructor(private employeeService: EmployeeService, private router: Router) { }

    skillSetItems: any[] = [];

    ngOnInit() {
        this.employeeService.getSkillSetItems().subscribe(
            data => {
                this.skillSetItems = data;
            },
            error => {
                console.error('Error fetching skill set items', error);
            }
        );
    }

    onSubmit(form: NgForm) {
        if (form.valid) {
            if (form.value.postcode.length != 5) {
                alert("Postcode must be 5 digits");
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
                    console.log('Employee created successfully', response);
                    this.router.navigate(['/']);
                },
                error => {
                    console.error('Error creating employee', error);
                }
            );
        }
    }

    onCancel() {
        this.router.navigate(['/']);
    }
}
