// lib/types.ts


export type Category = "Medicine" | "Electronics" | "Grocery";


export interface Product {
id: string;
name: string;
category: Category;
price: number;
stock: number;
}


// Utility types demonstrating Partial, Omit, Pick
export type CreateProduct = Omit<Product, "id">; // client sends product without id
export type UpdateProduct = Partial<Product>; // partial update allowed
export type ProductTableItem = Pick<Product, "id" | "name" | "category" | "price" | "stock">;


// Generic API response wrapper
export interface ApiResponse<T> {
data: T;
message?: string;
}