export type Student = {
    _id: string;
    fullname: string;
    email: string;
    password: string;
  };

  export type CreateUserForm = Omit<Student, '_id' | 'password'>;
