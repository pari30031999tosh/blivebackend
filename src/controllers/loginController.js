const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const Users = require('../models/user');



async function login(req, res){
    
    let email = req.body.email;
    let password = req.body.password;
    
    try{
        let payload = {email: email, password: password}
        let token  = jwt.sign(payload, process.env.JWT_SECRET);
        
        res.cookie('token ',token);
        
        var result = await Users.findOne({email: email});
        if(result){
            console.log(result)
            let valid = bcrypt.compare(password, result.password);
            if(valid){
                return res.status(200).json({
                    status: 200,
                    message: 'successfully login',
                    result: result,
                    jwt: token
                })
            }else{
                return res.status(201).json({
                    status: 201,
                    message: 'Invalid password'
                })
            }
            
        }else{
            return res.status(203).json({
                status: 203,
                message: 'invalid email'
            })
        }

    }catch(err){
        console.log("error==========================", err)
        return res.status(300).json({
            status: 300,
            error: err
        })
    }
}

async function signup(req, res){
    
    let {name, email, password} = req.body;
    
   
    try{
       let salt = await bcrypt.genSalt(10);
       console.log("salt=============", salt)
       let newpassword = await bcrypt.hash(password, salt);
        
       let data = {
            _id: new mongoose.Types.ObjectId(),
            name:name,
            email:email,
            password:newpassword
       }

       const users = new Users(data)
       var result = await users.save();

       return res.status(200).json({
        status: 200,
        message: 'successfully created records',
        result: result
       })

    }catch(err){
        
        console.log("error===============================", err)
        return res.status(300).json({
            status: 300,
            message: "internal server error=========================",
            error: err
        })
    }
}

async function logout(req, res){
    try{
        res.clearCookie("token")
        return res.status(200).json({
            status: 200,
            message: 'successfully logged out'
        })

    }catch(err){
        console.log("error===================================", err)
        return res.status(300).json({
            status: 300,
            message: "error logging out",
            error: err
        })
    }
}

module.exports = {login, signup, logout}