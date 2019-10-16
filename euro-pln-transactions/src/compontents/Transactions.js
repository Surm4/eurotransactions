import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { SET_EUR_VALUE_REQUEST, SET_TRANSACTION_FOCUSED_REQUEST, DELETE_TRANSACTION_REQUEST, SET_TRANSACTION_CONTENT_HEIGHT_REQUEST } from '../actions/actions';
import {
    THEME_MAIN_PRIMARY_FONT_COLOR, THEME_MAIN_SECONDARY_FONT_COLOR, THEME_MAIN_TERTIARY_COLOR, THEME_MAIN_QUATERNARY_COLOR,
    THEME_MAIN_DARK_COLOR, THEME_MAIN_BODY_COLOR, THEME_MAIN_ERROR_COLOR
} from '../css/styles';

const TransactionsContainer = styled.div`
    width: 80vw;
    margin: auto;
    background-color: ${THEME_MAIN_DARK_COLOR};
    padding: 3rem;
    margin-bottom: 1rem;

    @media (max-width: 950px) {
        width: 100vw;
        padding: 1rem;
    }
`;

const TransactionsHeader = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
`;

const TransactionsHeaderText = styled.h1`
    color: ${THEME_MAIN_PRIMARY_FONT_COLOR};
    flex-basis: 100%;
    flex: 4;
    margin: 0;
`;

const TransactionsHeaderInput = styled.input`
    display: block;
    flex: 1;
    text-align: center;
    font-weight: 700;
    height: 2rem;
    color: ${THEME_MAIN_PRIMARY_FONT_COLOR};
    background-color: transparent;
    border: none;
    border-bottom: 1px solid ${props => props.isCorrect ? THEME_MAIN_SECONDARY_FONT_COLOR : THEME_MAIN_ERROR_COLOR};
    position: relative;
    ::-webkit-inner-spin-button,
    ::-webkit-outer-spin-button { 
        margin: 0;
        padding: 1rem 0 1rem 0;
        color: ${THEME_MAIN_SECONDARY_FONT_COLOR};
        background-color: ${THEME_MAIN_BODY_COLOR};
    }
`;

const TransactionsContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    transition: .25s ease;
    max-height: 540px;
    overflow-y: ${props => props.myHeight > 540 ? "auto" : "hidden"};
    padding-bottom: 1rem;
    padding-top: 1rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
    border-top: 1px solid ${THEME_MAIN_QUATERNARY_COLOR};
    border-bottom: 1px solid ${THEME_MAIN_QUATERNARY_COLOR};
    height: ${props => props.myHeight ? props.myHeight + "px" : "auto"};
`;

const TransactionTransformation = (isVisible, deleteProcess) => {
    if (deleteProcess) {
        return "transform: scale(0);";
    } else {
        return isVisible ? "transform: scale(1);" : "transform: scale(0);";
    }
};

const Transaction = styled.div`
    color: ${THEME_MAIN_PRIMARY_FONT_COLOR};
    display: flex; 
    flex-wrap: wrap;
    cursor: pointer;
    padding: .5rem;
    transition: .25s ease;
    ${props => TransactionTransformation(props.isVisible, props.deleteProcess)}

    &:hover {
        background-color: ${THEME_MAIN_TERTIARY_COLOR};
        color: ${THEME_MAIN_PRIMARY_FONT_COLOR};
    }
`;

const TransactionName = styled.h5`
    flex: 1;
    display: flex;
    margin: 0;
    justify-content: center;
`;

const TransactionValue = styled.h5`
    flex: 1;
    display: flex;
    margin: 0;
    justify-content: center;
    align-items: center;
`;

const TransactionCurrency = styled.span`
    color: ${props => props.isNegativeValue ? THEME_MAIN_ERROR_COLOR : THEME_MAIN_SECONDARY_FONT_COLOR};
    padding-left: .5rem;
`;

const TransactionDesc = styled.div`
    color: ${THEME_MAIN_PRIMARY_FONT_COLOR};
    display: flex; 
    margin-bottom: .5rem;
`;

const TransactionDescriptionField = styled.h4`
    flex: 1;
    display: flex;
    margin: 0;
    justify-content: center;
`;

const TransactionSummary = styled.div`
    display: flex;
    flex-direction: column;
`;

const TransactionSummaryTitle = styled.h3`
    margin: 0;
    color: ${props => props.isNegativeValue ? THEME_MAIN_ERROR_COLOR : THEME_MAIN_SECONDARY_FONT_COLOR};
`;

const SummaryCurrency = styled.span`
    color: ${props => props.isNegativeValue ? THEME_MAIN_ERROR_COLOR : THEME_MAIN_SECONDARY_FONT_COLOR};
`;

const TransactionSummaryField = styled.h4`
    margin: 0;
    color: ${THEME_MAIN_PRIMARY_FONT_COLOR};
`;

const DeleteButton = styled.i`
    transition: .25s ease;
    ${props => props.isShowed ? "opacity: 100; pointer-events: auto;" : "opacity: 0; pointer-events: none;"}
`;

const Message = styled.p`
    color: ${THEME_MAIN_PRIMARY_FONT_COLOR};
    text-align: center;
`;

class Transactions extends React.Component {
    setEurValue = (EURvalue) => {
        this.props.dispatch({ type: SET_EUR_VALUE_REQUEST, EURvalue });
    };

    setTransactionContentHeight(parameter) {
        const el = this.TransactionContainerEl;
        const elHeight = el.getBoundingClientRect().height;

        if (parameter) {
            this.props.dispatch({ type: SET_TRANSACTION_CONTENT_HEIGHT_REQUEST, height: (elHeight + parameter) });
        } else {
            this.props.dispatch({ type: SET_TRANSACTION_CONTENT_HEIGHT_REQUEST, height: elHeight });
        }
    };

    componentDidMount() {
        this.setEurValue();
        this.setTransactionContentHeight();
    };

    componentDidUpdate() {
        const el = this.TransactionContainerEl;
        if ((el.scrollHeight > el.clientHeight) && el.clientHeight < 540) {
            this.setTransactionContentHeight(el.scrollHeight - el.clientHeight);
        }
    };

    transactionSetFocus = (id, option) => {
        this.props.dispatch({ type: SET_TRANSACTION_FOCUSED_REQUEST, id, option });
    };

    deleteTransaction = (id) => {
        this.props.dispatch({ type: DELETE_TRANSACTION_REQUEST, id })
    };

    generateTransactions = () => {
        const transactionItems = this.props.mockupObject.map(transaction => {
            const ValuePLN = Number(transaction.ValuePLN).toFixed(2);
            const ValueEUR = Number(transaction.ValueEUR).toFixed(2);
            return (
                <Transaction deleteProcess={transaction.toDeleteStatus}
                    isVisible={transaction.isVisible}
                    onMouseOver={e => this.transactionSetFocus(transaction.Id, true)}
                    onMouseLeave={e => this.transactionSetFocus(transaction.Id, false)}
                    key={transaction.Id}
                    data-test={"Transaction-" + transaction.Id}
                >
                    <TransactionName>{transaction.Name}</TransactionName>
                    <TransactionValue data-test="TransactionValueEUR">{ValueEUR}
                        <TransactionCurrency isNegativeValue={transaction.negativeValue}>EUR</TransactionCurrency>
                    </TransactionValue>
                    <TransactionValue data-test="TransactionValuePLN">{ValuePLN}
                        <TransactionCurrency isNegativeValue={transaction.negativeValue}>PLN</TransactionCurrency>
                    </TransactionValue>
                    <DeleteButton onClick={e => this.deleteTransaction(transaction.Id)} data-test={"TransactionDelete-" + transaction.Id} className="fas fa-window-close" isShowed={transaction.deleteButtonEnabled}></DeleteButton>
                </Transaction>
            );
        });

        return transactionItems.length ? transactionItems : <Message>No Transaction Available</Message>;
    };

    render() {
        return (
            <TransactionsContainer>
                <TransactionsHeader>
                    <TransactionsHeaderText>Current Transactions</TransactionsHeaderText>
                    <TransactionsHeaderInput data-test="TransactionCurrencyRate" isCorrect={this.props.customCurrencyCorrect} type="number" step="0.1" placeholder="Change euro rate e.g. 0,00." onChange={e => this.setEurValue(e.target.value)} />
                </TransactionsHeader>
                <TransactionsContentContainer data-test="TransactionList" data-test-transactions-length={this.props.mockupObject.length} ref={element => this.TransactionContainerEl = element} myHeight={this.props.transactionContentHeight}>
                    <TransactionDesc>
                        <TransactionDescriptionField>Name</TransactionDescriptionField>
                        <TransactionDescriptionField>Amount</TransactionDescriptionField>
                        <TransactionDescriptionField></TransactionDescriptionField>
                    </TransactionDesc>
                    {this.generateTransactions()} {/* Transaction Fields */}
                </TransactionsContentContainer>
                <TransactionSummary>
                    <TransactionSummaryTitle isNegativeValue={this.props.totalNegativeValue}>Total:</TransactionSummaryTitle>
                    <TransactionSummaryField data-test="TransactionSummaryFieldPLN">{this.props.totalPLN.toFixed(2)}
                        <SummaryCurrency isNegativeValue={this.props.totalNegativeValue}> PLN</SummaryCurrency>
                    </TransactionSummaryField>
                    <TransactionSummaryField data-test="TransactionSummaryFieldEUR">{this.props.totalEUR.toFixed(2)}
                        <SummaryCurrency isNegativeValue={this.props.totalNegativeValue}> EUR</SummaryCurrency>
                    </TransactionSummaryField>
                </TransactionSummary>
            </TransactionsContainer>
        );
    };
}

Transactions.propTypes = {
    totalPLN: PropTypes.number.isRequired,
    totalEUR: PropTypes.number.isRequired,
    mockupObject: PropTypes.array.isRequired,
    customCurrencyCorrect: PropTypes.bool.isRequired,
    totalNegativeValue: PropTypes.bool.isRequired,
    transactionContentHeight: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
    totalPLN: state.transactionsReducer.totalPLN,
    totalEUR: state.transactionsReducer.totalEUR,
    mockupObject: state.transactionsReducer.mockupObject,
    customCurrencyCorrect: state.transactionsReducer.customCurrencyCorrect,
    totalNegativeValue: state.transactionsReducer.totalNegativeValue,
    transactionContentHeight: state.transactionsReducer.transactionContentHeight
});

export default connect(mapStateToProps)(Transactions);