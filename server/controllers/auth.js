// import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { User } from '../models/User.js'
// import { scryptSync,randomBytes } from 'crypto';
// const salt = randomBytes(16).toString("hex")


// Register user 
export const register = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation,
        } = req.body;
        // const salt=await bcrypt.genSalt();
        // const passwordHash=await bcrypt.hash(password,salt);
        // const passwordHash = scryptSync(password, salt, 32).toString("hex");
        const passwordHash = password;
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 10000),
            impression: Math.floor(Math.random() * 10000)
        });
        const savedUser = await newUser.save();
        res.status(202).json(savedUser);
    } catch (err) {
        res.status(500).json(`${err.message}`);
    }
}


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) {
            res.status(400).json({ 'msg': 'User does not found' });
            return;
        } 
        const validPassword = (user.password == password);
        if (!validPassword) {
            res.status(400).json({ 'msg': 'Invalid credential' });  
            return;
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            delete user.password;
            res.status(200).json({ token, user, 'status': 200 });
    } catch (err) {
        res.status(500).json(`${err.message}`);
    }
}
