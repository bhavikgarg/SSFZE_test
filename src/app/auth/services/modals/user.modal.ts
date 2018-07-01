export interface Roles{
	user: boolean;
	admin?: boolean;
}

export class User{
	uid: string;
	email: string;
	role: Roles;

	constructor(authData){
		this.uid = authData.uid;
		this.email = authData.email;
		this.role = { user: true};
	}
}