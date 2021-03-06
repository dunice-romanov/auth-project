import { Component, OnInit, Input } from '@angular/core';

import { LoginService } from '../login.service'

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

	readonly TEXT_HOME = 'Home';
	readonly TEXT_LOGIN = 'Login';
	readonly TEXT_REGISTER = 'Register';
	readonly TEXT_LOGOUT = 'Logout';
	readonly TEXT_BRAND = 'My own homepage';
	
	constructor(private loginService: LoginService) { }

	ngOnInit() {
	}
	
	/*
	Logout user by clicking the button
	*/
	onClickLogout() {
		this.loginService.logout();
	}


}
