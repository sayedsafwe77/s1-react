import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 32,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

userSchema.virtual("password").set(function (plain) {
  this._plainPassword = plain;
});

// Mongoose runs validation BEFORE `pre('save')`, so hashing inside `pre('save')`
// trips the `passwordHash: required` validator. Hash on `pre('validate')` so the
// hash is populated before required-fields validation runs.
userSchema.pre("validate", async function (next) {
  if (this._plainPassword) {
    this.passwordHash = await bcrypt.hash(this._plainPassword, 10);
    this._plainPassword = undefined;
  }
  next();
});

userSchema.methods.comparePassword = function (plain) {
  return bcrypt.compare(plain, this.passwordHash);
};

userSchema.methods.toPublic = function () {
  return {
    id: this._id.toString(),
    username: this.username,
    email: this.email,
  };
};

export default mongoose.model("User", userSchema);
