import express from 'express';
import { Category } from '../models/category.model.js';

export const router = express.Router();

router.post('/', async (req, res) => {
  try {
    if (!req.body.name || req.body.name.trim().length < 3) {
      return res.status(400).json({ message: req.t('categoryNameValidation') });
    }
    const newCategory = await Category.create({
      name: req.body.name
    });
    return res.status(201).json(newCategory);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});