const router = require("express").Router();
const User = require("../Models/User");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


router.get("/", async (req, res) => {
    try {
        const data = await User.find({}).exec();
        res.status(200).json(data);
    } catch (err) {
        res.status(400).json({ message: "error", error: err });
        console.log("**** User Get request error catch ****");
        console.log(err);
    }
});


router.post("/signup", async (req, res) => {
    try {

        const { username, password } = req.body;
        
        const doc = await User.findOne({username: username}).exec();
        if(doc) {
            res.status(200).json({message: "User Exist"});
        } else {
            bcrypt.hash(password, 10, async (err, hash) => {
                if (err) throw err;
    
                const newuser = new User({
                    _id: mongoose.Types.ObjectId(),
                    username: username,
                    password: hash
                });
                const data = await newuser.save();
                res.status(201).json({ message: "Created user", result: data });
    
            });
        }
        
    } catch (err) {
        res.status(400).json({ message: "error", error: err });
        console.log("**** User signup post request error catch ****");
        console.log(err);
    }
});

router.post("/signin", async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log(req.body);
        const user = await User.findOne({ username: username }).exec();
        if(user) {
            bcrypt.compare(password, user.password, async (err, same) => {
                if(err) throw err;
                if(same) {
                    res.status(200).json({message: "successful"});
                } else {
                    res.status(200).json({message: "username or password is incorrect"});
                }
            });
        } else {
            res.status(200).json({message: "User not found"});
        }
    } catch (err) {
        res.status(400).json({ message: "error", error: err });
        console.log("**** User signin post request error catch ****");
        console.log(err);
    }
});

router.delete("/deleteAll", async(req, res) => {
    try {
        await User.deleteMany({}).exec();
        res.status(200).json({message: "Users deleted"});
    } catch (err) {
        res.status(400).json({ message: "error", error: err });
        console.log("**** User deleteAll request error catch ****");
        console.log(err);
    }
});

module.exports = router;