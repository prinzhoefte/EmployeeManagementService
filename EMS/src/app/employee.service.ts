import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Employee, EmployeeUpdate } from './models/Employee';

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {
    private apiUrl = 'http://localhost:8089';

    employees$: Observable<Employee[]>;

    constructor(private http: HttpClient) {
        this.employees$ = this.getEmployees();
    }

    getEmployees(): Observable<Employee[]> {
        return this.http.get<Employee[]>(`${this.apiUrl}/employees`);
    }

    getEmployee(id: number): Observable<Employee> {
        return this.http.get<Employee>(`${this.apiUrl}/employees/${id}`);
    }

    createEmployee(employee: Employee): Observable<Employee> {
        return this.http.post<Employee>(`${this.apiUrl}/employees`, employee);
    }

    updateEmployee(employee: EmployeeUpdate, id: Number): Observable<EmployeeUpdate> {
        return this.http.put<EmployeeUpdate>(`${this.apiUrl}/employees/${id}`, employee);
    }

    deleteEmployee(id: number): Observable<Employee> {
        return this.http.delete<Employee>(`${this.apiUrl}/employees/${id}`);
    }

    getSkillSetItems(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/qualifications`);
    }

    //Get skill endpoint (useless? Because the skills are send with the normal request aswell)
    getSkillOfEmployee(id: number): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/employees/${id}/qualifications`);
    }

    //Maybe use this for updating the employee, if only the skills are changed
    addSkillToEmployee(id: number, skill: string): Observable<any[]> {
        return this.http.post<any[]>(`${this.apiUrl}/employees/${id}/qualifications`, skill);
    }

    deleteSkillFromEmployee(id: number, skill: any): Observable<HttpEvent<any[]>> {
        return this.http.delete<any[]>(`${this.apiUrl}/employees/${id}/qualifications`, skill);
    }
}