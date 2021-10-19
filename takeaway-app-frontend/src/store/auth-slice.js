import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const userAuth = createAsyncThunk('auth/login', async (enteredData, thunkAPI) => {
  const { enteredEmail: email, enteredPassword: password, isChecked } = enteredData;
  try {
    const response = await fetch('http://localhost:8080/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
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

    if (isChecked) {
      localStorage.setItem('rememberMe', true);
    }

    localStorage.setItem('token', data.token);
    const remainingMilliseconds = 60 * 60 * 1000;
    const expiryDate = new Date(new Date().getTime() + remainingMilliseconds);
    localStorage.setItem('expiryDate', expiryDate.toISOString());
    return data;
  } catch (e) {
    console.log('Error', e.response.data);
    return thunkAPI.rejectWithValue(e.response.data);
  }
});

export const userSignUp = createAsyncThunk('user/signUp', async (enteredData, thunkAPI) => {
  const {
    enteredFirstName: firstName,
    enteredSurname: surname,
    enteredEmail: email,
    enteredPassword: password,
    enteredPhoneNumber: phoneNumber
  } = enteredData;

  try {
    const response = await fetch('http://localhost:8080/auth/signup', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName,
        surname,
        email,
        password,
        phoneNumber
      })
    });

    let data = await response.json();

    if (response.status === 422) {
      return thunkAPI.rejectWithValue(data || 'Validation failed');
    } else if (!response.ok) {
      console.log(data);
      return thunkAPI.rejectWithValue(data || 'An error occurred');
    }
    localStorage.setItem('token', data.token);
    const remainingMilliseconds = 60 * 60 * 1000;
    const expiryDate = new Date(new Date().getTime() + remainingMilliseconds);
    localStorage.setItem('expiryDate', expiryDate.toISOString());
    return data;
  } catch (e) {
    console.log('Error', e.response.data);
    return thunkAPI.rejectWithValue(e.response.data);
  }
});

export const checkAuthState = createAsyncThunk('auth/getUserDetails', async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  const token = localStorage.getItem('token');

  if (!token) {
    const error = { message: 'No token found' };
    authSlice.caseReducers.logout(state);
    return thunkAPI.rejectWithValue(error);
  }

  let expirationDate = new Date(localStorage.getItem('expiryDate'));
  const rememberMe = localStorage.getItem('rememberMe');

  // if (rememberMe === 'true' && expirationDate <= new Date()) {
  //   const remainingMilliseconds = 60 * 60 * 1000;
  //   expirationDate = new Date(new Date().getTime() + remainingMilliseconds);
  //   localStorage.setItem('expiryDate', expirationDate.toISOString());
  // }

  if (!expirationDate || expirationDate <= new Date()) {
    const error = { message: 'Login Timeout' };
    authSlice.caseReducers.logout(state);
    return thunkAPI.rejectWithValue(error);
  }

  try {
    const response = await fetch('http://localhost:8080/auth/userDetails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      },
      body: JSON.stringify({ rememberMe })
    });

    let data = await response.json();

    if (!response.ok) {
      console.log('error', data);
      return thunkAPI.rejectWithValue(data || 'An error occurred');
    }
    return data;
  } catch (e) {
    console.log('Error', e.response.data);
    return thunkAPI.rejectWithValue(e.response.data);
  }
});

export const checkAuthTimeout = (expirationTime, state) => {
  setTimeout(() => {
    authSlice.caseReducers.logout(state);
  }, expirationTime);
};

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
    clearState(state) {
      state.errorMessage = '';
    },
    logout(state, action) {
      console.log(state);
      state.userId = '';
      state.role = '';
      state.errorMessage = '';
      state.email = '';
      state.isLoggedIn = false;
      state.username = '';
      localStorage.removeItem('token');
      localStorage.removeItem('expirationDate');
      localStorage.removeItem('rememberMe');
    }
  },

  extraReducers: {
    [checkAuthState.fulfilled]: (state, { payload }) => {
      console.log('user payload', payload);
      state.email = payload.userEmail;
      state.isFetching = false;
      state.userId = payload.userId;
      state.errorMessage = '';
      state.isLoggedIn = true;
    },
    [checkAuthState.pending]: state => {
      state.isFetching = true;
    },
    [checkAuthState.rejected]: (state, { payload, error }) => {
      console.log('payload', payload);
      state.isFetching = false;
      state.errorMessage = payload.message;
    },

    [userAuth.fulfilled]: (state, { payload }) => {
      console.log('user payload', payload);
      state.email = payload.email;
      state.isFetching = false;
      state.userId = payload.userId;
      state.errorMessage = '';
      state.isLoggedIn = true;
    },
    [userAuth.rejected]: (state, { payload }) => {
      console.log('payload', payload);
      state.isFetching = false;
      state.errorMessage = payload.message;
    },
    [userAuth.pending]: state => {
      state.isFetching = true;
    },

    [userSignUp.fulfilled]: (state, { payload }) => {
      console.log('payload', payload);
      state.isFetching = false;
      state.email = payload.email;
      state.userId = payload.userId;
      state.isLoggedIn = true;
    },
    [userSignUp.pending]: state => {
      state.isFetching = true;
    },
    [userSignUp.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.errorMessage = payload.message || 'An error occurred';
    }
  }
});

export const authActions = authSlice.actions;
export const authSelector = state => state.auth;
export default authSlice;
