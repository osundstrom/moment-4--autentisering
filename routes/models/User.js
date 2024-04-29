
const mongoose = require("mongoose"); //Mongoose
const bcrypt = require("bcrypt"); //bcrypt

//schema för användare
 const userSchema = new mongoose.Schema ({
    username: {
        type: String,
        require: true,
        unique: true,
        trim: true,
    },

    password: {
        type: String,
        require: true,
    },

    email: {
        type: String,
        require: true,
        unique: true,
        trim: true
    },

    account_created: {
        type: Date,
        default: Date.now
    }
 });



//Hasha lösenord innan spara
userSchema.pre("save", async function(next) {
    try{
        if(this.isNew || this.isModified(password)) {
            const hashedPassword = await bcrypt.hash(this.password, 10);
            this.password = hashedPassword;
        }
        next()
    }catch(error) {
        next(error)
    }
});
 



//användra regrestreras
userSchema.statics.register = async function(username, password, email) {
    try {
        const user = new this({username, password, email});
        await user.save();
        return user;
    } catch (error) {
        throw error;
    }
};



//Jämför lösenord
userSchema.methods.comparePassword = async function(password) {
    try {
        return await bcrypt.compare(password , this.password)

    }catch(error) {
        throw(error);
    }
};

//inloggning

userSchema.statics.login = async function (username, password) {
    try {
        const user = await this.findOne({username});
        if(!user) {
            throw new error("Invalid Username");
        }

        const passwordMatch = await user.comparePassword(password);

        if(!passwordMatch) {
            throw new error("Invalid username");
        }

        return user;

    } catch (error) {
        throw error;
    }
};

const User = mongoose.model("User", userSchema);
module.exports = User;