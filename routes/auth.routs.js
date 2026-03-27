import express from 'express';
import User from '../models/user.model.js';

const router = express.Router();
router.post('/register', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({
      success: true,
      // message: req.t('categoryUpdatedSuccessfully'),
      message: 'User created successfully', // ← ПРОМЕНИ - махни req.t()
      data: user.toJSON()
    });

  } catch (error) {
    console.error('Registration error', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});
export default router;