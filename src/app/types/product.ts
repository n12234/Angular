import { Category } from "./category";

export type Product = {
  id: number;
  title: string;
  image: string;
  price: number;
  description: string;
  category: string;
  rating: {
    rate: number;
    count: number;
  };
};

export type ProductAdmin = Omit<Product, 'id' | 'category'> & {
  id: number;
  category: Category;
}

export type CreateProductForm = Omit<Product, 'id' | 'rating'>;