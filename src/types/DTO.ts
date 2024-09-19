export type ProductsProps = {
  id?: string;
  image: string;
  title: string;
  description: string;
  created_at?: Date;
  updated_at?: Date;
}

export type AboutProps = {
  id?: string;
  icon: string;
  title: string;
  description: string;
  created_at?: Date;
  updated_at?: Date;
}

export type ServiceProps = {
  id?: string;
  icon: string;
  title: string;
  description: string;
  created_at?: Date;
  updated_at?: Date;
}

export type PostProps = {
  id?: string;
  image: string;
  title: string;
  slug: string;
  content: string;
  published: boolean;
  categoryId: string;
  category?: {
    title: string;
  };
  tags: string[];
  userId: string;
  author?: {
    username: string;
  };
  created_at?: Date;
  updated_at?: Date;
}

export type UserProps = {
  id?: string;
  username: string;
  email: string;
  role?: 'ADMIN' | 'REDATOR';
  phone: string;
  verified?: boolean;
  created_at?: Date;
  updated_at?: Date;
  password?: string;
}

export type PartnerProps = {
  id?: string;
  photo: string;
  name: string;
  occupation: string;
  created_at?: Date;
  updated_at?: Date;
}