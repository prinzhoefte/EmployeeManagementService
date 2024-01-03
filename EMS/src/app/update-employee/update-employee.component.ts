import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee, EmployeeUpdate } from '../models/Employee';

@Component({
    selector: 'app-update-employee',
    templateUrl: './update-employee.component.html',
    styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {
    skillSetItems: any[] = [];
    id: number = 0;
    employee: Employee = {};
    selectedSkills: any[] = [];

    constructor(private employeeService: EmployeeService, private router: Router) { }

    ngOnInit(): void {
        this.id = Number(this.router.url.split('/')[2]);
        this.fetchEmployee();
        this.fetchSkillSetItems();
    }

    private fetchEmployee(): void {
        this.employeeService.getEmployee(this.id).subscribe(
            data => {
                this.employee = data;
                this.selectedSkills = this.employee.skillSet || [];
            },
            error => console.error('Error fetching employee details', error)
        );
    }

    private fetchSkillSetItems(): void {
        this.employeeService.getSkillSetItems().subscribe(
            data => this.skillSetItems = data,
            error => console.error('Error fetching skill set items', error)
        );
    }

    compareFn(item1: any, item2: any): boolean {
        return item1 && item2 ? item1.id === item2.id : item1 === item2;
    }

    onSubmit(form: NgForm): void {
        if (form.valid) {
            if (form.value.postcode.length !== 5) {
                alert("Postcode must be 5 digits");
                return;
            }

            const skillSet = form.value.skillSet.map((skill: any) => skill.id);
            
            const updateEmployee: EmployeeUpdate = {
                ...form.value,
                skillSet
            };

            this.employeeService.updateEmployee(updateEmployee, this.id).subscribe(
                response => {
                    console.log('Employee updated successfully', response);
                    this.router.navigate(['/']);
                },
                error => console.error('Error updating employee', error)
            );
        }
    }

    onCancel(): void {
        this.router.navigate(['/']);
    }
}
