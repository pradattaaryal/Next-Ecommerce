export type product = {
    id: string; // Unique identifier for the product
    name: string; // Name of the product
    category: string; // Category of the product
    images: string; // URL or path to the product image
    description: string | null; // Optional description of the product
    price: number; // Current price of the product
    listPrice: number; // Original list price of the product
    countInStock: number; // Number of items available in stock
    colors: string[]; // Array of available colors for the product
    avgRating: number; // Average rating of the product
    numReviews: number; // Number of reviews for the product
    numSales: number; // Number of times the product has been sold
    isPublished: boolean; // Whether the product is published
    createdAt: Date; // Date when the product was created
    updatedAt: Date; // Date when the product was last updated
  };
  
  export type productread = {
    id: string; // Unique identifier for the product
    name: string; // Name of the product
    category: string; // Category of the product
    images: string; // URL or path to the product image
    description: string | null; // Optional description of the product
    price: number; // Current price of the product
    listPrice: number; // Original list price of the product
    countInStock: number; // Number of items available in stock
    colors: string[]; // Array of available colors for the product
    avgRating: number; // Average rating of the product
    numReviews: number; // Number of reviews for the product
    numSales: number; // Number of times the product has been sold
    isPublished: boolean; // Whether the product is published
    createdAt: string; // Date when the product was created
    updatedAt: string; // Date when the product was last updated
  };
  