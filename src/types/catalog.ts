export interface Product {
  id: string;
  name: string;
  price: number;
  description?: string;
  imageUrl?: string;
  popular?: boolean;
  tags?: string[];
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  products: Product[];
}

export interface Municipio {
  id: string;
  name: string;
  zoneId: string;
  zoneName: string;
  responsibleGrades: string;
  location: string;
  imageUrl?: string;
  categories: Category[];
}

export interface Zone {
  id: string;
  name: string;
  description: string;
  colorBadge?: string;
  municipios: Municipio[];
}

export interface BankPoint {
  id: string;
  name: string;
  location: string;
  icon?: string;
  description?: string;
}

export interface CartItem {
  product: Product;
  municipioName: string;
  categoryName: string;
  quantity: number;
}

export type CategoryFilterType = 'todos' | 'bancos' | 'postres' | 'bebidas' | 'comidas' | 'dulces' | 'panaderia' | 'atripciones';

export interface FilterOptions {
  searchQuery: string;
  activeZoneId: string; // 'todos' or zone ID
  activeCategoryFilter: CategoryFilterType;
  sortBy: 'default' | 'price-asc' | 'price-desc' | 'name-asc';
}
