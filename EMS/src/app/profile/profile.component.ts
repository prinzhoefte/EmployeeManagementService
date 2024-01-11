import { Component } from '@angular/core';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css', '../app.component.css']
})
export class ProfileComponent {
    username: string = "Default";
    email: string = "Default";

    constructor() {
        let token = localStorage.getItem("token");
        if (token) {
            let decodedToken = this.getDecodedAccessToken(token);
            this.username = decodedToken.preferred_username;
            this.email = decodedToken.email;
        }

        this.username = (this.username == undefined) ? "Not set by user" : this.username;
        this.email = (this.email == undefined) ? "Not set by user" : this.email;
    }

    private getDecodedAccessToken(token: string): any {
        return token ? JSON.parse(atob(token.split('.')[1])) : null;
    }
}
