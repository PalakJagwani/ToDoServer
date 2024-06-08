import User from '../Model/User.js'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import Todo from '../Model/Todo.js'

export const signupUser = async(req, res) => {
    try {
        const existedUser = await User.findOne({username : req.body.username});

        if(existedUser){
            return res.status(400).json({message : "Username already exists!"})
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const user = {username : req.body.username, password : hashedPassword}
        const newUser = await new User(user)

        await newUser.save();
        return res.status(200).json({user : newUser, message : "Account created successfully"})

    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

export const loginUser = async (req, res) => {
    const user = await User.findOne({username : req.body.username})

    if(!user){
        return res.status(400).json({message : "Incorrect Username or password"})
    }

    try {
        let match = await bcrypt.compare(req.body.password, user.password)

        if(match){
            return res.status(200).json({user : user, message : "User loggedIn successfully"})
        }else{
            return res.status(400).json({message : "Incorrect Username or password"})
        }
    } catch (error) {
        return res.status(500).json({message : error.message});
    }
}

export const signoutUser = async(req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if(!user){
            return res.status(400).json({message : "User not found"})
        }
        return res.status(200).json({message : "User signed out successfully"})
    } catch (error) {
        return res.status(500).json({message : error.message});
    }
}