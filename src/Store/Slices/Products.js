import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import Api from "../../Api/Api";

import { createQuery } from "../../Api/Constant";

export const GetProducts = createAsyncThunk("getprod", async (params) => {

  const {ROW_COUNT,PAGE,IS_SEARCH,"date-from": dateFrom,"date-to": dateTo,} = params;

  const newQuery = createQuery("",ROW_COUNT,PAGE,IS_SEARCH,dateFrom,dateTo);

  try {
    const response = await Api.get("/Products/Products", newQuery);
    return response.success === 1 ? { data: response } : { error: response };
  } catch (error) {
    throw error;
  }
});

export const GetSingleProduct = createAsyncThunk(
  "getSingleProd",
  async (id) => {
    try {
      const response = await Api.get(`/Products/${id}`);
      return response.success === 1 ? { data: response } : { error: response };
    } catch (error) {
      throw error;
    }
  }
);

export const CreateProduct = createAsyncThunk("productcrt", async (form) => {
  try {
    const response = await Api.post("/Products/Products", form);
  } catch (error) {
    throw error;
  }
});

export const ToggleStatus = createAsyncThunk("producttoggle", async (form) => {
  const newQuery = createQuery();
  try {
    const response = await Api.put("/Products/Products", form, newQuery);
  } catch (error) {
    throw error;
  }
});

    
const initialState = {
  Getproducts: { pending: false, data: null, error: null },
  GetSingleProduct: { pending: false, data: null, error: null },
};

const ProductSlice = createSlice({
  name: "Product",
  initialState,
  reducers: {
    // add reducers
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetProducts.pending, (state, action) => {
        state.Getproducts.pending = true;
      })
      .addCase(GetProducts.fulfilled, (state, action) => {
        state.Getproducts.pending = false;
        if (action.payload) {
          state.Getproducts.data = action.payload.data;
        } else {
          state.Getproducts.error = action.payload.error;
        }
      })
      .addCase(GetProducts.rejected, (state, action) => {
        state.Getproducts.pending = false;
        state.Getproducts.data = null;
        state.Getproducts.error = action.payload;
      })

      // handle single product get response
      .addCase(GetSingleProduct.pending, (state, action) => {
        state.GetSingleProduct.pending = true;
      })
      .addCase(GetSingleProduct.fulfilled, (state, action) => {
        state.GetSingleProduct.pending = false;
        if (action.payload) {
          state.GetSingleProduct.data = action.payload.data.Product;
        } else {
          state.GetSingleProduct.error = action.payload.error;
        }
      })
      .addCase(GetSingleProduct.rejected, (state, action) => {
        state.GetSingleProduct.pending = false;
        state.GetSingleProduct.data = null;
        state.GetSingleProduct.error = action.payload;
      });
  },
});

export default ProductSlice.reducer;
