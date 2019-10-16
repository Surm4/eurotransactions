const validateName = (name) => {
    try {
        if (name.trim().length && name.length <= 32) {
            return name;
        } 
        return;
    } catch {
        return;
    }
};

export default validateName;