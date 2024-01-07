import { Component } from '@angular/core';
import { BaseEmployeeComponent } from '../base-employee/base-employee.component';

@Component({
    selector: 'app-delete-employee',
    templateUrl: './delete-employee.component.html',
    styleUrls: ['./delete-employee.component.css', '../app.component.css']

})
export class DeleteEmployeeComponent extends BaseEmployeeComponent {
    public onDelete() {
        this.employeeService.deleteEmployee(this.id).subscribe(() => {
            this.router.navigate(['/home']);
        });
    }
}
