export type Category = {
    _id: string;
    title: string;
    description: string;
  };

  export type CreateCategoryForm = Omit<Category, '_id'>;