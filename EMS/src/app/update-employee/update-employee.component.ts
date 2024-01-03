import { Component } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee } from '../Employee';

@Component({
    selector: 'app-update-employee',
    templateUrl: './update-employee.component.html',
    styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent {
    constructor(private employeeService: EmployeeService, private router: Router) { }

    skillSetItems: any[] = [];
    id = Number(this.router.url.split('/')[2]);
    employee: Employee = new Employee();
    skillSet = this.employeeService.getSkillOfEmployee(this.id);

    ngOnInit() {
        this.employeeService.getEmployee(this.id).subscribe(
            data => {
                this.employee = data;
                console.log("Skillset: " + this.employee.skillSet);
            },
            error => {
                console.error('Error fetching employee details', error);
            }
        );

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

            this.employee = {
                lastName: form.value.lastName,
                firstName: form.value.firstName,
                street: form.value.street,
                postcode: form.value.postcode,
                city: form.value.city,
                phone: form.value.phone,
                skillSet: form.value.skillSet
            };

            this.employeeService.updateEmployee(this.employee, this.id).subscribe(
                response => {
                    console.log('Employee updated successfully', response);
                    this.router.navigate(['/']);
                },
                error => {
                    console.error('Error updating employee', error);
                }
            );
        }
    }

    onCancel() {
        this.router.navigate(['/']);
    }
}

