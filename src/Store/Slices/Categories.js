import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../../Api/Api";


export const GetCategories = createAsyncThunk('getCtg',async(query)=>{
    try {
        const response = await Api.get('/category',query)
        return response.success ===  1 ? {data:response.categories} : {error:response}
    } catch (error) {
        throw error
    }
})

export const UpdateWholeCategory = createAsyncThunk('ctgupdate',async(form)=>{
    try {
        const response = await Api.put('/category',form)
        console.log(response)
    } catch (error) {
        throw error
    }
})

export const UpdateCatgeoriesStatus = createAsyncThunk('toggleActive',async(form)=>{
    try {
        const response = await Api.put('/category',form)
    } catch (error) {
        throw error
    }
})

export const Createcategories = createAsyncThunk('creatingCategories',async(form)=>{
    try {
        const response = await Api.post('/Category',form)
        return response.success ===  1 ? {data:response} : {error:response}
    } catch (error) {
        throw error
    }
})


export const DltCategory = createAsyncThunk('ctgDlt',async(id)=>{
    try {
        const response = await Api.delete(`/category/${id}`)
        console.log(response)
    } catch (error) {
        throw error
    }
})

const initialState = {
    Categories : {pending:false,data:[],error:null},
    CreateCategory : { pending:false,success:false,error:null}
}

const CategorySlice = createSlice({
    name:'Category',
    initialState,
    reducers:{
    // add reducers
    ResetCreateCategoryState:(state,action)=>{
        state.CreateCategory.error = null
        state.CreateCategory.pending = false
        state.CreateCategory.success = false
    }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(GetCategories.pending, (state) => {
            state.Categories.pending = true
          })
          .addCase(GetCategories.fulfilled, (state, action) => {
            state.Categories.pending = false
            if(action.payload.data){
                state.Categories.data = action.payload.data
            }
            else{
                state.Categories.error = action.payload.error
            }
          })
          .addCase(GetCategories.rejected, (state, action) => {
            state.Categories.pending = false
            state.Categories.error = action.payload.error
          })

        //creating categories cases
        .addCase(Createcategories.pending,(state,action)=>{
            state.CreateCategory.pending = true
        })
        .addCase(Createcategories.fulfilled,(state,action)=>{
            state.CreateCategory.pending = false
            if(action.payload.data){
                console.log('creating succ')
                state.CreateCategory.success = true
            }
            else{
                console.log('creating error')
                state.CreateCategory.error = action.payload.error
            }
        })
        .addCase(Createcategories.rejected,(state,action)=>{
            state.CreateCategory.pending = false
            state.CreateCategory.error = action.payload
        })

        // more cases
    }
})
export const { ResetCreateCategoryState } = CategorySlice.actions
export default CategorySlice.reducer