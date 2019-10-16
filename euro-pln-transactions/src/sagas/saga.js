import { all, fork, call, put, takeLatest, takeEvery, delay } from 'redux-saga/effects';
import {
    SET_EUR_VALUE_REQUEST, SET_TRANSACTIONS_TOTAL_EUR, SET_EUR_VALUE, SET_TRANSACTIONS_TOTAL_PLN, SET_TRANSACTION_FOCUSED_REQUEST, TOGGLE_DELETE_OPTION
    , DELETE_TRANSACTION, DELETE_TRANSACTION_REQUEST, BEGIN_DELETION_TRANSITION, SET_TRANSACTION_AMOUNT_REQUEST, SET_TRANSACTION_AMOUNT, SET_TRANSACTION_NAME_REQUEST
    , SET_TRANSACTION_NAME, ADD_TRANSACTION_REQUEST, ADD_TRANSACTION, SHOW_TRANSACTION, SET_TRANSACTION_CONTENT_HEIGHT_REQUEST, SET_TRANSACTION_CONTENT_HEIGHT
} from '../actions/actions';
import callNPBapi from '../services/api';
import validateIsNumber from '../helpers/validateIsNumber';
import validateName from '../helpers/validateName';

function* fetchEURvalue() {
    const { res } = yield call(callNPBapi);
    if (res) {
        const EURvalue = res.data.rates[0].mid;
        yield put({ type: SET_EUR_VALUE, EURvalue, customCurrencyCorrect: false });
        yield put({ type: SET_TRANSACTIONS_TOTAL_EUR });
        yield put({ type: SET_TRANSACTIONS_TOTAL_PLN });
    } else {
        yield put({ type: SET_EUR_VALUE, EURvalue: false, customCurrencyCorrect: false });
        yield put({ type: SET_TRANSACTIONS_TOTAL_EUR });
        yield put({ type: SET_TRANSACTIONS_TOTAL_PLN });
    }
}

function* setEURvalue(action) {
    if (action.EURvalue > 0 && validateIsNumber(action.EURvalue)) {
        yield put({ type: SET_EUR_VALUE, EURvalue: action.EURvalue, customCurrencyCorrect: true });
        yield put({ type: SET_TRANSACTIONS_TOTAL_EUR });
        yield put({ type: SET_TRANSACTIONS_TOTAL_PLN });
    } else {
        yield call(fetchEURvalue);
    }
}

function* toggleDeleteOption(action) {
    yield put({ type: TOGGLE_DELETE_OPTION, id: action.id, option: action.option });
}

function* deleteTransaction(action) {
    yield put({ type: BEGIN_DELETION_TRANSITION, id: action.id });
    yield delay(250); //wait for transition end
    yield put({ type: SET_TRANSACTION_CONTENT_HEIGHT, height: action.height, heightToCalc: -33 });
    yield put({ type: DELETE_TRANSACTION, id: action.id });
    yield put({ type: SET_TRANSACTIONS_TOTAL_EUR });
    yield put({ type: SET_TRANSACTIONS_TOTAL_PLN });
}

function* setTransactionAmount(action) {
    const amount = yield call(validateIsNumber, action.amount);
    if (amount) {
        yield put({ type: SET_TRANSACTION_AMOUNT, amount, isError: false });
    } else {
        yield put({ type: SET_TRANSACTION_AMOUNT, amount: "", isError: true });
    }
}

function* setTransactionName(action) {
    const name = yield call(validateName, action.name);
    if (name) {
        yield put({ type: SET_TRANSACTION_NAME, name, isError: false });
    } else {
        yield put({ type: SET_TRANSACTION_NAME, name: "", isError: true });
    }
}

function* addTransaction(action) {
    yield put({ type: SET_TRANSACTION_CONTENT_HEIGHT, height: action.height, heightToCalc: 33 });
    yield(250);
    yield put({ type: ADD_TRANSACTION });
    yield delay(250);
    yield put({ type: SHOW_TRANSACTION });
    yield put({ type: SET_TRANSACTIONS_TOTAL_EUR });
    yield put({ type: SET_TRANSACTIONS_TOTAL_PLN });
    yield put({ type: SET_TRANSACTION_NAME, name: "", isError: true });
    yield put({ type: SET_TRANSACTION_AMOUNT, amount: "", isError: true });
}

function* setTransactionContentHeight(action) {
    yield put({ type: SET_TRANSACTION_CONTENT_HEIGHT, height: action.height });
}

/*Observers*/
function* observeTransactionDeleteRequest() {
    yield takeEvery(DELETE_TRANSACTION_REQUEST, deleteTransaction);
}

function* observeCallApiAction() {
    yield takeLatest(SET_EUR_VALUE_REQUEST, setEURvalue);
}

function* observeTransactionFocused() {
    yield takeEvery(SET_TRANSACTION_FOCUSED_REQUEST, toggleDeleteOption);
}

function* observeTransactionAmountChange() {
    yield takeEvery(SET_TRANSACTION_AMOUNT_REQUEST, setTransactionAmount);
}

function* observeTransactionNameChange() {
    yield takeEvery(SET_TRANSACTION_NAME_REQUEST, setTransactionName);
}

function* observeTransactionAdd() {
    yield takeEvery(ADD_TRANSACTION_REQUEST, addTransaction);
}

function* observeTransactionContentHeightChangeRequest() {
    yield takeEvery(SET_TRANSACTION_CONTENT_HEIGHT_REQUEST, setTransactionContentHeight);
}

export function* RootSaga() {
    yield all([
        fork(observeCallApiAction),
        fork(observeTransactionFocused),
        fork(observeTransactionDeleteRequest),
        fork(observeTransactionAmountChange),
        fork(observeTransactionNameChange),
        fork(observeTransactionAdd),
        fork(observeTransactionContentHeightChangeRequest)
    ]);
};