export type User = {
    _id: string;
    username: string;
    email: string;
    password: string;
  };

  export type EditUserForm = Omit<User, '_id' | 'password'>;
  export type CreateUserForm = Omit<User, '_id'>;
