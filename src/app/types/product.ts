import { Category } from "./category";


export type Product = {
  _id: string;
  title: string;
  image: string;
  price: number;
  description: string;
  category: string;
  rate: number;
  count: string;
};

export type ProductAdmin = Omit<Product, '_id' | 'category'> & {
  _id: string;
  category: Category;
}

export type CreateProductForm = Omit<Product, '_id' | 'rate' | 'count'>;

export type ProductResponse = {
  total: number;
  page: number;
  limit: number;
  data: Product[];
};