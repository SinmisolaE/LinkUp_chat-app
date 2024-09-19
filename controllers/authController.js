const express = require('express');
const User = require('../models/user_model');
const { error } = require('console');
const bcrypt = require('bcrypt')

exports.signup = async (req, res) => {
    const {email, username, password} = req.body;

    console.log(username + email + password);

    try {

        const existUser = await User.findOne({ email });
        if (existUser) {
            return res.status(400).json({error: 'Email already exists!'});
        }

        const existingUser = await User.findOne({ username });

        console.log(`existnguser: ${existingUser}`);

        if (existingUser) {
            return res.status(400).json({ error: 'User already exists!' });
        }

        if (length(password) < 6) {
            return res.status(400).json({ error: 'Password must contain atleast 6 characters!'});
        }


        
        hashed_password = await bcrypt.hash(password, 10);

        console.log(hashed_password);

        const user = new User({username: username, hashed_password: hashed_password, email: email});

        await user.save();

        console.log('User created');
        return res.status(201).json({message: 'User created successfully'});
        
    } catch (err) {
        console.log('catch error');
        return res.status(500).json({ error: `${err}` });
    }
};

exports.login = async (req, res) => {
    const {username, password} = req.body;
    console.log(username);

    try {
        const user = await User.findOne({ username });
        
        if (user) {
           
            if (await bcrypt.compare(password, user.hashed_password)) {
                console.log('User found');
                return res.status(201).json({message: "Login successful"});
            } else {
                return res.status(400).json({error: 'Password incorrrect'});
            }
        } else {
            console.log('User not found');
            return res.status(400).json({error: 'User not found!'});
        }
    } catch (error) {
        return res.status(500).json({ error: `${error}`});
    }
};