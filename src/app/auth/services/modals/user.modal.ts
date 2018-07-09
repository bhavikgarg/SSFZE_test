export interface Roles{
	user: boolean;
	admin?: boolean;
}

export class User{
	uid: string;
	email: string;
	role: Roles;
	displayName: string;

	constructor(authData: User){
		this.uid = authData.uid;
		this.email = authData.email;
		this.role = { user: true};
		this.displayName = authData.displayName
	}
}