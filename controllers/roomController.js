const express = require('express');
const Room = require('../models/room_model');
const Message = require('../models/message_model');

exports.rooms = async (req, res) => {
    const default_rooms = ["Education", "Business", "Games", "Sports", "Memes"];

    try {
        let list_rooms = [];
        for (const roomName of default_rooms) {
            const existRoom = await Room.findOne({ name: roomName});
            
            if (!existRoom) {
                const room = new Room({ "name": roomName});
                await room.save();
                list_rooms.push(room);
            } else {
                console.log('room exists');
                
            }
            
        }
        return res.status(200).json(list_rooms);
    } catch (err) {
        console.log(err);
        return res.status(400).json({error: `${err}`});
    }
};

exports.getMessage = async (req, res) => {
   
    const {roomName} = req.params;
    try {
        if (!roomName) {
            return res.status(400).json({error: 'Room name required'});
            console.log('room not found');
        }
        console.log(`room found: ${roomName}`);
        const messages = await Message.find({roomName: roomName}).sort({created_at: 1});

        //console.log(messages);
        return res.status(200).json(messages);
    } catch (err) {
        console.log(`Error: ${err}`);
        return res.status(500).json({error: `${err}`});
    }
};

exports.sendMessage = async (req, res) => {
    const {roomName} = req.params;
    const {sender, message} = req.body;

    try {
        if (!roomName) {
            return res.status(400).json({error: 'Room name required'});
        }

        const newMessage = new Message({message, roomName, sender});

        await newMessage.save();

        return res.status(201).json('Message sent');
    } catch (err) {
        console.log(`Error: ${err}`)
        return res.status(500).json({error: `${err}`});
    }
};