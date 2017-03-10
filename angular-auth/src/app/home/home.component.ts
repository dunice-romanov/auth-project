import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { Response} from '@angular/http';
import { UserListService } from '../user-list.service';
import { User } from '../user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [UserListService]
})
export class HomeComponent implements OnInit {

  readonly TEXT_USERNAME = 'Username';
  readonly TEXT_HASH_PASSWORD = 'Hash password';
  readonly TEXT_UPDATE_USERLIST = 'Update users';

  readonly TEXT_ERROR_SERVER_PROBLEM = 'Server is unavailable';
	
  private username: string;
  private userList: User[];

  constructor(private loginService: LoginService,
              private userListService: UserListService) { 
  	this.username = '';
    this.userList = [];
  }

  ngOnInit() {
  	this.username = this.loginService.getUsername();
    this.setUserList();
  }

  /*
    Updates this.userList from server's data
    If reject - handles error by errorHandler()
  */
  onClickGetUserList() {
    this.setUserList();
  }

  /*
    Requests server's userlist and sets to this.userList
    If reject - handle an error by errorHandler()
  */
  private setUserList() {
    this.userListService.getUserList()
                    .subscribe( 
                      data => {
                        this.userList = data;
                      },
                      error => this.errorHandler(error));
  }

  /*
    Handles server's errors
  */
  errorHandler(error) {
    alert(this.TEXT_ERROR_SERVER_PROBLEM);
    this.loginService.logout();
  }
}
