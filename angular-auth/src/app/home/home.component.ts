import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	private username: string;

  constructor(private loginService: LoginService) { 
  	this.username = '';
  }

  ngOnInit() {
  	this.username = this.loginService.getUsername();
  }



}
