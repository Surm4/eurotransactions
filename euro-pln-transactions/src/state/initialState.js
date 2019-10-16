const initialState = {
    currentEURvalue: 4.30,
    totalPLN: 0,
    totalEUR: 0,
    newId: 5,
    newAmount: "",
    newAmountCorrect: false,
    newName: "",
    newNameCorrect: false,
    customCurrencyCorrect: false,
    totalNegativeValue: false,
    transactionContentHeight: 0,
    mockupObject: [
        { Id: 1, Name: "Binance", ValueEUR: 1500, deleteButtonEnabled: false, toDeleteStatus: false, isVisible: true, negativeValue: false },
        { Id: 2, Name: "Sklep Biedronka", ValueEUR: -10, deleteButtonEnabled: false, toDeleteStatus: false, isVisible: true, negativeValue: true },
        { Id: 3, Name: "Leasing", ValueEUR: -1000, deleteButtonEnabled: false, toDeleteStatus: false, isVisible: true, negativeValue: true },
        { Id: 4, Name: "Zwrot butów", ValueEUR: 200, deleteButtonEnabled: false, toDeleteStatus: false, isVisible: true, negativeValue: false },
    ]
};

export default initialState;
