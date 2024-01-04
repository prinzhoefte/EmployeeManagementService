import { Component } from '@angular/core';
import { Employee } from '../models/Employee';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';

@Component({
    template: '',
})
export class BaseEmployeeComponent {
    skillSetItems: any[] = [];
    id: number = 0;
    employee: Employee = {};
    selectedSkills: any[] = [];

    constructor(protected employeeService: EmployeeService, protected router: Router) { }

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

    onCancel(): void {
        this.router.navigate(['/']);
    }
}
