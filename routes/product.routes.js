import express from 'express';
import { productModel } from '../models/product.model.js';
import { handleRouteError } from '../helpers/error-handling.js';


const router = express.Router();
router.post('/', async (req, res) => {
  try {
    let newProduct = new productModel({
      title: req.body.title,
      price: parseFloat(req.body.price),
      category: req.body.category,
      countInStock: parseInt(req.body.countInStock),
      description: req.body.description
    });

    newProduct = await newProduct.save();
    return res.status(201).json({
      success: true,
      message: req.t('ProductCreatedSuccessfully'),
      data: newProduct
    });

  } catch (error) {
    handleRouteError(error, res);
  }
});


export default router;