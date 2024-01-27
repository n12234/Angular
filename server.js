const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const {PORT, DB_URL} = process.env;

const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
const port = 3000;


async function connect() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/demo_typescript");
    console.log("Connect successfully!!!");
  } catch (error) {
    console.log("Connect failure!!!");
  }
}

const Schema = mongoose.Schema;
const productSchema = new Schema({
  tlile: String,
  description: String,
  image: String,
  price: Number,
  category: String,
  count: Number,
  rate: Number,
});

const Product = mongoose.model('Products', productSchema);

app.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/product/:id', async (req, res) => {
  try {
    const products = await Product.findOne({ _id: req.params.id });
    if (!products) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const CategorySchema = new mongoose.Schema({
  email: String,
  password: String,
});

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const User = mongoose.model('User', UserSchema);

// Register endpoint
app.post('/auth/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Login endpoint
app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user._id, email: user.email }, 'your-secret-key', { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

connect(DB_URL);

app.listen(port, () =>
  console.log(`App listening at http://localhost:${port}`)
);

