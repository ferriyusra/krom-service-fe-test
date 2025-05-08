import { Session, User } from 'next-auth';
import { JWT } from 'next-auth/jwt';

interface IRegister {
	fullName: string;
	email: string;
	password: string;
	confirmPassword: string;
}

interface ILogin {
	identifier: string;
	password: string;
}

interface UserExtended extends User {
	accessToken?: string;
	role?: string;
}

interface SessionExtended extends Session {
	accessToken?: string;
}

interface JWTExtended extends JWT {
	user?: UserExtended;
}

interface IProfile {
	userId?: string;
	email?: string;
	fullName?: string;
	role?: string;
}

interface IUpdatePassword {
	oldPassword: string;
	password: string;
	confirmPassword: string;
}

export type {
	IRegister,
	IActivation,
	ILogin,
	UserExtended,
	SessionExtended,
	JWTExtended,
	IProfile,
	IUpdatePassword,
};
