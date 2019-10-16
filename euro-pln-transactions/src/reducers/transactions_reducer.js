import {
    SET_EUR_VALUE, SET_TRANSACTIONS_TOTAL_EUR, SET_TRANSACTIONS_TOTAL_PLN, TOGGLE_DELETE_OPTION, DELETE_TRANSACTION, BEGIN_DELETION_TRANSITION, SET_TRANSACTION_AMOUNT,
    SET_TRANSACTION_NAME, ADD_TRANSACTION, SHOW_TRANSACTION, SET_TRANSACTION_CONTENT_HEIGHT
} from '../actions/actions';
import initialState from '../state/initialState';
import calculateTransactionTotalEUR from '../helpers/calculateTransactionTotalEUR';

const transactionsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_EUR_VALUE:
            return {
                ...state,
                mockupObject: state.mockupObject.map(transaction => {
                    return {
                        ...transaction,
                        ValueEUR: transaction.ValueEUR,
                        ValuePLN: transaction.ValueEUR * (action.EURvalue || state.currentEURvalue),
                    }
                }),
                currentEURvalue: action.EURvalue,
                customCurrencyCorrect: action.customCurrencyCorrect
            };
        case SET_TRANSACTIONS_TOTAL_EUR:
            const totalEurCalc = calculateTransactionTotalEUR(state.mockupObject);
            return {
                ...state,
                totalEUR: totalEurCalc,
                totalNegativeValue: totalEurCalc < 0
            };
        case SET_TRANSACTIONS_TOTAL_PLN:
            return {
                ...state,
                totalPLN: state.totalEUR * state.currentEURvalue
            };
        case TOGGLE_DELETE_OPTION:
            return {
                ...state,
                mockupObject: state.mockupObject.map(transaction => {
                    if (action.id === transaction.Id) {
                        return {
                            ...transaction,
                            deleteButtonEnabled: action.option
                        };
                    }
                    return transaction;
                })
            };
        case DELETE_TRANSACTION:
            return {
                ...state,
                mockupObject: state.mockupObject.filter(transaction => transaction.Id !== action.id)
            };
        case BEGIN_DELETION_TRANSITION:
            return {
                ...state,
                mockupObject: state.mockupObject.map(transaction => {
                    if (action.id === transaction.Id) {
                        return {
                            ...transaction,
                            toDeleteStatus: true
                        };
                    }
                    return transaction;
                })
            };
        case SET_TRANSACTION_AMOUNT:
            return {
                ...state,
                newAmount: action.amount,
                newAmountCorrect: !action.isError
            };
        case SET_TRANSACTION_NAME:
            return {
                ...state,
                newName: action.name,
                newNameCorrect: !action.isError,
            };
        case ADD_TRANSACTION:
            return {
                ...state,
                mockupObject: [
                    ...state.mockupObject,
                    {
                        Id: state.newId++,
                        Name: state.newName,
                        ValueEUR: state.newAmount,
                        deleteButtonEnabled: false,
                        toDeleteStatus: false,
                        ValuePLN: state.newAmount * state.currentEURvalue,
                        isVisible: false,
                        negativeValue: state.newAmount < 0
                    }
                ],
                newId: state.newId++
            };
        case SHOW_TRANSACTION: 
            return {
                ...state,
                mockupObject: state.mockupObject.map((transaction, index) => {
                    if (index + 1 === state.mockupObject.length) {
                        return {
                            ...transaction,
                            isVisible: true
                        }
                    }
                    return transaction;
                })
            };
        case SET_TRANSACTION_CONTENT_HEIGHT:
            return {
                ...state,
                transactionContentHeight: action.height || (state.transactionContentHeight + action.heightToCalc)
            };
        default:
            return state;
    }
};

export default transactionsReducer
