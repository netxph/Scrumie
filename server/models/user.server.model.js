const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

let userSchema = new Schema({
    name: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdOn: { type: Date, default: Date.now }
});

userSchema.pre("save", (next) => {
    bcrypt
        .hash(this.password, 10)
        .then((hash) => this.password = hash);
    next(); 
});
