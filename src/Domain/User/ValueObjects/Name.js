class Name {
    constructor(value) {
        if (!value || typeof value !== "string" || value.trim().length === 0) {
            throw new Error("Name cannot be empty and must be a valid string");
        }
        this.value = value.trim();
    }
}

module.exports= Name;