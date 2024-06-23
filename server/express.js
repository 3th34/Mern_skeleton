import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import Template from './../template.js';
import userRoutes from '../server/routes/user.route.js';
import productRoutes from '../server/routes/product.route.js'; // Import product routes
import productController from './controllers/product.controller.js';
const app = express();

// Middleware configuration 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.status(200).send(Template());
});
app.use('/', userRoutes);
app.use('/api/products', productRoutes); // Use product routes
app.use('/api/products', productController.createProduct);
app.use('/api/products', productController.getAllProducts);
app.use('/api/products/:id', productController.getProductById);
app.use('/api/products/:id', productController.updateProduct);
app.use('/api/products/:id', productController.deleteProductById);
app.use('/api/products', productController.deleteAllProducts);
app.use('/api/products/search', productController.searchProductsByName);

export default app;
