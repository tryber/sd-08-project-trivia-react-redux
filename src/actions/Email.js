// import getAPI from '../services/requestAPI';

import {
  USER_EMAIL,
  // FETCH_QUESTIONS,
  // FETCH_GRAVATA,
} from './index';

// não revisado daqui pra baixo
export function actionUserEmail(email) {
  return {
    type: USER_EMAIL,
    email,
  };
}

export function actionFetchCurrenciesData() {
  return async (dispatch) => {
    const CurrenciesData = await getAPI();
    // console.log(CurrenciesData);
    dispatch(currenciesData(CurrenciesData));
    dispatch(currenciesArray(CurrenciesData));
  };
}
