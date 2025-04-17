import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUser } from '../../actions/dashboardActions';

const initialState = {
    user: {},
    status: 'idle',
    error: null,
}

export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
    const response = await getUser();
    return response;
});

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.status = 'success';
                state.user = action.payload;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})

