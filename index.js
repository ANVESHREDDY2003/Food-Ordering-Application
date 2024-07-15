const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const User = require('./User');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "ndkwdkwdkbdkwd";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('DB is successfully connected'))
    .catch((err) => console.error(err));

app.post('/register', async (req, res) => {
    const { fname, lname, email, password } = req.body;
    const encryptedPassword = await bcrypt.hash(password, 10);
    try {
        const olduser = await User.findOne({ email });
        if (olduser) {
            return res.json({ error: "User exists" });
        }
        await User.create({
            fname,
            lname,
            email,
            password: encryptedPassword,
        });
        res.send({ status: 'ok' });
    } catch (error) {
        res.send({ status: 'error' });
    }
});

app.post("/login-user", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.json({ error: "User not found" });
    }
    if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({}, JWT_SECRET);
        if (res.status(201)) {
            return res.json({ status: "ok", data: token });
        } else {
            return res.json({ error: "error" });
        }
    }
    res.json({ status: "not okay", error: "invalid password" });
});

const orderSchema = new mongoose.Schema({
    orderItems: { type: String, required: true },
    totalPrice: { type: Number, required: true },
    status: { type: String, default: 'Pending' },
});

const Order = mongoose.model('Order', orderSchema);

app.post('/api/orders', async (req, res) => {
    const { orderItems, totalPrice, status } = req.body;
    try {
        await Order.create({
            orderItems,
            totalPrice,
            status
        });
        res.send({ status: 'ok' });
    } catch (error) {
        res.send({ status: 'error' });
    }
});

app.get('/api/orders', async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (err) {
        console.error('Error retrieving orders:', err);
        res.status(500).json({ error: 'Error retrieving orders' });
    }
});

app.put('/api/orders', async (req, res) => {
    const updatedOrders = req.body;
    try {
        for (const updatedOrder of updatedOrders) {
            await Order.updateOne({ _id: updatedOrder._id }, { $set: { status: updatedOrder.status } });
        }
        res.send({ status: 'ok' });
    } catch (error) {
        console.error('Error updating orders:', error);
        res.send({ status: 'error' });
    }
});

app.listen(process.env.PORT, () => console.log('Server has been started successfully'));
