import { PayloadAction } from '@reduxjs/toolkit';
import { call, fork, put, take } from 'redux-saga/effects';
import { ILoginPayload, login, loginSucces, logout } from './slices/authSlice';
import axios, { AxiosResponse } from 'axios'; // Import AxiosResponse

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* logger(action: PayloadAction) {
  console.log('log_saga', action);
}

const fetchApiAuth = async (payload: ILoginPayload): Promise<AxiosResponse> => {
  try {
    const response = await axios.post('https://dummyjson.com/auth/login', { ...payload });
    return response;
  } catch (error) {
    console.error('Error in fetchApiAuth:', error);
    throw error;
  }
};

function* handleLogin(payload: ILoginPayload) {
  try {
    const response: AxiosResponse = yield call(fetchApiAuth, payload);
    const dataUser: IUser = {
      ...response.data
    };
    yield put(loginSucces(dataUser));
    if(dataUser.token){
        localStorage.setItem('access_token',dataUser.token)
    }
    console.log(payload, 'handle_login');
  } catch (error) {
    // Handle error if needed
    console.error('Error in handleLogin:', error);
  }
}

function* handleLogout() {
  console.log('handle_logout');
  localStorage.removeItem('access_token');
}

function* watchFlow() {
  while (true) {
    const isLogin = Boolean(localStorage.getItem('access_token'));
    if (!isLogin) {
      const action: PayloadAction<ILoginPayload> = yield take(login.type);
      yield call(handleLogin, action.payload);
    }

    yield take(logout.type);
    yield call(handleLogout);
  }
}

function* authSaga() {
  //   yield takeEvery('*', logger)
  yield fork(watchFlow);
}

export default authSaga;
