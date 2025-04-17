import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getPlaylists } from '../../actions/dashboardActions';

const initialState = {
    playlists: [],
    details: {
        limit: 10,
        next: null,
        previous: null,
    },
    status: 'loading',
    error: null,
}

export const fetchPlaylists = createAsyncThunk('playlists/fetchPlaylists', async (user) => {
    const response = await getPlaylists(user);
    return response;
})

export const playlistSlice = createSlice({
    name: 'playlists',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPlaylists.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPlaylists.fulfilled, (state, action) => {
                state.status = 'success';
                state.playlists = action.payload.items;
                state.details.limit = action.payload.limit;
                state.details.next = action.payload.next;
                state.details.previous = action.payload.previous;
            })
            .addCase(fetchPlaylists.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.error.message;
            })
        }
})