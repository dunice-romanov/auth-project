import { Injectable } from '@angular/core';
import { Http } from '@angular/http'
import { RequestOptions, Headers, Response } from '@angular/http'

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { UserToken } from "./user"

@Injectable()
export class LoginService {

  readonly URL_HEAD = "http://127.0.0.1:8000/"
  readonly URL_SIGN_IN = "api-token-auth/";
  readonly URL_SIGN_UP = "api-signup/";
  readonly URL_REFRESH_TOKEN = "api-token-refresh/";
  readonly URL_VERIFY_TOKEN = "api-token-verify/";
  readonly CONTENT_TYPE_HEAD = 'Content-Type';
  readonly CONTEXT_TYPE_BODY = 'application/json;charset=utf-8';

  readonly KEY = 'token_key';

  constructor(private http: Http) {}

  /*
    Set UserToken to LocalStorage with this.KEY

    if UserToken exists -> replace it
    if UserToken doesn't exist -> set it

    return True if completed
  */
  setTokenToLocalStorage(userToken: UserToken) {
    localStorage.setItem(this.KEY, JSON.stringify(userToken));
    return true;
  }


  /*
    Updates (string)token in localStorage 
    if succssed returns true, else - false
  */
  updateTokenInLocalStorage(token: string) {
    if (this.isTokenSetInLocalStorage()) {
      let tokenString = localStorage.getItem(this.KEY);
      let tokenObj = JSON.parse(tokenString);
      tokenObj['token'] = token;
      localStorage.setItem(this.KEY, JSON.stringify(tokenObj));
      return true;
    }
    return false;
  }

  /*
    Returns UserToken from localStorage by this.KEY

    if token doesn't exist -> returns null
  */
  getTokenFromLocalStorage() {
    let tokenString = localStorage.getItem(this.KEY);
    if (tokenString === null) { return null; }

    return JSON.parse(tokenString)
  }

  /*
    If token exists in localStorage -> return true
    Else -> return false
  */
  private isTokenSetInLocalStorage() {
    let tokenString = localStorage.getItem(this.KEY);
    if (tokenString !== null) { return true; }
    return false;
  }

  /*
    Log in user by username:password, set token to localSto
    return UserToken object to subscriber with actual token and username

    If any errors happens: throws an erorr
  */
  login(username: string, password: string) {

    let url: string = this.URL_HEAD + this.URL_SIGN_IN;

    let body: string = this.createBodyWithUsernamePassword(username, password)
    let headers: Headers = new Headers ({'Content-Type':  'application/json;charset=utf-8'});

    return this.http.post(url, body, 
                          { headers: headers })
                          .map((response: Response) => {
                            let responseObject = response.json();
                            let token: UserToken = new UserToken(username, responseObject['token'])
                            this.setTokenToLocalStorage(token);
                            return token;
                          })
                          .catch((error:any) => { return Observable.throw(error) });             //throws exception!
                          
  }


  /*
    Register new user by username:password,
    return UserToken object to subscriber with actual token and username

    If any errors happens: throws an error
  */
  register(username: string, password: string) {
    let url: string = this.URL_HEAD + this.URL_SIGN_UP;
    let body: string = this.createBodyWithUsernamePassword(username, password);
    let headers: Headers = new Headers ({'Content-Type': 
                                'application/json;charset=utf-8'});
    return this.http.post(url, body, { headers: headers })
                    .map((response: Response) => {
                      let responseObject = response.json();
                      let token: UserToken = new UserToken(username, responseObject['token'])
                      this.setTokenToLocalStorage(token);
                      return token;
                    })
                    .catch((error:any) => { return Observable.throw(error) });              //throws error!
  }

  /*
    Refreshes token from localStorage,
    If succsess returns observable
    Else - null
  */
  refreshToken() {
    let token: string = this.getTokenFromLocalStorage();
    if (token !== null) {
      return this.refreshTokenWithInput(token['token']);
    } 
    return null;
  }

  /*
    Refresh input token:
      If succses -> return new token as string
      Else -> throws an error
  */
  private refreshTokenWithInput(token: string) {
    let url: string = this.URL_HEAD + this.URL_REFRESH_TOKEN;
    let body: string = this.createBodyWithToken(token);
    let headers: Headers = new Headers ({'Content-Type': 
                                'application/json;charset=utf-8'});

    return this.http.post(url, body, { headers: headers })
                    .map((response: Response) => {
                      let responseObject = response.json();
                      this.updateTokenInLocalStorage(responseObject['token']);
                      console.log(responseObject['token']);
                      return responseObject['token'];
                    })
                    .catch((error:any) => { return Observable.throw(error) });            //throws error!
  }

  private createBodyWithUsernamePassword(username: string, password: string) {
    let body = {
      'username': username,
      'password': password
    }
    return JSON.stringify(body);
  }

  private createBodyWithToken(token: string) {
    let body = {
      'token': token,
    }
    return JSON.stringify(body);
  }

}
