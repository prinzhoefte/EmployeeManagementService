import { Component } from '@angular/core';
import Keycloak from 'keycloak-js';

@Component({
    selector: 'app-top-bar',
    templateUrl: './top-bar.component.html',
    styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent {
    keycloak = new Keycloak({
        url: 'http://localhost:8180/',
        realm: 'EMS',
        clientId: 'web-auth'
    });

    constructor() {
        if (!this.keycloak.authenticated && !this.keycloak.token) {
            this.initKeycloak();
        } else {
            if(this.keycloak.token) {
                localStorage.setItem("token", this.keycloak.token);            
            }
        }
    }

    public logout() {
        this.keycloak.logout();
    }
    
    private initKeycloak() {
        this.keycloak.init({ onLoad: 'login-required' }).then(authenticated => {
            if(this.keycloak.token) {
                localStorage.setItem("token", this.keycloak.token);
            }
        }).catch(err => {
            console.log(err);
        });
    }
}
