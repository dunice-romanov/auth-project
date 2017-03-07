export class User {
    username: string;
    password: string;
}

export class UserToken {
	username: string;
	token: string;

	constructor(username: string, token: string) {
		this.token = token;
		this.username = username;
	}
}