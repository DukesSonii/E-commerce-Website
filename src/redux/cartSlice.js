import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cartSlice",
  initialState: {
    cart: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload.attributes;
      const curItem = product
        ? {
            title: product.title,
            key: product.key,
            price: product.price,
            image: product.image.data.attributes.url,
          }
        : action.payload;

      //apni key ke basis pe item ko find kr lia, if it is present, then idx != -1
      const index = state.cart.findIndex((item) => item.key === curItem.key);

      if (index === -1) {
        //item present nhi h toh, add to cart
        //so push the curritem with quantity
        state.cart.push({ ...curItem, quantity: 1 });
      } else {
        //agr pehle si hi dala hua h toh increase the quantity
        state.cart[index].quantity += 1;
      }
    },

    removeFromCart: (state, action) => {
      const curKey = action.payload?.attributes?.key || action.payload.key;

      const index = state.cart.findIndex((item) => item.key === curKey);
      if (index === -1) return;

      //if cart ke andar index ki quantity 1 h toh remove it
      if (state.cart[index].quantity === 1) {
        //curritem will be removed if quantity is 1
        //kisi bhi item ko filter out krne ke liye we write item.key!=currkey
        state.cart = state.cart.filter((item) => item.key !== curKey);
      } else {
        //if quantity > 1, remove quantity by -1
        state.cart[index].quantity -= 1;
      }
      //and in productdetail jaha button h waha write dispatch addtocart and removefromcart
    },
    // create an action to removeCartItem

    //after making a successful payments, all items will be removed from cart
    resetCart: (state, action) => {
      state.cart = [];
    },
  },
});

export default cartSlice.reducer;

export const { addToCart, removeFromCart, resetCart } = cartSlice.actions;
