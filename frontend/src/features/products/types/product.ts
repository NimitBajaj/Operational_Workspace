export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
}

export interface Product {
  id: string;
  name: string;
  slug: string;

  shortDescription: string;
  description: string;

  warranty: string | null;

  featured: boolean;
  active: boolean;

  category: ProductCategory;
}