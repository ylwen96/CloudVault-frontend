import { createSlice } from '@reduxjs/toolkit'
import { isSignedIn, getSessionValues } from '../../util/signInHelper'
import { defaultStorageExpirationDate } from '../../util/storageHelper';
import { createSignInSession, cleanupOnSignOut } from '../../util/signInHelper';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: getSessionValues(),
    isUserSignedIn: isSignedIn()
  },
  reducers: {
    setUserSignIn: (state, action) => {
      const { idToken, accessToken, username } = action.payload;
      createSignInSession(username, idToken, accessToken, defaultStorageExpirationDate);
      state.user = { idToken, accessToken, username }
      state.isUserSignedIn = true;
    },
    setUserSignOut: (state, action) => {
      cleanupOnSignOut();
      state.isUserSignedIn = false
    }
  }
})

// Action creators are generated for each case reducer function
export const { setUserSignIn, setUserSignOut } = authSlice.actions

export default authSlice.reducer