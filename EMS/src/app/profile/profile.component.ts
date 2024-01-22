import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css', '../app.component.css']
})
export class ProfileComponent {
    username: string = "Default";
    email: string = "Default";

    constructor(private router: Router) {
        let token = localStorage.getItem("token");
        if (token) {
            let decodedToken = this.getDecodedAccessToken(token);
            this.username = decodedToken.preferred_username;
            this.email = decodedToken.email;
        } else {
            this.router.navigate(['/']);
        }

        this.username = (this.username == undefined) ? "Not set by user" : this.username;
        this.email = (this.email == undefined) ? "Not set by user" : this.email;
    }

    private getDecodedAccessToken(token: string): any {
        return token ? JSON.parse(atob(token.split('.')[1])) : null;
    }
}
