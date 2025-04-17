import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import { playlistSlice } from '../slices/Dashboard/playlist';
import { userSlice } from '../slices/Header/user';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    playlists: playlistSlice.reducer,
    user: userSlice.reducer,
  },
});
