import validator from "validator";
import jwt  from "jsonwebtoken";
import bcrypt from "bcrypt";
import  Mongoose  from "mongoose";

const userSchema=new Mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please provide your name"],
        minLength:[3,"Name should have atleast 3 characters"],
        maxLength:[30,"Name can contain maximum 30 characters"]
    },
    phone:{
        type:Number,
        required:[true,"Please provide your email"],
    },
    email:{
        type:String,
        required:[true,"Please provide your email"],
        validator:[validator.isEmail,"Please provide a valid email"]
    },
    password:{
        type:String,
        required:[true,"Please provide your password"],
        select:false
    },
    role:{
        type:String,
        required:[true,"Please choose your role"],
        enum:["job seeker","employer"]
    },
    createdAt:{
        type:Date,
        default:Date.now
    }

})

//Hashing the passwords

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      next();
    }
    this.password = await bcrypt.hash(this.password, 10);
  });
  
//Compare method for passoword with hashed password

userSchema.methods.comparePassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}


//Generate jwt token

userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_KEY, {
      expiresIn: process.env.JWT_EXPIRE,
    });
};

export const User=Mongoose.model("User",userSchema);