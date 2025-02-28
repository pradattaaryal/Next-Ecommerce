"use client"
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { product } from "@/types/product";

// Define the type for a cart item
export interface CartItem {
  Product: product;
  quantity: number;
}

// Define the initial state
interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

 

/**
 * Load cart data from localStorage if available
 */
const loadCartFromLocalStorage = (): CartState => {
  if (typeof window !== "undefined") {
    try {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        return JSON.parse(savedCart);
      }
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
    }
  }
  return initialState;
};
 
const saveCartToLocalStorage = (state: CartState) => {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem("cart", JSON.stringify(state));
    } catch (error) {
      console.error("Error saving cart to localStorage:", error);
    }
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState: loadCartFromLocalStorage(),
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      if (!action.payload || !action.payload.Product) {
        console.error("Invalid payload:", action.payload);
        return;
      }
      
       
      const serializableProduct =  action.payload.Product;
      const quantity = action.payload.quantity || 1;
      
      // Find existing item
      const existingItemIndex = state.items.findIndex(
        item => item.Product && item.Product.id === serializableProduct.id
      );
      
      if (existingItemIndex >= 0) {
        // Update existing item
        state.items[existingItemIndex].quantity += quantity;
      } else {
        // Add new item with serializable product
        state.items.push({
          Product: serializableProduct,
          quantity
        });
      }
      
      saveCartToLocalStorage(state);
    },
    
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => 
        item.Product && item.Product.id !== action.payload
      );
      saveCartToLocalStorage(state);
    },
    
    updateQuantity: (state, action: PayloadAction<{ productId: string; quantity: number }>) => {
      const { productId, quantity } = action.payload;
      const item = state.items.find((item) => item.Product && item.Product.id === productId);
      
      if (item) {
        item.quantity = quantity;
        saveCartToLocalStorage(state);
      }
    },
    
    clearCart: (state) => {
      state.items = [];
      saveCartToLocalStorage(state);
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;