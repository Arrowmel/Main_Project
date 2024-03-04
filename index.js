const express = require('express')
const router = express.Router();
const cors = require('cors');
const app=express()
const port=5000
const mongoDB = require("./db")
const corsOption={
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
};
app.use(cors(corsOption));

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.header(
        "Access-Control-Allow-Header",
        "Origin,X-Requested-With,Content-Type,Accept"
    );
    next();
})

mongoDB();
app.get('/',(req,res)=>{
    res.send('hello')
})
const User = require('./models/user');

app.get('/api/users', async (req, res) => {
    try {
        // Fetch all users from the database
        const users = await User.find();
        // Send the users as a response
        res.status(200).json(users);
    } catch (error) {
        // Handle errors
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.delete('/api/users/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        // Find the user by id and delete it from the database
        await User.findByIdAndDelete(userId);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route handler for fetching user count
app.get('/api/users/count', async (req, res) => {
    try {
        // Fetch user count from the database
        const userCount = await User.countDocuments();
        
        // Send user count as a response
        res.status(200).json({ count: userCount });
    } catch (error) {
        // Handle errors
        console.error('Error fetching user count:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

const Order = require('./models/orders');

app.get('/api/orders', async (req, res) => {
    try {
        // Fetch all orders from the database
        const orders = await Order.find();
        
        // Send orders as a response
        res.status(200).json(orders);
    } catch (error) {
        // Handle errors
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/orders/count', async (req, res) => {
    try {
        // Fetch order count from the database
        const orderCount = await Order.countDocuments();
        
        // Send order count as a response
        res.status(200).json({ count: orderCount });
    } catch (error) {
        // Handle errors
        console.error('Error fetching order count:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.delete('/api/orders/:orderId/:orderDataIndex', async (req, res) => {
    try {
        // Extract orderId and orderDataIndex from request parameters
        const { orderId, orderDataIndex } = req.params;

        // Find the order by orderId
        const order = await Order.findById(orderId);

        // Check if the order exists
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        // Remove the order data array at the specified index
        order.order_data.splice(orderDataIndex, 1);

        // Save the updated order
        await order.save();

        // Send a success response
        res.status(200).json({ message: 'Order details deleted successfully' });
    } catch (error) {
        // Handle errors
        console.error('Error deleting order details:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.get('/api/income', async (req, res) => {
    try {
        // Fetch all orders from the database
        const orders = await Order.find();
    
        // Calculate total income by summing up prices from order data
        let totalIncome = 0;
        orders.forEach(order => {
            order.order_data.forEach(item => {
                // Check if the price field exists and is a valid number
                if (item.price && typeof item.price === 'number') {
                    totalIncome += item.price;
                }
            });
        });
    
        // Send total income as a response
        res.status(200).json({ income: totalIncome });
    } catch (error) {
        // Handle errors
        console.error('Error fetching income:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

const FoodItem = require('./models/foodItem');

app.get('/api/foodItem', async (req, res) => {
    try {
        // Fetch data from the food_item collection
        const foodItems = await FoodItem.find();
        console.log(foodItems);

        // Send the fetched data as response
        res.status(200).json(foodItems);
    } catch (error) {
        // Handle errors
        console.error('Error fetching food items:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



app.use(express.json())
app.use('/api/',require("./routes/createuser"));
app.use('/api/',require("./routes/DisplayData"));
app.use('/api/',require("./routes/OrderData"));
app.use('/api/',require("./routes/createadmin"));


app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
})