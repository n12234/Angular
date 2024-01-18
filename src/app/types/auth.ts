export type LoginForm = {
    email: string;
    password: string;
  };
  
  export type LoginFormResponse = LoginForm & {
    accessToken: string;
  };