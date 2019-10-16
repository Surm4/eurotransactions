const validateIsNumber = (amount) => {
    try {
        const parsedAmount = parseFloat(amount) || false;
        return parsedAmount;
    } catch {
        return;
    }
};

export default validateIsNumber;