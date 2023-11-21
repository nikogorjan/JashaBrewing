import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { ime, cenaIndex, item } = action.payload;
      const existingItem = state.cartItems.find(
        (cartItem) => cartItem.ime === ime && cartItem.cenaIndex === cenaIndex
      );

      if (existingItem) {
        // If the item is already in the cart, update the quantity or any other logic you need
        existingItem.quantity += 1; // For example, increase quantity by 1
      } else {
        // If the item is not in the cart, add it
        const selectedCena = item.cena[cenaIndex];
        state.cartItems.push({ ime, cena: selectedCena, cenaIndex, quantity: 1, image: item.Image, });
      }
    },
    incrementQuantity: (state, action) => {
      const { ime, cenaIndex } = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.ime === ime && item.cenaIndex === cenaIndex
      );

      if (existingItem) {
        // If the item is already in the cart, increase the quantity
        existingItem.quantity += 1;
      }
    },
    decrementQuantity: (state, action) => {
      const { ime, cenaIndex } = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.ime === ime && item.cenaIndex === cenaIndex
      );

      if (existingItem && existingItem.quantity > 1) {
        // If the item is already in the cart and the quantity is greater than 1, decrease the quantity
        existingItem.quantity -= 1;
      }
    },
    removeFromCart: (state, action) => {
      const { ime, cenaIndex } = action.payload;
      state.cartItems = state.cartItems.filter(
        (item) => item.ime !== ime || item.cenaIndex !== cenaIndex
      );
    },
    // Add more reducers for other actions
  },
});

export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity } = cartSlice.actions;

export default cartSlice.reducer;