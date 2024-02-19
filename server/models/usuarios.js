// models/parejas.js

const { Schema, model, mongoose } = require("mongoose");

// Define el esquema del modelo pareja
const usuariosSchema = new mongoose.Schema(
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
    code_data: {
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
}
);

// Crea el modelo usuario
const usuario = mongoose.model("usuarios", usuariosSchema);

module.exports = usuario;
