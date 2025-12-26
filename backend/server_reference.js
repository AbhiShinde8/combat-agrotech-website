/**
 * NOTE: This is a REFERENCE implementation for the Node.js/Express backend.
 * In this specific environment, the app uses 'services/mockBackend.ts' to 
 * run entirely in the browser. 
 * 
 * To move to production:
 * 1. Set up a MongoDB instance.
 * 2. Deploy this code to a server (e.g., Heroku, AWS, DigitalOcean).
 * 3. Update the frontend 'services/api.ts' to call these endpoints via Axios.
 */

/*
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// --- Mongoose Schemas ---

const ProductSchema = new mongoose.Schema({
    name: String,
    category: String,
    description: String,
    imageUrl: String
});
const Product = mongoose.model('Product', ProductSchema);

const EnquirySchema = new mongoose.Schema({
    dealerName: String,
    companyName: String,
    location: String,
    phone: String,
    email: String,
    productInterest: String,
    status: { type: String, default: 'New' },
    date: { type: Date, default: Date.now }
});
const Enquiry = mongoose.model('Enquiry', EnquirySchema);

const MessageSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    message: String,
    date: { type: Date, default: Date.now }
});
const Message = mongoose.model('Message', MessageSchema);

// --- Routes ---

// Products
app.get('/api/products', async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

app.post('/api/products', authenticateToken, async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.json(newProduct);
});

app.delete('/api/products/:id', authenticateToken, async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
});

// Enquiries
app.post('/api/enquiries', async (req, res) => {
    const enquiry = new Enquiry(req.body);
    await enquiry.save();
    res.json({ message: 'Submitted' });
});

app.get('/api/enquiries', authenticateToken, async (req, res) => {
    const enquiries = await Enquiry.find().sort({ date: -1 });
    res.json(enquiries);
});

// Contact
app.post('/api/contact', async (req, res) => {
    const msg = new Message(req.body);
    await msg.save();
    res.json({ message: 'Sent' });
});

app.get('/api/contact', authenticateToken, async (req, res) => {
    const messages = await Message.find().sort({ date: -1 });
    res.json(messages);
});

// Auth
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    // In real app, hash password and check DB
    if (email === 'admin@combat.com' && password === 'admin') {
        const token = jwt.sign({ email }, process.env.JWT_SECRET || 'secret');
        res.json({ email, token });
    } else {
        res.status(401).send('Invalid credentials');
    }
});

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET || 'secret', (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
*/