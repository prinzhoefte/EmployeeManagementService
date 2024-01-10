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

    private transformData(data: any[]): any[] {
        return data.map(employee => ({
            ...employee,
            skillSet: employee.skillSet.map((skill: { skill: string; id: number }) => skill.skill).join(', ')
        })).sort((a, b) => a.id - b.id);
    }

    private setupDataSource() {
        this.employeesChunks = this.chunkArray(this.data, this.itemsPerPage);
        this.totalPages = this.employeesChunks.length;
        this.dataSource.data = this.employeesChunks[this.currentPage - 1] || [];
    }

    private chunkArray(array: any[], size: number): any[][] {
        const chunkedArray = [];
        for (let i = 0; i < array.length; i += size) {
            chunkedArray.push(array.slice(i, i + size));
        }
        return chunkedArray;
    }

    public updateItemsPerPage(value: number) {
        this.itemsPerPage = value;
        this.setupDataSource();
    }

    public updateFilterField(event: any) {
        this.selectedFilterField = event.value;
    }

    public getFilteredColumns(): string[] {
        return this.displayedColumns.filter(column => column !== 'actions');
    }

    public applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filterPredicate = (data: any, filter: string) => {
            const dataStr = JSON.stringify(data[this.selectedFilterField]).toLowerCase();
            return dataStr.includes(filter.trim().toLowerCase());
        };
    
        this.dataSource.data = this.data;
        this.dataSource.filter = filterValue.trim().toLowerCase();
        this.employeesChunks = this.chunkArray(this.dataSource.filteredData, this.itemsPerPage);
        this.employeesChunks.length === 0 ? this.totalPages = 1 : this.updateTotalPages();
        this.dataSource.data = this.employeesChunks[this.currentPage - 1] || [];
    }

    public onDelete(id: number) {
        this.router.navigate(['/deleteEmployee', id]);
    }

    public onEdit(id: number) {
        this.router.navigate(['/updateEmployee', id]);
    }

    public onNextPage() {
        if (this.currentPage < this.totalPages) {
            this.currentPage++;
            this.dataSource.data = this.employeesChunks[this.currentPage - 1];
        }
    }

    public onPreviousPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.dataSource.data = this.employeesChunks[this.currentPage - 1];
        }
    }

    private updateTotalPages() {
        this.totalPages = this.employeesChunks.length;
    }
}
