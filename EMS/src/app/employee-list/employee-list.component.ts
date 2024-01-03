import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeService } from '../employee.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-employee-list',
    templateUrl: './employee-list.component.html',
    styleUrls: ['./employee-list.component.css']
})

export class EmployeeListComponent {
    displayedColumns: string[] = ['id', 'lastName', 'firstName', 'street', 'postcode', 'city', 'phone', 'skillSet', 'actions'];
    dataSource = new MatTableDataSource();
    employees$: Observable<any[]>;

    constructor(private employeeService: EmployeeService) {
        this.employees$ = this.employeeService.getEmployees();
        this.employees$.subscribe(data => {
            // Transform the skillSet data to a string representation
            const transformedData = data.map(employee => ({
                ...employee,
                skillSet: employee.skillSet.map((skill: { skill: string; id: number; }) => skill.skill).join(', ')
            }));
            this.dataSource.data = transformedData;
        });
    }

    filterTypeOptions: { [key: string]: string } = {
        'id': 'ID',
        'lastName': 'Last Name',
        'firstName': 'First Name',
        'street': 'Street',
        'postcode': 'Postcode',
        'city': 'City',
        'phone': 'Phone',
        'skillSet': 'Skill Set'
    };

    selectedFilterField: string = 'id';

    updateFilterField(event: any) {
        this.selectedFilterField = event.value;
    }

    getFilteredColumns(): string[] {
        return this.displayedColumns.filter(column => column !== 'actions');
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filterPredicate = (data: any, filter: string) => {
            const dataStr = JSON.stringify(data[this.selectedFilterField]).toLowerCase();
            return dataStr.includes(filter.trim().toLowerCase());
        };
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    onDelete(id: number) {
        this.employeeService.deleteEmployee(id).subscribe(data => {
            this.employees$ = this.employeeService.getEmployees();
            this.employees$.subscribe(data => {
                this.dataSource.data = data;
                const transformedData = data.map(employee => ({
                    ...employee,
                    skillSet: employee.skillSet.map((skill: { skill: string; id: number; }) => skill.skill).join(', ')
                }));
                this.dataSource.data = transformedData;
            });
        });
    }

    onEdit(id: number) {
        console.log('update');
    }
}