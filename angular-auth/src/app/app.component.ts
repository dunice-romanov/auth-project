import { Component } from '@angular/core';
import { Response } from '@angular/http'
import { LoginService } from './login.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

	constructor(private login: LoginService) {
	}

	ngOnInit() { }

	isAuth() {
		console.log(`isAuth: ${this.login.isAuthenticated()}`)
	}
}
