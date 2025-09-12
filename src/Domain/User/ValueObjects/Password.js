const bcrypt = require('bcryptjs');

class Password{
    constructor(value, isHashed = false){
        if(!value){
            throw new Error("Password cannot be empty");
        }
        if(!isHashed && value.length < 6){
            throw new Error("Password must be at least 6 characters long.");
        }
        this.hashedPassword = isHashed? value: this.hash(value);
    
    }
    hash(plainPassword) {

        return bcrypt.hashSync(plainPassword, 10);

    }
    async compare (plainPassword) {

        return await bcrypt.compare(plainPassword, this.hashedPassword);
    }

    equals (otherPassword) {
        return otherPassword instanceof Password && this.hashedPassword === otherPassword.hashedPassword;
    }
}