const calculateTransactionTotalEUR = (transactions) => {
    let total = transactions.map(transaction => parseFloat(transaction.ValueEUR));
    total = total.reduce((a, b) => a + b, 0);
    return total;
};

export default calculateTransactionTotalEUR;