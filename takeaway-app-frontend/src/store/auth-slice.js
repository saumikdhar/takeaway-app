import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const userAuth = createAsyncThunk('auth/login', async (enteredData, thunkAPI) => {
  const { enteredEmail: email, enteredPassword: password } = enteredData;
  try {
    const response = await fetch('http://localhost:8080/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    });

    let data = await response.json();

    if (response.status === 404) {
      return thunkAPI.rejectWithValue(
        data || 'There is no exisiting accounts with this email address'
      );
    } else if (response.status === 403) {
      return thunkAPI.rejectWithValue(data || 'Email address or password is incorrect');
    } else if (!response.ok) {
      console.log(data);
      return thunkAPI.rejectWithValue(data || 'Email address or password was incorrect');
    }

    localStorage.setItem('token', data.token);
    const remainingMilliseconds = 60 * 60 * 1000;
    const expiryDate = new Date(new Date().getTime() + remainingMilliseconds);
    localStorage.setItem('expiryDate', expiryDate.toISOString());
    return response.json();
  } catch (e) {
    console.log('Error', e);
    return thunkAPI.rejectWithValue(e.response.data);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    username: '',
    email: '',
    userId: '',
    token: '',
    role: '',
    isLoggedIn: false,
    isFetching: false,
    errorMessage: ''
  },
  reducers: {
    logout(state, action) {
      state.token = '';
      state.userId = '';
      state.role = '';
      state.errorMessage = '';
      state.email = '';
      state.isLoggedIn = false;
      state.username = '';
      localStorage.removeItem('token');
      localStorage.removeItem('expirationDate');
      localStorage.removeItem('userId');
      localStorage.removeItem('role');
      localStorage.removeItem('email');
    }
  },

  extraReducers: {
    [userAuth.fulfilled]: (state, { payload }) => {
      state.email = payload.email;
      state.username = payload.name;
      state.isFetching = false;
      state.token = payload.token;
      state.userId = payload.userId;
      state.errorMessage = '';
      state.role = payload.role;
      state.isLoggedIn = true;
      return state;
    },
    [userAuth.rejected]: (state, { payload }) => {
      console.log('payload', payload);
      state.isFetching = false;
      state.errorMessage = payload;
    },
    [userAuth.pending]: state => {
      state.isFetching = true;
    }
  }
});

export const authActions = authSlice.actions;
export const authSelector = state => state.auth;
export default authSlice;
