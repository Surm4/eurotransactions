const validateIsNumber = (amount) => {
    try {
        const parsedAmount = parseFloat(amount) || undefined;
        return parsedAmount;
    } catch {
        return;
    }
};

export default validateIsNumber;