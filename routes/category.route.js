import express from 'express';
import { Category } from '../models/category.model.js';
import { adminOnly } from '../middleware/roles.middleware.js';

const router = express.Router();

router.post('/', adminOnly, async (req, res) => {
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
router.get('/', async (req, res) => {
  try {
    const categoryList = await Category.find();
    if (!categoryList || categoryList.length === 0) {
      return res.send({ message: 'noCategories' });
    }
    res.send(categoryList);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});
router.delete('/:id', adminOnly, async (req, res) => {
  try {
    const catg = await Category.findByIdAndDelete(req.params.id);
    if (!catg) {
      return res.status(404).send({ message: req.t('categoryNotFound') });
    };
    res.send({ message: req.t('categoryDeletedSuccessfully') });

  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});
router.put('/:id', adminOnly, async (req, res) => {
  try {
    const catg = await Category.findByIdAndUpdate(req.params.id, { name: req.body.name });
    if (!catg) {
      return res.status(404).send({ message: req.t('categoryNotFound') });
    };
    res.send({ message: req.t('categoryUpdatedSuccessfully') });

  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});
export default router;