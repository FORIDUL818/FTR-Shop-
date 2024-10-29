const mongoose = require("mongoose");

class UserSchema {
    constructor() {
        this.Schema = mongoose.Schema;
    }

    createUserSchema() {
        return new this.Schema({
            firstName: { type: String, required: true },
            lastName: { type: String, required: true },
            email: {
                type: String,
                required: true,
                unique: true,
                validate: {
                    validator: (v) => {
                        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                        return emailRegex.test(v);
                    },
                    message: "Email is not valid"
                }
            },
            password: { type: String, required: true }
        }, { versionKey: false, timestamps: true });
    }
}

const userModel = mongoose.model("users", new UserSchema().createUserSchema());

module.exports = userModel;
