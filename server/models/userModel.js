import mongoose from 'mongoose';
import bcrypt from "bcryptjs"
import validator from 'validator';

const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
    type: String,
    required: [true, "Name Harus diisi"],
    unique: [true,"Username Sudah Di  Gunakan silahkan buat yg lain"]
  },
  email: {
    type: String,
    required: [true, "Email harus diisi"],
    unique: [true, "email sudah pernah didaftarkan"],
    validate: {
    validator: validator.isEmail,
    message: "inputan harus berformat Email foo@mail.com"
    }
  },
  password: {
    type: String,
    required: [true, "password harus diisi"],
    minLength: [6, "Password minimal 6 karakter"]
  },

  role: {
    type: String,
    enum: ["user", "owner"],
    default: "user"
  },
});

userSchema.pre("save",async function(){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

userSchema. methods. comparePassword = async function (reqBody) {
    return await bcrypt.compare(reqBody, this.password)
}

const User = mongoose.model("User", userSchema)

export default User