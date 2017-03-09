import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { LoginService } from './login.service';
import { User } from './user';

@Injectable()
export class UserListService {

  readonly URL = "http://127.0.0.1:8000/users/";
  readonly HEADER_AUTHORIZATION = 'Authorization';
  readonly HEADER_JWT = 'JWT';

  constructor(private http: Http,
  			  private loginService: LoginService) { }

  /*
  	Send get request to server(URL) with authorization token from loginService
  	Returns User[] if ok,
  	Throws error if error
  */
  getUserList() {
	let headers: Headers = new Headers ({'Content-Type':  'application/json;charset=utf-8'});
	headers.append(this.HEADER_AUTHORIZATION, 
					this.HEADER_JWT + ' ' +	this.loginService.getTokenString());
  	return this.http.get(this.URL, {headers: headers})
  			 .map((response: Response) => { 
  			 	return this.parseToUserArray( response.json() ) })
  			 .catch((error: any) => Observable.throw(error)); 			//throw error
  			 
  }

  private parseToUserArray(response: Object[]) {
  	let users: User[] = [];
  	response.forEach(function(item) {
  		let user = new User(item['username'], item['password']);
  		users.push(user);
  	});
  	return users;
  }
}
