const jwt = require("jsonwebtoken");
const User = require("../models/user.model.js");
const { SECRET } = require("../config.js");
const nodemailer = require("nodemailer");
const moment = require('moment');
require("dotenv").config();
const expiryDays = 0;
const expiryMins = 360;

let transporter = nodemailer.createTransport({
  host: 'smtp.upintelligence.es',
  port: 587,
  secure: false,
  auth: {
    user: 'adrian.velasco@upintelligence.es',
    pass: process.env.EMAIL_PASSWORD
  }
});

exports.createAccount = async (req, res) => {
  const { name, username, email, password, role } = req.body;
  await User.findOne({$or: [{ email }, { username }]})
    .then(async (user) => {
      if (user) {
        return res.status(403).send({ message: "Introduce un email y username que no estén en la base de datos" });
      }else{
        const newUser = new User({
          name: name || "",
          username,
          email,
          password: await User.encryptPassword(password),
          password_1: "",
          password_2: "",
          role: role || "user"
        });

        await newUser.save()
          .then(user => {
            res.status(201).send({message: `El usuario ${user.email} se ha registrado satisfactoriamente!`});
          })
          .catch(err => {
            res.status(err?.status || 500).send({ message: err.message });
          });
      }
    })
    .catch(err => {
      res.status(err?.status || 500).send({ message: err.message });
    });
};

exports.logIn = async (req, res) => {
  let {user, password} = req.body
  let logInFilter = {email: "none"};
  if (user) {
    logInFilter = {
      $or: [
        { email: user },
        { username: user },
      ],
    };
  }
  User.findOne(logInFilter)
    .then(async user => {
      try{
        if (!user) {
          return res.status(404).send({ message: "Usuario no encontrado" });
        }

        if(user.block_account){
          return res.status(403).send({ message: "Usuario bloqueado." });
        }

        const passwordIsValid = await User.comparePassword(
          password,
          user.password
        );

        if (!passwordIsValid){
          await User.findOne({
            failed_date: {
              $gt: moment().subtract(1, 'hour').toDate(),
            },
            _id: user._id,
          })
            .then(async usr => {
              if (usr !== null) {
                await User.updateOne({ _id: user._id }, { $set: { password_counter: (user.password_counter + 1), updatedAt: user.updatedAt } });
              } else {
                await User.updateOne({ _id: user._id }, { $set: { password_counter: 1 } });
                user.password_counter = 0;
              }

              if(user.password_counter == 0)
                await User.updateOne({ _id: user._id }, {$set: {failed_date: new Date()}})

              if(user.password_counter + 1 >= user.limit){
                await User.updateOne({ _id: user._id }, {$set: {block_account: true}})
                const codegen = Math.floor(Math.random() * 100000000);
                const code = codegen.toString().substring(0,6)
                const code1 = code.toString().substring(0,3)
                const code2 = code.toString().substring(3,6)

                var mailOptions = {
                  from: 'adrian.velasco@upintelligence.es',
                  to: user.email,
                  subject: 'Usuario bloqueado',
                  html: `<div align="center"></div><br><br><br>Su cuenta ha sido bloqueada, se le ha asignado un código de verificación:</p><p><strong>${code1}<br>${code2}</strong></p><p>Este código tiene un periodo de caducidad de 1 hora.</p><p><a href="http://localhost:3000/codePage/userBlocked/${user.id}">Click Aqui</a></p>`,
                  // attachments: [{
                  //   filename: 'logotipo.svg',
                  //   path: __dirname +'/imgs/logotipo.svg',
                  //   cid: 'logo'
                  // }]
                };
                transporter.sendMail(mailOptions, async (err, data) => {
                  if (err) {
                    res.status(err?.status || 500).send({ message: err.message })
                  }
                  let userObj={
                    code: code,
                    code_date: new Date()
                  };
                  await User.updateOne({ _id: user._id }, { $set: userObj });
                });

                return res.status(401).send({
                  accessToken: null,
                  message: "Contraseña incorrecta, su cuenta ha sido bloqueada. Le enviaremos un código de desbloqueo a su correo"
                });
              }else{
                let intentos = user.limit - user.password_counter - 1
                return res.status(401).send({
                  accessToken: null,
                  message:  `Contraseña incorrecta, le quedan ${intentos} intentos`
                });
              }
            })
            .catch(err => {
              console.log({ message: err.message });
            });
        }else{
          await User.updateOne(
            { _id: user._id },
            { $set: { password_counter: 0, failed_date: null } }
          );
          var sessId = Math.floor(Math.random() * 10001);      
          var token = jwt.sign({ email: user.email, username: user.username, subject: sessId }, SECRET, {
            expiresIn: 60*expiryMins + 86400*expiryDays 
          });
            
          res.status(200).send({
            _id: user._id,
            username: user.username,
            email: user.email,
            accessToken: token,
            expiryDate: new Date(new Date().getTime() + 60000*expiryMins + 86400000*expiryDays)
          });
        }
      }catch(err){
        res.status(500).send({ message: err.message });
      }
    })
    .catch((err) => {
      res.status(err?.status || 500).send({ message: err.message });
    });
};

exports.passCode = (req, res) => {
  let {id, code} = req.body;

  User.findById(id)
    .then(async user => {
      if (!user) {
        res.status(404).send({ message: "Usuario no encontrado" });
      }
      if(user.code != null && user.code != ""){
        if(user.code == code){
          await User.findOne({
            code_date: {
              $gt: moment().subtract(1, 'hour').toDate(),
            },
            _id: user._id,
          })
            .then(async usr => {
              if(usr != null){
                let userObj={
                  code: null,
                  code_date: null,
                  block_account: false,
                  password_counter: 0,
                  failed_date: null
                };
                await User.updateOne({ _id: user._id }, { $set: userObj });

                res.status(200).send({ message: "Código confirmado", id: user.id });
              }else{
                res.status(403).send({ message: "Código caducado" });
              }
            }).catch(err => {
              console.log({ message: err.message });
            });
        }else{
          res.status(403).send({ message: "Código de confirmación incorrecto" });
        }
      }else{
        res.status(404).send({ message: "No tienes un código de confirmación asociado" });
      } 
    })
    .catch(err => {
      res.status(err?.status || 500).send({ message: err.message });
    });
};

exports.forgotPassword = (req, res) => {
  let {email} = req.body
  let logInFilter = {email: "none"};
  if (email) {
    logInFilter = { email };
  }

  User.findOne(logInFilter)
    .then(user => {
      if(!user){
        return res.status(400).json({error: "No existe un usuario con este email"})
      }

      const codegen = Math.floor(Math.random() * 100000000);
      const code = codegen.toString().substring(0,6)
      const code1 = code.toString().substring(0,3)
      const code2 = code.toString().substring(3,6)
      
      var mailOptions = {
        from: 'adrian.velasco@upintelligence.es',
        to: user.email,
        subject: 'Recuperación de contraseña',
        html: `<div align="center"><img src="cid:logo"></div><br><br><br>Ha solicitado una renovación de la contraseña. El código que debe introducir en la aplicación es:</p><p><strong>${code1}<br>${code2}</strong></p><p>Este código tiene un periodo de caducidad de 1 hora.</p><p><a href="http://localhost:3000/codePage/forgotPassword/${user.id}">Click Aqui</a></p>`,
        // attachments: [{
        //   filename: 'logotipo.svg',
        //   path: __dirname +'/imgs/logotipo.svg',
        //   cid: 'logo'
        // }]
      };

      transporter.sendMail(mailOptions, async (err, data) => {
        if (err) {
          res.send(err)
        }
        let userObj={
          code: code,
          code_date: new Date()
        };
        await User.updateOne({ _id: user._id }, { $set: userObj })
        res.send(data);
      });
    })
    .catch(err => {
      res.status(err?.status || 500).send({ message: err.message });
    });
}
