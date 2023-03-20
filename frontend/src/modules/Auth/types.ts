export interface ISignUpInput {
  email: string;
  nickname: string;
  password: string;
  rePassword: string;
}

export interface ILoginInput {
  email: string;
  password: string;
}

export interface ILoginVars {
  input: ILoginInput;
}

export interface ISignUpVars {
  input: Omit<ISignUpInput, "rePassword">;
}

export interface IAuth {
  id: string;
  email: string;
  nickname?: string;
  accessToken: string;
  balance: number;
}

export interface ILoginResult {
  logIn: IAuth;
}

export interface ISignUpResult {
  signUp: boolean;
}

export interface IUser {
  id: string;
  email: string;
  nickname: string;
  balance: number;
}

export interface IUserResponse {
  userByToken: IUser;
}
