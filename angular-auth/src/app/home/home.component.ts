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

  readonly TEXT_ERROR_SERVER_PROBLEM = 'Server is unavailable'
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

  onClickGetUserList() {
    this.setUserList();
  }


  private setUserList() {
    this.userListService.getUserList()
                    .subscribe( 
                      data => {
                        this.userList = data;
                      },
                      error => this.errorHandler(error));
  }

  errorHandler(error) {
    alert(this.TEXT_ERROR_SERVER_PROBLEM);
    this.loginService.logout();
  }
}
