const userSchema = require('../Models/Auth');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signUp = async (req, res) => {
    try {
        let userData = req.body
        // console.log(userData);
        if (Object.keys(userData).length === 0) return res.status(400).json({ status: 'error', message: 'Provide all details' })
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const allUsers = await userSchema.find({ email: userData.email })
        if (allUsers.length>0) {
            return res.status(400).json({ status: 'error', message: 'Email already exists' })
        }
        // console.log(allUsers.length)
        const user = new userSchema({
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            password: hashedPassword
        });

        await user.save();
        return res.status(200).json({ status: 'ok', message: 'Thanks for signup' });
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ status: 'error', message: err.message })
    }
}

const login = async (req, res) => {
    try {
        let userData = req.body
        console.log(userData)
        console.log(!userData);
        if (Object.keys(userData).length === 0) { return res.status(400).json({ status: 'error', message: 'Provide all details' }) }
        const user = await userSchema.findOne({ email: userData.email })
        if (!user) { return res.status(400).json({ status: 'error', message: 'User not found' }) }
        let password = await bcrypt.compare(userData.password, user.password)
        if (user && password) {
            const token = jwt.sign(
                {
                    userId: user._id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                },
                process.env.SECURITY_KEY,
                {
                    expiresIn: '1d',
                }
            );
            return res.status(200).json({ status: 'ok', data: 'Login Successful', token: token })
        }
        return res.status(400).json({ status: 'error', message: 'User not found' })
    }
    catch (err) {
        return res.status(400).json({ status: 'ok', message: err.message })
    }
}

const profile = async (req, res) => {
    try {
        const userData = req.user
        if (!userData) { return res.status(400).json({ status: 'ok', message: 'data not found' }) }
        const user = await userSchema.findOne({ _id: userData.userId}, {password: 0})
        if (!user) { return res.status(400).json({ status: 'error', message: 'User not found' }) }
        return res.status(200).json({ status: 'ok', data: { firstName: user.firstName, lastName: user.lastName } })
    }
    catch (err) {
        return res.status(400).json({ status: 'error', message: err.message })
    }
}

module.exports = {
    signUp: signUp,
    login: login,
    profile: profile
}
