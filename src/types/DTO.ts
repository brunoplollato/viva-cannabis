export type ProductsProps = {
  id: number;
  image: string;
  title: string;
  description: string;
}[]

export type AboutProps = {
  id: number;
  icon: string;
  title: string;
  description: string;
}[]

export type ServicesProps = {
  id: number;
  icon: string;
  title: string;
  description: string;
}[]

export type PostProps = {
  id: number;
  image: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  author: string;
  createdAt: Date
}[]

export type UserProps = {
  id?: string;
  username: string;
  email: string;
  role: 'ADMIN' | 'REDATOR';
  phone: string;
  verified?: boolean;
  created_at?: Date;
  updated_at?: Date;
  password?: string;
}