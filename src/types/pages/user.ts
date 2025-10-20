export type User = {
	id: string;

	avatar: string;

	username: string;
	name: string;

	email: string;
	role: string;
	password: string;

	access_token: string;
	refresh_token: string;

	permissions: string[];
};
