export type User = {
    _id: string;
    name: string;
    email: string;
    password: string;
  };

  export type CreateUserForm = Omit<User, '_id' | 'password'>;
