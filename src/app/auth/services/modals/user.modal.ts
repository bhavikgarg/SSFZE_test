export interface Roles{
	user: boolean;
	admin?: boolean;
}

export class User{
	email: String;
	password: String;
	role: Roles;

	constructor(authData){
		this.email = authData.email;
		this.password = authData.password;
		this.role = { user: true};
	}
}