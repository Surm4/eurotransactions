import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SET_TRANSACTION_AMOUNT_REQUEST, SET_TRANSACTION_NAME_REQUEST, ADD_TRANSACTION_REQUEST } from '../actions/actions';
import {
    THEME_MAIN_PRIMARY_FONT_COLOR, THEME_MAIN_SECONDARY_FONT_COLOR, THEME_MAIN_BG_COLOR, THEME_MAIN_TERTIARY_COLOR, THEME_MAIN_READONLY_COLOR, THEME_MAIN_BODY_COLOR
    , THEME_MAIN_ERROR_COLOR, THEME_MAIN_DARK_COLOR
} from '../css/styles';

const AddTransactionContainer = styled.div`
    background-color: ${THEME_MAIN_BG_COLOR};
    width: 80vw;
    padding: 3rem;
    margin: auto;
    margin-bottom: 1rem;

    @media (max-width: 950px) {
        width: 100vw;
        padding: 1rem;
    }
`;

const AddFunctionsWrap = styled.div`
    display: flex;
    height: 2rem;
    flex-wrap: wrap;

    @media (max-width: 950px) {
        flex-direction: column;
        flex-wrap: wrap;
        height: auto;
    }
`;

const AddTransactionName = styled.input`
    display: block;
    flex: 7;
    text-align: center;
    font-weight: 700;
    color: ${THEME_MAIN_PRIMARY_FONT_COLOR};
    background-color: transparent;
    border: none;
    border-bottom: 1px solid  ${props => props.isCorrect ? THEME_MAIN_SECONDARY_FONT_COLOR : THEME_MAIN_ERROR_COLOR};

    @media (max-width: 950px) {
        flex: 1;
        margin-bottom: 1rem;
        padding: .5rem;
    }
`;

const AddTransactionAmount = styled.input`
    display: block;
    margin: 0 1rem 0 1rem;
    flex: 2;
    text-align: center;
    font-weight: 700;
    color: ${THEME_MAIN_PRIMARY_FONT_COLOR};
    background-color: transparent;
    border: none;
    border-bottom: 1px solid ${props => props.isCorrect ? THEME_MAIN_SECONDARY_FONT_COLOR : THEME_MAIN_ERROR_COLOR};

    ::-webkit-inner-spin-button,
    ::-webkit-outer-spin-button { 
        margin: 0;
        padding: 1rem 0 1rem 0;
        color: ${THEME_MAIN_SECONDARY_FONT_COLOR};
        background-color: ${THEME_MAIN_BODY_COLOR};
    }

    @media (max-width: 950px) {
        flex: 1;
        margin: 0;
        padding: .5rem;
    }
`;

const AddTransactionCurrency = styled.input`
    display: block;
    margin: 0 1rem 0 0;
    flex: 2;
    text-align: center;
    font-weight: 700;
    color: ${THEME_MAIN_TERTIARY_COLOR};
    background-color: transparent;
    border: none;
    border-bottom: 1px solid ${THEME_MAIN_READONLY_COLOR};

    @media (max-width: 950px) {
        flex: 1;
        margin: 0;
        margin-top: 1rem;
        margin-bottom: 1rem;
        padding: .5rem;
    }
`;

const AddTransactionButton = styled.button`
    border: none;
    background-color: ${THEME_MAIN_SECONDARY_FONT_COLOR};
    flex: 1;
    color: ${THEME_MAIN_DARK_COLOR};
    font-weight: 900;
    padding: 0;
    cursor: pointer;
    position: relative;
    transition: .25s ease;
    outline: none;

    &:hover [data-animation="button-animation"] {
        width: 100%;
        padding: 1rem;
        left: 0;
        top: 0;
        transform: none;
        opacity: 1;
    }

    @media (max-width: 950px) {
        flex: 1;
        padding: .5rem;
    }
`;

const AddTransactionButtonAnimationBox = styled.div`
    transition: .25s ease;
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translate(-100%, -50%);
    width: 0;
    height: 5px;
    background: ${THEME_MAIN_DARK_COLOR};
    opacity: 0;
    pointer-events: none;

    &:after {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        content: "Add";
        color: ${THEME_MAIN_SECONDARY_FONT_COLOR};
        pointer-events: none;
    }
`;

class AddTransaction extends React.Component {

    addTransaction = () => {
        if (!this.props.newAmountCorrect || !this.props.newNameCorrect) return;
        this.props.dispatch({ type: ADD_TRANSACTION_REQUEST });
    };

    setTransactionAmount = (amount) => {
        this.props.dispatch({ type: SET_TRANSACTION_AMOUNT_REQUEST, amount });
    };

    setTransactionName = (name) => {
        this.props.dispatch({ type: SET_TRANSACTION_NAME_REQUEST, name });
    };

    render() {
        return (
            <AddTransactionContainer>
                <AddFunctionsWrap>
                    <AddTransactionName onChange={e => this.setTransactionName(e.target.value)}
                        type="text" placeholder="Transaction Name" maxLength="32" isCorrect={this.props.newNameCorrect} value={this.props.newName} />
                    <AddTransactionAmount onChange={e => this.setTransactionAmount(e.target.value)} isCorrect={this.props.newAmountCorrect}
                        value={this.props.newAmount}
                        type="number" step="0.01" placeholder="0,00" />
                    <AddTransactionCurrency type="text" value="EUR" disabled />
                    <AddTransactionButton onClick={e => this.addTransaction()}>
                        Add
                        <AddTransactionButtonAnimationBox data-animation="button-animation"></AddTransactionButtonAnimationBox>
                    </AddTransactionButton>
                </AddFunctionsWrap>
            </AddTransactionContainer>
        );
    };
}

AddTransaction.propTypes = {
    newName: PropTypes.string.isRequired,
    newAmount: PropTypes.any.isRequired,
    newAmountCorrect: PropTypes.bool.isRequired,
    newNameCorrect: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
    newAmountCorrect: state.transactionsReducer.newAmountCorrect,
    newNameCorrect: state.transactionsReducer.newNameCorrect,
    newName: state.transactionsReducer.newName,
    newAmount: state.transactionsReducer.newAmount
});

export default connect(mapStateToProps)(AddTransaction);