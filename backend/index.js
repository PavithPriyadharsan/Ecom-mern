const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

app.use(express.json());
app.use(cors());

//database connection
mongoose.connect("mongodb+srv://pavith:ecom-mern@cluster0.qwchbcw.mongodb.net/ecom-mern?retryWrites=true&w=majority&appName=Cluster0");


app.get("/", (req, res) => {
    res.send("Welcome to E-Commerce API");
})

//Image storage engine
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage: storage})

//upload endpoint for images
app.use('/images', express.static('upload/images'))
app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/upload/${req.file.filename}`
    })
})

//Schema for creating products
const Product = mongoose.model("Product", {
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    new_price: {
        type: Number,
        required: true,
    },
    old_price: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    available: {
        type: Boolean,
        default: true,
    }
})

//Api endpoint to add products
app.post('/addproduct', async(req, res)=> {
    let products = await Product.find();
    let id;
    if(products.length > 0) {
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id + 1;
    }
    else {
        id = 1;
    }
    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
    });
    console.log(product);
    await product.save();
    console.log("Saved");
    res.json({
        success: true,
        name: req.body.name,
    });
})

//Api endpoint to remove product
app.post('/removeproduct', async(req, res)=> {
    await Product.findOneAndDelete({id: req.body.id});
    console.log("Removed");
    res.json({
        success: true,
        name: req.body.name,
    });
})

//Api endpoint to get all products
app.get('/allproducts', async(req, res)=> {
    let products = await Product.find({});
    console.log("All products fetched");
    res.send(products);
})

//Schema for User model
const User = mongoose.model('User',{
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    cartData: {
        type: Object,
    },
    date: {
        type: Date,
        default: Date.now,
    },
})

//Endpoint to register User
app.post('/signup', async(req, res)=> {
    let check = await User.findOne({email: req.body.email});
    if(check){
        return res.status(400).json({
            success: false,
            errors: "User already exists",
        });
    }
    let cart = {};
    for(let i=0 ; i < 300 ; i++){
        cart[i] = 0;
    }
    const user = new User({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        cartData: cart,
    })
    await user.save();

    const data = {
        user: {
            id: user.id
        }
    }
    const token = jwt.sign(data, 'secret_ecom');
    res.json({
        success: true, token})
})

//Endpoint to user login
app.post('/login', async(req, res)=> {
    let user = await User.findOne({email: req.body.email});
    if(user){
        const passMatch = req.body.password === user.password;
        if(passMatch){
            const data = {
                user: {
                    id: user.id
                }
            }
            const token = jwt.sign(data, 'secret_ecom');
            res.json({success: true, token})
        } else {
            res.json({success: false, error: "Invalid Credentials"})
        }
    } else {
        res.json({success: false, error: "Invalid Email address"})
    }
}) 

app.listen(port, (error) => {
    if (error) {
        console.log("Error in starting the server");
    }
    else {
        console.log("Server started at port " + port);
    }
})