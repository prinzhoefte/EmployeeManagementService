import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeService } from '../employee.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector: 'app-employee-list',
    templateUrl: './employee-list.component.html',
    styleUrls: ['./employee-list.component.css']
})

export class EmployeeListComponent {
    displayedColumns: string[] = ['id', 'lastName', 'firstName', 'street', 'postcode', 'city', 'phone', 'skillSet', 'actions'];
    employeesChunks: any[][] = [];
    dataSource = new MatTableDataSource();
    employees$: Observable<any[]>;
    currentPage: number = 1;
    pageSize: number = 10;
    totalPages: number = 0;

    constructor(private employeeService: EmployeeService, private router: Router) {
        this.employees$ = this.employeeService.getEmployees();
        this.employees$.subscribe(data => {
            const transformedData = data.map(employee => ({
                ...employee,
                skillSet: employee.skillSet.map((skill: { skill: string; id: number; }) => skill.skill).join(', ')
            }));
            transformedData.sort((a, b) => a.id - b.id);
            this.employeesChunks = this.chunkArray(transformedData, this.pageSize);
            this.dataSource.data = this.employeesChunks[this.currentPage - 1] || [];
            this.totalPages = this.employeesChunks.length;
        });
    }

    chunkArray(array: any[], size: number): any[][] {
        const chunkedArray = [];
        for (let i = 0; i < array.length; i += size) {
            chunkedArray.push(array.slice(i, i + size));
        }
        return chunkedArray;
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
        this.router.navigate(['/deleteEmployee', id]);
    }

    onEdit(id: number) {
        this.router.navigate(['/updateEmployee', id]);
    }

    onNextPage() {
        if (this.currentPage < this.totalPages) {
            this.currentPage++;
            this.dataSource.data = this.employeesChunks[this.currentPage - 1];
        }
    }

    onPreviousPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.dataSource.data = this.employeesChunks[this.currentPage - 1];
        }
    }
}