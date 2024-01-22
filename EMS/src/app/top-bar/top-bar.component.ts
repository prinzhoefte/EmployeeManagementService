import { Component } from '@angular/core';
import Keycloak from 'keycloak-js';

@Component({
    selector: 'app-top-bar',
    templateUrl: './top-bar.component.html',
    styleUrls: ['./top-bar.component.css', '../app.component.css']
})
export class TopBarComponent {
    keycloak = new Keycloak({
        url: 'http://localhost:8180/',
        realm: 'EMS',
        clientId: 'web-auth'
    });

    constructor() {
        this.initKeycloak();
    }

    private initKeycloak() {
        this.keycloak.init({ onLoad: 'login-required' }).then(authenticated => {
            if (this.keycloak.token) {
                localStorage.setItem("token", this.keycloak.token);
            }
        }).catch(err => {
            console.log(err);
        });
    }

    showLogoutDialog = false;

    public logout() {
        this.keycloak.logout();
        localStorage.removeItem("token");
        this.showLogoutDialog = false;
    }

    public cancelLogout(): void {
        this.showLogoutDialog = false;
    }
}
