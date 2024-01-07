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

    protected ngOnInit(): void {
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

    protected checkValidity(form: any): boolean {
        let ret = true;
        const nameRegex: RegExp = /^[a-zA-Z' \-\döüäÄÖÜßéÉèÈáÁíÍóÓúÚñÑçÇ]+$/;
        const addressRegex: RegExp = /^[a-zA-Z0-9öäüÖÄÜßéÉèÈáÁíÍóÓúÚñÑçÇ\s]+$/;
        const phoneNumberRegex: RegExp = /^[0-9+]{8,}$/;
        const postcodeRegex: RegExp = /^[0-9]{5}$/;
        if (!nameRegex.test(form.value.firstName)) {
            alert("First name must only contain letters");
            ret = false;
        }
        if (!nameRegex.test(form.value.lastName)) {
            alert("Last name must only contain letters");
            ret = false;
        }
        if (!addressRegex.test(form.value.street)) {
            alert("Street must only contain letters and numbers");
            ret = false;
        }
        if (!addressRegex.test(form.value.city)) {
            alert("City must only contain letters");
            ret = false;
        }
        if (!postcodeRegex.test(form.value.postcode)) {
            alert("Postcode must be 5 digits");
            ret = false;
        }
        if (!phoneNumberRegex.test(form.value.phone)) {
            alert("Phone number must only contain numbers and '+'");
            ret = false;
        }
        return ret;
    }

    public compareFn(item1: any, item2: any): boolean {
        return item1 && item2 ? item1.id === item2.id : item1 === item2;
    }

    public onCancel(): void {
        this.router.navigate(['/']);
    }
}
