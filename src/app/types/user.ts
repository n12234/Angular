export type User = {
    _id: string;
    username: string;
    email: string;
    password: string;
  };

  export type CreateUserForm = Omit<User, '_id' | 'password'>;
