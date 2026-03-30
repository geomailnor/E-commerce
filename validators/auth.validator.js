import { body, validationResult } from 'express-validator';

export const loginValidation = [
  body('email').isEmail().withMessage((value, { req }) => req.t ? req.t('enterValidEmail') : 'Invalid email'),
  body('password').isLength({ min: 6 })
    .withMessage((value, { req }) => req.t('passwordMinLength')),
];

export const registerValidation = [
  body('email').isEmail().withMessage((value, { req }) => req.t ? req.t('enterValidEmail') : 'Invalid email'),
  body('password').isLength({ min: 6 })
    .withMessage((value, { req }) => req.t('passwordMinLength')),
  body('role').optional().isIn(['admin', 'user'])
    .withMessage((value, { req }) => req.t('invalidRole')),
  body('userName')
    .notEmpty().withMessage((value, { req }) => req.t('userNameRequired')),
  body('city').notEmpty().withMessage((value, { req }) => req.t('cityRequired')),
  body('postalCode').notEmpty().withMessage((value, { req }) => req.t('postalCodeRequired')),
  body('addressLine1').notEmpty().withMessage((value, { req }) => req.t('addressLine1Required')),
  body('phoneNumber')
    .notEmpty().withMessage((value, { req }) => req.t('phoneNumberRequired'))
    .matches(/^\+?[0-9]{10,15}$/).withMessage((value, { req }) => req.t('invalidPhoneNumber'))
];
export const updateValidation = [
  body('email')
    .optional()
    .isEmail()
    .withMessage((value, { req }) => req.t ? req.t('enterValidEmail') : 'Invalid email'),
  body('password')
    .optional()
    .isLength({ min: 6 })
    .withMessage((value, { req }) => req.t('passwordMinLength')),
  body('role')
    .optional()
    .isIn(['admin', 'user'])
    .withMessage((value, { req }) => req.t('invalidRole')),
  body('userName')
    .optional()
    .notEmpty()
    .withMessage((value, { req }) => req.t('userNameRequired')),
  body('city')
    .optional()
    .notEmpty()
    .withMessage((value, { req }) => req.t('cityRequired')),
  body('postalCode')
    .optional()
    .notEmpty().withMessage((value, { req }) => req.t('postalCodeRequired')),
  body('addressLine1')
    .optional()
    .notEmpty()
    .withMessage((value, { req }) => req.t('addressLine1Required')),
  body('phoneNumber')
    .optional()
    .notEmpty()
    .withMessage((value, { req }) => req.t('phoneNumberRequired'))
    .matches(/^\+?[0-9]{10,15}$/)
    .withMessage((value, { req }) => req.t('invalidPhoneNumber'))
];

export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req); //това е обект
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    })
  };
  next();
}