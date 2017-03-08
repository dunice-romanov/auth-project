import { Component } from '@angular/core';
import { Response } from '@angular/http'
import { LoginService } from './login.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [LoginService]
})
export class AppComponent {

	isAuthenticated: boolean;

	data: string;
	constructor(private loginService: LoginService) {
		this.isAuthenticated = false;
	}

	ngOnInit() {
		console.log(this.isAuthenticated);
	}

	isAuth() {
		console.log(this.loginService.isAuthenticated())
	}
}
