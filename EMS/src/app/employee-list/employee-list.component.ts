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
    displayedColumns = ['id', 'lastName', 'firstName', 'street', 'postcode', 'city', 'phone', 'skillSet', 'actions'];
    employeesChunks: any[][] = [];
    dataSource = new MatTableDataSource<any>();
    employees$: Observable<any[]>;
    currentPage = 1;
    itemsPerPage = 10;
    itemsPerPageOptions = [5, 10, 15, 20, 25, 30];
    totalPages = 0;
    data: any[] = [];

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

    selectedFilterField = 'id';

    constructor(private employeeService: EmployeeService, private router: Router) {
        this.employees$ = this.employeeService.getEmployees();
        this.employees$.subscribe(data => {
            this.data = this.transformData(data);
            this.setupDataSource();
        });
    }

    transformData(data: any[]): any[] {
        return data.map(employee => ({
            ...employee,
            skillSet: employee.skillSet.map((skill: { skill: string; id: number }) => skill.skill).join(', ')
        })).sort((a, b) => a.id - b.id);
    }

    setupDataSource() {
        this.employeesChunks = this.chunkArray(this.data, this.itemsPerPage);
        this.totalPages = this.employeesChunks.length;
        this.dataSource.data = this.employeesChunks[this.currentPage - 1] || [];
    }

    chunkArray(array: any[], size: number): any[][] {
        const chunkedArray = [];
        for (let i = 0; i < array.length; i += size) {
            chunkedArray.push(array.slice(i, i + size));
        }
        return chunkedArray;
    }

    updateItemsPerPage(value: number) {
        this.itemsPerPage = value;
        this.setupDataSource();
    }

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
