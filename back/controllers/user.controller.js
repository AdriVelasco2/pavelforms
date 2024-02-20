const User = require("../models/user.model.js");
const bcrypt = require("bcryptjs");
exports.createUser = async (req, res) => {
    const { name, username, email, password, role } = req.body;

    // creating a new User
    const user = new User({
        name: name || "",
        username,
        email,
        password: await User.encryptPassword(password),
        role
    });

    // saving the new user
    await user.save()
        .then(() => {
            res.send({
                _id: savedUser._id,
                name: savedUser.name,
                username: savedUser.username,
                email: savedUser.email,
                role: savedUser.role,
            })
        })
        .catch ((err) => {
            res.status(err?.status || 500).send({message: err.message})
        })
};

exports.getUsers = (req, res) => {
    User.find()
        .then((data) => {
            res.send(data)
        })
        .catch ((err) => {
            res.status(err?.status || 500).send({message: err.message})
        })
};

exports.getUser = (req, res) => {
    User.findById(req.params.id)
        .then((data) => {
            res.send(data)
        })
        .catch ((err) => {
            res.status(err?.status || 500).send({message: err.message})
        })
};

exports.updatePass = async (req, res) => {
    const {id} = req.params;
    if (req.body.password) {
      await User.findOne({ _id: id })
        .then(async data => {
            req.body.password_1 = data.password
            req.body.password_2 = data.password_1

            const password0IsValid = await User.comparePassword(
                req.body.password,
                data.password
              );
              const password1IsValid = await User.comparePassword(
                req.body.password,
                data.password_1
              );
              const password2IsValid = await User.comparePassword(
                req.body.password,
                data.password_2
              );
           
              

            if(!password0IsValid && !password1IsValid && !password2IsValid){
                await User.encryptPassword(req.body.password)
                 
                await User.updateOne({ _id: id }, { $set: req.body })
                    .then(num => {
              console.log(num);
              console.log(req.body);

                        if (num.modifiedCount == 1) {
                            res.status(201).send({ message: "Usuario actualizado" });
                        } else {
                            
                            res.status(400).send({  message: `No se puede actualizar el usuario de id (${id}). Igual tienes el req.body vacío` });
                            
                        }
                    })
                    .catch(err => {
                        res.status(err?.status || 500).send({ message: err.message });
                    });
            }else{
                res.status(403).send({ message: "La contraseña coincide con alguna de las anteriores" });
            }
        })
        .catch(err => {
          res.status(err?.status || 500).send({ message: err.message });
        });
    }
};