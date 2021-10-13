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

    localStorage.setItem('token', data.token);
    const remainingMilliseconds = 60 * 60 * 1000;
    const expiryDate = new Date(new Date().getTime() + remainingMilliseconds);
    localStorage.setItem('expiryDate', expiryDate.toISOString());
    return response.json();
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
    enteredPassword: password
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
        password
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
    return response.json();
  } catch (e) {
    console.log('Error', e.response.data);
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
      state.username = payload.firstName + ' ' + payload.surname;
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
      state.errorMessage = payload.message;
    },
    [userAuth.pending]: state => {
      state.isFetching = true;
    },

    [userSignUp.fulfilled]: (state, { payload }) => {
      console.log('payload', payload);
      state.isFetching = false;
      state.email = payload.email;
      state.username = payload.firstName + ' ' + payload.surname;
      state.isLoggedIn = true;
      state.role = payload.role;
      return state;
    },
    [userSignUp.pending]: state => {
      state.isFetching = true;
    },
    [userSignUp.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.errorMessage = payload.message || 'An error occurred';
      console.log('payload', payload);
    }
  }
});

export const authActions = authSlice.actions;
export const authSelector = state => state.auth;
export default authSlice;
