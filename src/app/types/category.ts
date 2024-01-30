export type Category = {
    _id: string;
    title: string;
    description: string;
    slug: string;
  };

  export type CreateCategoryForm = Omit<Category, '_id'>;