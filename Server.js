// import dotenv from 'dotenv';
// import express from 'express';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import itemRoutes from './routes/itemsRoute.js'; // fixed route filename

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5500;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // MongoDB Connection
// mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
// .then(() => console.log('MongoDB connected successfully'))
// .catch(err => console.error('MongoDB connection error:', err));

// // Routes
// app.use('/items', itemRoutes);

// // Default Route
// app.get('/', (req, res) => {
//     res.send('Backend is running!');
// });

// // Start Server
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });
