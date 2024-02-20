const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String
    },
    username: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    password_1: {
      type: String
    },
    password_2: {
      type: String
    },
    code: {
      type: Number
    },
    code_date: {
      type: Date
    },
    failed_date: {
      type: Date,
      default: null
    },
    password_counter: {
      type: Number,
      required: true,
      default: 0
    },
    limit: {
      type: Number,
      required: true,
      default: 4
    },
    block_account: {
      type: Boolean,
      required: true,
      default: false
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin", "superadmin"]
      },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

productSchema.statics.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hashSync(password, salt);
};

productSchema.statics.comparePassword = async (password, receivedPassword) => {
  return bcrypt.compareSync(password, receivedPassword)
}

// //Es una capa adicional de seguridad que se usa para hashear la contraseña antes de que el usuario sea guardado en la bbdd. Para asegurar
// //que la contraseña se no se guarda en texto plano
// productSchema.pre("save", async function (next) {
//   const user = this;
//   if (!user.isModified("password")) {
//     return next();
//   }
//   const hash = await bcrypt.hash(user.password, 10);
//   user.password = hash;
//   next();
// })

module.exports = mongoose.model("User", productSchema);
