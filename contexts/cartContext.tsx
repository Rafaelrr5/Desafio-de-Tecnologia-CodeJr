import React, { createContext, useContext, useState } from 'react';
import { Alert } from 'react-native';
import { Beer } from '@/types/beer';

interface CartItem {
  beer: Beer;
  quantity: number;
}

interface CartContextData {
  items: CartItem[];
  addToCart: (beer: Beer, quantity?: number) => void;
  removeFromCart: (beerId: string) => void;
  updateQuantity: (beerId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (beer: Beer, quantity: number = 1) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(item => item.beer.id === beer.id);
      
      if (existingItem) {
        return currentItems.map(item =>
          item.beer.id === beer.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...currentItems, { beer, quantity }];
    });
  };

  const removeFromCart = (beerId: string) => {
    setItems(currentItems => currentItems.filter(item => item.beer.id !== beerId));
  };

  const updateQuantity = (beerId: string, quantity: number) => {
    setItems(currentItems =>
      currentItems.map(item =>
        item.beer.id === beerId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (item.beer.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotalPrice,
      getTotalItems
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
