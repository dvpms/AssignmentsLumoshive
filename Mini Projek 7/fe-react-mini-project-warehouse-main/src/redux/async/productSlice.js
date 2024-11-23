import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";

// Async Thunks untuk operasi API
export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  const response = await axios.get("/products");
  return response.data;
});

export const addProduct = createAsyncThunk("products/addProduct", async (newProduct) => {
  const response = await axios.post("/products", newProduct);
  return response.data;
});

export const updateProduct = createAsyncThunk("products/updateProduct", async (updatedProduct) => {
  const { id, ...data } = updatedProduct;
  const response = await axios.put(`/products/${id}`, data);
  return response.data;
});

export const deleteProduct = createAsyncThunk("products/deleteProduct", async (id) => {
  await axios.delete(`/products/${id}`);
  return id;
});

export const updateStock = createAsyncThunk(
    "products/updateStock",
    async ({ id, stock }, { getState }) => {
      const state = getState();
      const existingProduct = state.products.items.find((product) => product.id === id);
  
      if (!existingProduct) {
        throw new Error("Product not found");
      }
  
      // Perbarui stok produk tanpa menghapus atribut lainnya
      const updatedProduct = {
        ...existingProduct,
        stock: stock, // Stok baru akan menggantikan stok lama
      };
  
      const response = await axios.put(`/products/${id}`, updatedProduct);
      return response.data;
    }
  );
  
  

// Product Slice
const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Add Product
      .addCase(addProduct.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      // Update Product
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.items.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      // Delete Product
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      })
    // Update Stock
    .addCase(updateStock.fulfilled, (state, action) => {
        const index = state.items.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      });
  
  },
});

export default productSlice.reducer;
