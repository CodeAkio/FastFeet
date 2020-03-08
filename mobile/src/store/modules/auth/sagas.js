import { Alert } from 'react-native';
import { takeLatest, call, put, all } from 'redux-saga/effects';

import { signInSuccess, signFailure } from './actions';

import api from '~/services/api';

export function* signIn({ payload }) {
  try {
    const { id } = payload;

    const response = yield call(api.get, `/deliverymen/${id}`);

    if (response.status === 400) throw new Error('User not found');

    yield put(signInSuccess(response.data));
  } catch (err) {
    Alert.alert(
      'Falha na autenticação',
      'Houve uma falha na autenticação, verifique seus dados'
    );
    yield put(signFailure());
  }
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);
