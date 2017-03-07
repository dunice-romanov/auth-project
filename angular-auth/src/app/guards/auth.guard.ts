import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs/Rx";
import { Injectable } from '@angular/core';

import { LoginService } from "../login.service"

@Injectable()
export class AuthGuard implements CanActivate{
 
 	constructor(private loginService: LoginService) { }

    canActivate() {
        return this.loginService.isAuthenticated();
    }
}