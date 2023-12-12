import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
  shippingCost: 0, // Add shippingCost to the state
  placiloOption: '', // Add placiloOption to the state
  customerPhone: '', // Add customerPhone to the state
  customerName: '', // Add customerPhone to the state
  customerSurname: '', // Add customerPhone to the state
  customerUlica: '', // Add customerPhone to the state
  customerPost: '', // Add customerPhone to the state
  customerCity: '', // Add customerPhone to the state
  customerEmail: '', // Add customerPhone to the state
  confirmEmail: '', // Add customerPhone to the state
  pogoji: true,
  purchaseID: '', // Add customerPhone to the state
  purchaseComplete: '',
  superID:'',
  superComplete:''
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
    updateShippingCost: (state, action) => {
      state.shippingCost = action.payload;
    },
    updatePlaciloOption: (state, action) => {
      state.placiloOption = action.payload;
    },
    updateCustomerPhone: (state, action) => {
      state.customerPhone = action.payload;
    },
    updateCustomerName: (state, action) => {
      state.customerName = action.payload;
    },
    updateCustomerSurname: (state, action) => {
      state.customerSurname = action.payload;
    },
    updateCustomerUlica: (state, action) => {
      state.customerUlica = action.payload;
    },
    updateCustomerPost: (state, action) => {
      state.customerPost = action.payload;
    },
    updateCustomerCity: (state, action) => {
      state.customerCity = action.payload;
    },
    updateCustomerEmail: (state, action) => {
      state.customerEmail = action.payload;
    },
    updateConfirmEmail: (state, action) => {
      state.confirmEmail = action.payload;
    },
    togglePogoji: (state) => {
      state.pogoji = !state.pogoji;
    },
    updatePurchaseId: (state, action) => {
      state.purchaseID = action.payload;
    },
    updateSuperId: (state, action) => {
      state.superID = action.payload;
    },
    updatePurchaseComplete: (state, action) => {
      state.purchaseComplete = action.payload;
    },
    updateSuperComplete: (state, action) => {
      state.superComplete = action.payload;
    },
    
    removeAllFromCart: (state, action) => {
      state.cartItems = []; // Set cartItems to an empty array to remove all items
    },
    setPogojiToTrue: (state) => {
      state.pogoji = true;
    },
    // Add more reducers for other actions
  },
});

export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity,updateShippingCost,updatePlaciloOption,updateCustomerPhone,updateCustomerName,updateCustomerSurname,updateCustomerUlica,updateCustomerPost,updateCustomerCity,updateCustomerEmail,updateConfirmEmail,togglePogoji,updatePurchaseId,updatePurchaseComplete,removeAllFromCart,updateSuperId,updateSuperComplete,setPogojiToTrue  } = cartSlice.actions;

export default cartSlice.reducer;