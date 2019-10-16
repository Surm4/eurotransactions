const validateName = (name) => {
    try {
        if (name.length && name.length <= 32) {
            return name;
        } 
        return;
    } catch {
        return;
    }
};

export default validateName;